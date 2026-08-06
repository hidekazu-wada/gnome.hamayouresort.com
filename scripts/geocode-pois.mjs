// 周辺情報マップ（/area/）のPOIに座標と車の所要時間を焼き込む。
// ビルド時に毎回叩くのではなく、area-pois.json を更新したときだけ手で走らせる。
//
//   node scripts/geocode-pois.mjs            … 座標の未取得ぶんを埋めて、所要時間を取り直す
//   node scripts/geocode-pois.mjs --force    … 座標も全件取り直す
//   node scripts/geocode-pois.mjs --geo-only … ルーティングを飛ばす
//
// 座標は Google Geocoding API（.env.local の GOOGLE_GEOCODING_API_KEY）を使う。
// 国土地理院の住所検索も試したが、鳴沢村14件・西湖4件などが大字の代表点に丸まって
// 施設単位の精度が出なかったため、フォールバック扱いにしている。
// 所要時間は OSRM の公開サーバ（キー不要）で起点からの実ルートを引く。

import { readFile, writeFile } from "node:fs/promises";

const DATA_PATH = new URL("../src/data/area-pois.json", import.meta.url);
const ENV_PATH = new URL("../.env.local", import.meta.url);

const GOOGLE_ENDPOINT = "https://maps.googleapis.com/maps/api/geocode/json";
const GSI_ENDPOINT = "https://msearch.gsi.go.jp/address-search/AddressSearch";
const ROUTES_ENDPOINT = "https://routes.googleapis.com/directions/v2:computeRoutes";
const OSRM_ENDPOINT = "https://router.project-osrm.org/route/v1/driving";

// 富士北麓の想定範囲。ここから外れた座標はジオコーダの取り違えとみなす
const BBOX = { minLat: 35.35, maxLat: 35.62, minLng: 138.55, maxLng: 138.86 };

const force = process.argv.includes("--force");
const geoOnly = process.argv.includes("--geo-only");

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function readApiKey() {
  try {
    const env = await readFile(ENV_PATH, "utf8");
    const line = env.split("\n").find((l) => l.trim().startsWith("GOOGLE_GEOCODING_API_KEY="));
    return line?.split("=").slice(1).join("=").trim().replace(/^["']|["']$/g, "") || null;
  } catch {
    return null;
  }
}

const inBox = (lat, lng) =>
  lat >= BBOX.minLat && lat <= BBOX.maxLat && lng >= BBOX.minLng && lng <= BBOX.maxLng;

/** 〒番号・括弧書きの補足を落として検索に通しやすくする */
const normalizeAddress = (address) =>
  address
    .replace(/〒\s*\d{3}-?\d{4}\s*/g, "")
    .replace(/[（(][^）)]*[）)]/g, "")
    .trim();

// --- Google -----------------------------------------------------------------
// location_type: ROOFTOP（建物）> RANGE_INTERPOLATED（区間補間）
//              > GEOMETRIC_CENTER（街区の中心）> APPROXIMATE（丸め）
const PRECISE = new Set(["ROOFTOP", "RANGE_INTERPOLATED"]);

async function googleGeocode(query, key) {
  const url = `${GOOGLE_ENDPOINT}?address=${encodeURIComponent(query)}&language=ja&region=jp&key=${key}`;
  const res = await fetch(url);
  const json = await res.json();
  if (json.status === "ZERO_RESULTS") return null;
  if (json.status !== "OK") throw new Error(`Google: ${json.status} ${json.error_message ?? ""}`);
  const best = json.results[0];
  return {
    lat: best.geometry.location.lat,
    lng: best.geometry.location.lng,
    precision: best.geometry.location_type,
    formatted: best.formatted_address,
  };
}

/**
 * 住所で引いて精度が足りなければ「施設名＋住所」で引き直す。
 * Googleのジオコーダは施設名を混ぜると建物レベルまで当ててくることが多い。
 */
async function resolveWithGoogle({ name, address }, key) {
  const plain = normalizeAddress(address);
  const attempts = [
    { query: `${name} ${plain}`, label: "name+address" },
    { query: plain, label: "address" },
  ];

  let fallback = null;
  for (const attempt of attempts) {
    const hit = await googleGeocode(attempt.query, key);
    await sleep(120);
    if (!hit || !inBox(hit.lat, hit.lng)) continue;
    if (PRECISE.has(hit.precision)) return { ...hit, via: `google:${attempt.label}` };
    fallback ??= { ...hit, via: `google:${attempt.label}` };
  }
  return fallback;
}

// --- 国土地理院（フォールバック）---------------------------------------------
async function gsiGeocode({ address }) {
  const res = await fetch(`${GSI_ENDPOINT}?q=${encodeURIComponent(normalizeAddress(address))}`);
  const json = await res.json();
  await sleep(250);
  if (!Array.isArray(json) || json.length === 0) return null;
  const [lng, lat] = json[0].geometry.coordinates;
  if (!inBox(lat, lng)) return null;
  // 番地まで当たったかどうかを title から判定する（大字止まりなら代表点への丸め）
  const precise = /\d+番地|\d+丁目/.test(json[0].properties.title);
  return {
    lat,
    lng,
    precision: precise ? "GSI_BANCHI" : "GSI_APPROXIMATE",
    formatted: json[0].properties.title,
    via: "gsi",
  };
}

// --- 検分用の突き合わせ -------------------------------------------------------
const R = 6371;
function distanceKm(a, b) {
  const rad = (d) => (d * Math.PI) / 180;
  const dLat = rad(b.lat - a.lat);
  const dLng = rad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(rad(a.lat)) * Math.cos(rad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

/**
 * Google が返した座標が、住所の地区（大字）から極端に離れていないかを見る。
 * 地理院は番地までは当てられないが「どの地区か」は正しいので、
 * 取り違え（同名の別店舗を拾う等）の検出には十分使える。
 */
async function districtCheck(poi) {
  const hit = await gsiGeocode(poi);
  if (!hit) return null;
  return distanceKm({ lat: poi.lat, lng: poi.lng }, hit);
}

// --- ルーティング -------------------------------------------------------------
// OSRM の公開デモは OSM の maxspeed 既定値で走るため、この地域では実勢より2〜4割速く出た
// （マックスバリュまで25分→13分）。客が実際に見る Google マップの案内と食い違うので、
// Routes API が使えるならそちらを正とし、使えないときだけ OSRM に落ちる。
//
// 渋滞込みの値は「焼き込んだ瞬間の混み具合」を固定してしまうので TRAFFIC_UNAWARE を使う。
// つまり「空いていればこのくらい」の目安。シーズン中は実際もっとかかる。
async function googleRouteMinutes(origin, poi, key) {
  const res = await fetch(ROUTES_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Goog-Api-Key": key,
      "X-Goog-FieldMask": "routes.duration,routes.distanceMeters",
    },
    body: JSON.stringify({
      origin: { location: { latLng: { latitude: origin.lat, longitude: origin.lng } } },
      destination: { location: { latLng: { latitude: poi.lat, longitude: poi.lng } } },
      travelMode: "DRIVE",
      routingPreference: "TRAFFIC_UNAWARE",
      languageCode: "ja",
      units: "METRIC",
    }),
  });
  const json = await res.json();
  await sleep(120);
  if (json.error) throw new Error(`Routes: ${json.error.status} ${json.error.message}`);
  const route = json.routes?.[0];
  if (!route) return null;
  return Math.max(1, Math.round(Number(String(route.duration).replace("s", "")) / 60));
}

async function osrmMinutes(origin, poi) {
  const url = `${OSRM_ENDPOINT}/${origin.lng},${origin.lat};${poi.lng},${poi.lat}?overview=false`;
  const res = await fetch(url);
  const json = await res.json();
  await sleep(400); // 公開デモサーバなので間隔を空ける
  if (json.code !== "Ok" || !json.routes?.length) return null;
  return Math.max(1, Math.round(json.routes[0].duration / 60));
}

let routesApiAvailable = true;

async function driveMinutes(origin, poi, key) {
  if (key && routesApiAvailable) {
    try {
      const minutes = await googleRouteMinutes(origin, poi, key);
      if (minutes !== null) return { minutes, source: "routing:google" };
    } catch (error) {
      // 有効化されていない/キーの制限に入っていない場合は一度だけ知らせて OSRM に切り替える
      console.log(`\n⚠️  Routes API が使えないため OSRM に切り替えます: ${error.message}\n`);
      routesApiAvailable = false;
    }
  }
  const minutes = await osrmMinutes(origin, poi);
  return minutes === null ? null : { minutes, source: "routing:osrm" };
}

const tierOf = (minutes) => (minutes <= 10 ? 1 : minutes <= 20 ? 2 : 3);

// --- 実行 ---------------------------------------------------------------------
const key = await readApiKey();
if (!key) {
  console.log("⚠️  .env.local に GOOGLE_GEOCODING_API_KEY がありません。国土地理院のみで進めます。\n");
}

const data = JSON.parse(await readFile(DATA_PATH, "utf8"));
const report = [];

async function resolve(target) {
  if (key) {
    const hit = await resolveWithGoogle(target, key);
    if (hit) return hit;
  }
  return gsiGeocode(target);
}

if (force || data.meta.origin.lat === null) {
  const hit = await resolve(data.meta.origin);
  if (hit) {
    data.meta.origin.lat = Number(hit.lat.toFixed(6));
    data.meta.origin.lng = Number(hit.lng.toFixed(6));
    console.log(`origin  ${hit.lat}, ${hit.lng}  [${hit.precision}] ${hit.formatted}`);
  }
}

const origin = data.meta.origin;

/**
 * 座標が確定しているか。
 * 地理院の暫定値（gsi-provisional）だけは、キーが用意でき次第 Google で引き直す。
 */
const isSettled = (poi) =>
  poi.lat !== null && poi.geo_source != null && poi.geo_source !== "gsi-provisional";

for (const poi of data.pois) {
  // geo_locked はジオコーダが誤るのを人が直した点。--force でも上書きしない
  const locked = poi.geo_locked === true;
  if (!locked && (force || !isSettled(poi))) {
    const hit = await resolve(poi);
    if (!hit) {
      report.push({ id: poi.id, issue: "ジオコーディング失敗" });
      console.log(`✗ ${poi.id}`);
      continue;
    }
    poi.lat = Number(hit.lat.toFixed(6));
    poi.lng = Number(hit.lng.toFixed(6));
    poi.geo_precision = hit.precision;
    poi.geo_source = hit.via;
    const mark = PRECISE.has(hit.precision) ? "○" : "△";
    if (!PRECISE.has(hit.precision)) report.push({ id: poi.id, issue: `精度 ${hit.precision}` });

    // 住所の地区から3km以上離れていたら、別の同名施設を拾った疑いがある
    let drift = null;
    if (hit.via?.startsWith("google")) {
      drift = await districtCheck(poi);
      if (drift !== null && drift > 3) {
        report.push({ id: poi.id, issue: `住所の地区から ${drift.toFixed(1)}km ずれている` });
      }
    }
    const driftText = drift === null ? "" : ` 地区差 ${drift.toFixed(1)}km`;
    console.log(`${mark} ${poi.id.padEnd(30)} ${poi.lat}, ${poi.lng}  [${hit.precision}]${driftText}`);
  }

  if (geoOnly || poi.lat === null) continue;

  // 座標が暫定のままルートを引くと、書斎の推定値より不正確な数字に
  // 「routing」の看板が付いてしまう。確定した点だけ引く
  if (!isSettled(poi)) {
    report.push({ id: poi.id, issue: "座標が暫定なので所要時間は推定値のまま" });
    continue;
  }

  const route = await driveMinutes(origin, poi, key);
  if (route === null) {
    report.push({ id: poi.id, issue: "ルーティング失敗" });
    continue;
  }
  poi.drive_minutes = route.minutes;
  poi.drive_minutes_source = route.source;
  poi.tier = tierOf(route.minutes);
}

await writeFile(DATA_PATH, `${JSON.stringify(data, null, 2)}\n`, "utf8");

// --- 検分用レポート -----------------------------------------------------------
const byCoord = new Map();
for (const poi of data.pois) {
  if (poi.lat === null) continue;
  const k = `${poi.lat},${poi.lng}`;
  byCoord.set(k, [...(byCoord.get(k) ?? []), poi]);
}
const dupes = [...byCoord.entries()].filter(([, g]) => g.length > 1);

console.log("\n=== 座標が完全一致している点（丸めの疑い）===");
if (dupes.length === 0) console.log("  なし");
for (const [k, group] of dupes) {
  console.log(`  ${k}`);
  for (const poi of group) console.log(`    - ${poi.id} / ${poi.name}`);
}

console.log("\n=== 要確認 ===");
if (report.length === 0) console.log("  なし");
for (const row of report) console.log(`  ${row.id.padEnd(30)} ${row.issue}`);

const tiers = { 1: 0, 2: 0, 3: 0 };
for (const poi of data.pois) tiers[poi.tier] += 1;
console.log(
  `\n座標 ${data.pois.filter((p) => p.lat !== null).length}/${data.pois.length}  ` +
    `tier1 ${tiers[1]} / tier2 ${tiers[2]} / tier3 ${tiers[3]}`
);
