// 周辺情報マップ（/area/）のデータ。
//
// 元データは area-pois.json（手動更新）。座標と所要時間は scripts/geocode-pois.mjs で
// ビルド前に焼き込んであるので、公開サイトからジオコーディング／ルーティングAPIは一切叩かない。
//
// このモジュールの役割は、JSON の運用フィールド（verify / confidence / drive_minutes_source）を
// 配信データから落としつつ、掲載可否の判断をコード側に1箇所だけ持つこと。

import raw from "./area-pois.json";

export type CategoryId =
  | "onsen"
  | "restaurant"
  | "sightseeing"
  | "convenience"
  | "supermarket"
  | "gas_station"
  | "outdoor_shop"
  | "laundry"
  | "pharmacy"
  | "hospital";

export interface AreaCategory {
  id: CategoryId;
  label: string;
  group: "enjoy" | "essentials";
  /** マーカーとチップの識別色。既存のピンSVG（Figma）の配色に合わせている */
  color: string;
}

export interface AreaGroup {
  id: "enjoy" | "essentials";
  label: string;
  categories: CategoryId[];
}

export interface AreaPoi {
  id: string;
  name: string;
  category: CategoryId;
  /** 道の駅のように2つの顔を持つ施設。絞り込みではこちらでもヒットさせる */
  also: CategoryId[];
  genre?: string;
  address: string;
  lat: number;
  lng: number;
  driveMinutes: number;
  tier: 1 | 2 | 3;
  hours?: string;
  closed?: string;
  price?: string;
  reservation?: string;
  duration?: string;
  phone?: string;
  url?: string;
  note: string;
  featured: boolean;
  ownFacility: boolean;
  emergency: boolean;
  rainyDay: boolean;
  /**
   * 距離フィルタの対象外にする施設。
   * 買い出し先（スーパー）が全部20分超・救急が全部20分超なので、距離で隠すと
   * 「1軒もない」ように見えてしまう。カテゴリで絞られたときだけ消える。
   */
  alwaysVisible: boolean;
  /** 営業時間の裏取りが取れていない施設。時間の行を出さず、電話で確認してもらう */
  hoursUnconfirmed: boolean;
}

/**
 * 掲載を見送る施設のID。
 * verify 付き6件は2026-08-05のユーザー判断ですべて掲載と決定済み。ここに載るのは別の理由。
 * 閉店・掲載取り下げが出たらここに足す。
 */
const EXCLUDED_IDS = new Set<string>([
  // 住所の大字が「富士山」のため、ジオコーダが富士山頂や静岡県富士宮市を返してしまう。
  // OSMにも該当がなく座標を確定できないので、位置が分かるまで地図にも一覧にも出さない。
  // （国道139号沿い・道の駅なるさわ付近と思われるが推測で置かない）
  "amanoya",
  // 住所に番地がなく（「湖畔の釣り宿で遊漁券販売」）、引くと湖の真ん中に落ちる。
  // 遊漁券の販売所が分かり次第、座標を入れて復帰させる。
  "saiko-fishing",
]);

/**
 * 営業時間が裏取りできていない施設（2026-08-05 ユーザー判断）。
 * 施設自体は掲載するが、営業時間の行は出さずに電話リンクへ誘導する。
 * 裏が取れたら area-pois.json の hours を埋めたうえでここから外す。
 */
const HOURS_UNCONFIRMED_IDS = new Set<string>([
  "yshop-oishi", // ヤマザキYショップ 河口湖大石店
  "eneos-ashiwada", // ENEOS 足和田SS（車7分の最寄りGSなので伏せてでも掲載する）
  "saegusa-narusawa", // さえぐさ薬局 鳴沢店
]);

/** null を optional に畳む。JSON は未確定を null で持っているが、表示側では「無い」と同義 */
const opt = (value: string | null | undefined): string | undefined => value ?? undefined;

/**
 * カテゴリの識別色。
 * 既にFigmaで7種のピンSVGが起こされているので、その配色をそのまま正とする。
 * デザインに無い3種（温泉・ガソリン・薬局）だけ、指示書の指定色から同じトーンのものを採った。
 * どれも黒5pxの縁取りが付く前提の彩度なので、単色で文字を載せる用途には使わないこと。
 */
const CATEGORY_COLORS: Record<CategoryId, string> = {
  onsen: "#C86B4A", // Figmaに無いので指示書の指定色
  restaurant: "#CC5D5D",
  sightseeing: "#BEE0E1",
  convenience: "#D6B156",
  supermarket: "#9D8B7C",
  gas_station: "#6B6B7A", // Figmaに無いので指示書の指定色
  outdoor_shop: "#A9A3D5",
  laundry: "#E2D1BE",
  pharmacy: "#8C5B6B", // Figmaに無いので指示書の指定色
  hospital: "#8AAD61",
};

// JSONの初期値は null なので、焼き込み前でもビルドが通るように number へ寄せておく
const originRaw = raw.meta.origin as unknown as {
  name: string;
  address: string;
  lat: number;
  lng: number;
};

export const origin = {
  name: originRaw.name,
  address: originRaw.address,
  lat: originRaw.lat,
  lng: originRaw.lng,
};

export const categories: AreaCategory[] = (raw.categories as { id: string; label: string; group: string; color: string }[]).map(
  (c) => ({
    id: c.id as CategoryId,
    label: c.label,
    group: c.group as "enjoy" | "essentials",
    color: CATEGORY_COLORS[c.id as CategoryId],
  })
);

export const groups: AreaGroup[] = (raw.groups as { id: string; label: string; categories: string[] }[]).map((g) => ({
  id: g.id as "enjoy" | "essentials",
  label: g.label,
  categories: g.categories as CategoryId[],
}));

export const pois: AreaPoi[] = (raw.pois as Record<string, any>[])
  .filter((p) => !EXCLUDED_IDS.has(p.id))
  .map((p) => ({
    id: p.id,
    name: p.name,
    category: p.category as CategoryId,
    also: (p.also ?? []) as CategoryId[],
    genre: opt(p.genre),
    address: p.address,
    lat: p.lat,
    lng: p.lng,
    driveMinutes: p.drive_minutes,
    tier: p.tier,
    hours: HOURS_UNCONFIRMED_IDS.has(p.id) ? undefined : opt(p.hours),
    closed: opt(p.closed),
    price: opt(p.price),
    reservation: opt(p.reservation),
    duration: opt(p.duration),
    phone: opt(p.phone),
    url: opt(p.url),
    note: p.note,
    featured: p.featured === true,
    ownFacility: p.own_facility === true,
    emergency: p.emergency === true,
    rainyDay: p.rainy_day === true,
    alwaysVisible: p.emergency === true || (p.category === "supermarket" && p.tier === 3),
    hoursUnconfirmed: HOURS_UNCONFIRMED_IDS.has(p.id),
  }))
  // 救急は病院カテゴリの最上位に固定。それ以外は起点から近い順
  .sort((a, b) => {
    if (a.emergency !== b.emergency) return a.emergency ? -1 : 1;
    return a.driveMinutes - b.driveMinutes;
  });

/** 初期表示（車20分以内）に含まれない件数。「もっと見る」のラベルに使う */
export const farCount = pois.filter((p) => p.tier === 3 && !p.alwaysVisible).length;

export const categoryMap = new Map(categories.map((c) => [c.id, c]));

/** Googleマップのルート案内へ、出発地をキャンプ場に固定して飛ばす */
export function directionsUrl(poi: AreaPoi): string {
  return `https://www.google.com/maps/dir/?api=1&origin=${origin.lat},${origin.lng}&destination=${poi.lat},${poi.lng}&travelmode=driving`;
}

/** 食べログなど第三者のクチコミサイトには nofollow を付ける */
export function isThirdPartyReviewSite(url: string): boolean {
  return /tabelog\.com|tokubai\.co\.jp/.test(url);
}
