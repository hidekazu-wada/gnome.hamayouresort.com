// 宿泊サイトのデータ。
// 現状はFigmaのダミーをもとにした暫定データで、実データ確定時にこのファイルを差し替える。

import site01 from "../assets/images/stay/cards/site-01.jpg";
import site02 from "../assets/images/stay/cards/site-02.jpg";
import site03 from "../assets/images/stay/cards/site-03.jpg";
import site04 from "../assets/images/stay/cards/site-04.jpg";
import site05 from "../assets/images/stay/cards/site-05.jpg";
import site06 from "../assets/images/stay/cards/site-06.jpg";
import site07 from "../assets/images/stay/cards/site-07.jpg";
import site08 from "../assets/images/stay/cards/site-08.jpg";

/**
 * 絞り込み検索の項目と選択肢。
 * Figmaに選択肢の定義がないため暫定。実データ確定時はここだけ差し替えれば
 * プルダウンと絞り込みの両方に反映される。
 */
export const stayFilterGroups = [
  {
    key: "type",
    label: "種別",
    options: ["区画サイト", "フリーサイト", "キャビン", "トレーラーハウス", "ゲルテント"],
  },
  { key: "capacity", label: "定員", options: ["〜4名", "5〜9名", "10名以上"] },
  { key: "location", label: "立地", options: ["林間", "湖畔沿い", "芝生"] },
  { key: "power", label: "AC電源", options: ["ACあり", "ACなし"] },
  { key: "car", label: "車両乗り入れ", options: ["乗り入れ可", "乗り入れ不可"] },
  { key: "pet", label: "ペット同伴", options: ["同伴可", "同伴不可"] },
  { key: "camper", label: "キャンピングカー", options: ["利用可", "利用不可"] },
] as const;

export type StayFilterKey = (typeof stayFilterGroups)[number]["key"];

export type Stay = {
  /** URL（/stay/{slug}/） */
  slug: string;
  /** カードの見出し（改行位置は配列で指定） */
  titleLines: string[];
  /** 詳細ページのリード文 */
  lead: string;
  photo: ImageMetadata;
  /** 写真右下の区画コード（F-1 など） */
  code: string;
  /** 写真左上のバッジ。1〜2行 */
  badgeLines: string[];
  /** バッジ最終行の大きさ（Figmaはバッジごとに違う）。md=34/26, sm=27/22, sp-md=SPのみ26 */
  badgeSize?: "md" | "sm" | "sp-md";
  /** カードの角丸タグ */
  tags: string[];
  /** 「¥9,350〜」の部分 */
  price: string;
  /** 絞り込み用の属性。該当する選択肢を全て入れる */
  filters: Record<StayFilterKey, string[]>;

  // --- 詳細ページ ---
  /** メインビジュアルの写真。自動でディゾルブ切り替えする */
  heroPhotos: ImageMetadata[];
  /** メインビジュアルの見出し（改行は <br> で明示） */
  heroHeading: string;
  /** メインビジュアルの本文 */
  heroBody: string;
  /** サイト概要のテーブル */
  spec: { label: string; lines: string[] }[];
  /** エリアマップ上の位置。マップ画像(1868×1401)内の設計px */
  mapMarker: { left: number; top: number; width: number; height: number };
  /** 料金表の1行目に出す金額 */
  priceAmount: string;
  /** 料金表。amountは大きく、notesは小さく表示する */
  priceRows: {
    label: string;
    amount?: string;
    lines?: string[];
    notes?: string[];
    /** PCで注記前の空行を26px基準(42px)にする（Figmaのアーリーチェックイン行） */
    notesTightGap?: boolean;
    /** PCではlinesを1行に並べる（SPは行のまま積む。キャンセル料行） */
    linesInlinePc?: boolean;
  }[];
  /** 注意事項。1項目＝1配列で、配列の要素が改行 */
  notes: string[][];
};

const photos = [site01, site02, site03, site04, site05, site06, site07, site08];

// 詳細ページ（実データ確定までは全サイト共通のダミー）
const heroPhotos = [site01, site05, site04];
const heroBody =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";
const priceRows = [
  { label: "料金", amount: "" },
  {
    label: "支払方法",
    lines: ["オンラインカード決済のみ（VISA,MASTER,JCB,AMEX）"],
  },
  {
    label: "駐車場代",
    lines: ["１台目：無料", "２台目：550円（税込）"],
    notes: [
      "※当日の受付も可能ですのでチェックイン時にお申し付けください。",
      "※駐車場所は管理棟前の砂利の駐車場です。",
      "※荷物の搬入、搬出時には乗り入れ可能です。",
    ],
  },
  {
    label: "アーリー<br>チェックイン",
    lines: ["9:00～　3,300円", "12:00～　1,650円"],
    notesTightGap: true,
    notes: [
      "※当日受付",
      "※受付時に現金でお支払いください",
      "※心配な方は前日の15～17時にご連絡いただけば状況のご案内は可能です。",
      "　　キャンプ場直通　0555-82-2650または090-6196-2170",
    ],
  },
  {
    label: "レイト<br>チェックアウト",
    lines: ["～16:00　3,300円"],
    notes: ["※チェックイン時にお伝えください", "※受付時に現金でお支払いください"],
  },
  {
    label: "キャンセル料",
    // SPは3行積み・PCは1行（全角スペースはビルドで潰れるため行分割＋CSSで間隔を作る）
    lines: ["3日前・・・30％", "前日・・・50％", "当日・・・100％"],
    linesInlinePc: true,
  },
];

// 注意事項（全サイト共通）
const notes = [
  ["花火は20:30まで　※手持ちのみ"],
  ["テントサウナは、日帰りで別途１サイトご予約いただければご利用いただけます。"],
  ["キャンピングカー/トレーラー/ルーフテントは不可"],
  ["直火は禁止。焚火台をご使用ください。また21時までには消火の上、就寝の準備をお願いいたします。"],
  ["楽器の演奏や音楽は終日禁止"],
  ["21:00～7:00は安眠タイムとなります。静かな環境づくりにご協力ください。"],
  ["過度の照明や音の出る行為はお控えください。あまりにひどい場合には退場いただく場合もございます。"],
  ["ペットはリードまたはゲージにて同伴可。※他人への威嚇、吠える可能性がある場合は入場不可"],
  ["西湖での遊泳は禁止（ペットも同様）　浜辺での水遊びはOK"],
  ["ホテルでは日帰り入浴を行っておりません。"],
  [
    "15時までにチェックインできない場合は、かならず15時までに一度ご連絡をください。",
    "ご連絡がなかった場合15時を過ぎた時点で当日キャンセル扱いとさせていただきます。",
  ],
  [
    "あまりに到着が遅くなる場合ご利用をお断りすることがございます。",
    "ご予約につきましては当日キャンセルとさせていただきます。",
  ],
];

const spec = [
  {
    label: "広さ",
    lines: [
      "13.3m×6.5m",
      "車両１台、タープ1張り、20㎡までのテント1張りを想定した広さ",
    ],
  },
  { label: "チェックイン", lines: ["13:00〜15:00　※アーリーチェックインは当日受付のみ可能"] },
  { label: "チェックアウト", lines: ["〜12:00"] },
  { label: "車両乗入", lines: ["可　※リードまたは、ケージをご利用ください"] },
  { label: "朝食", lines: ["なし"] },
  { label: "夕食", lines: ["なし"] },
  { label: "地面", lines: ["土　※推奨ペグ：スチール,ネイル"] },
  { label: "入浴", lines: ["徒歩圏内に姉妹施設のいずみの湯がございます。※営業日時はこちら"] },
];

const base = [
  {
    key: "rinkan",
    titleLines: ["木々に囲まれた", "林間サイト"],
    lead: "木々に囲まれた林間サイト",
    heroHeading: "林間の落ち着いた雰囲気の<br>エリア",
    code: "F-1",
    badgeLines: ["人気", "No,1"],
    tags: ["区画サイト", "最大5名", "林間", "ACなし", "車両乗入◯", "ペット◯", "キャンピングカー×"],
    price: "¥9,350〜",
    filters: {
      type: ["区画サイト"],
      capacity: ["〜4名", "5〜9名"],
      location: ["林間"],
      power: ["ACなし"],
      car: ["乗り入れ可"],
      pet: ["同伴可"],
      camper: ["利用不可"],
    },
  },
  {
    key: "kohan",
    titleLines: ["水の音に癒される", "湖畔サイト"],
    lead: "水の音に癒される湖畔サイト",
    heroHeading: "湖のすぐそばで過ごす<br>特別な時間",
    code: "F-2",
    badgeLines: ["湖畔沿い"],
    tags: ["フリーサイト", "最大5名", "湖畔沿い", "ACなし", "車両乗入△", "ペット◯", "キャンピングカー◯"],
    price: "¥7,700〜",
    filters: {
      type: ["フリーサイト"],
      capacity: ["〜4名", "5〜9名"],
      location: ["湖畔沿い"],
      power: ["ACなし"],
      car: ["乗り入れ可"],
      pet: ["同伴可"],
      camper: ["利用可"],
    },
  },
  {
    key: "group",
    titleLines: ["大人数で楽しめる", "グループサイト"],
    lead: "大人数で楽しめるグループサイト",
    heroHeading: "仲間と集まって過ごす<br>広々エリア",
    code: "G-1",
    badgeLines: ["最大", "15名"],
    tags: ["区画サイト", "最大15名", "林間", "ACなし", "車両乗入◯", "ペット◯", "キャンピングカー◯"],
    price: "¥19,800〜",
    filters: {
      type: ["区画サイト"],
      capacity: ["10名以上"],
      location: ["林間"],
      power: ["ACなし"],
      car: ["乗り入れ可"],
      pet: ["同伴可"],
      camper: ["利用可"],
    },
  },
  {
    key: "double",
    titleLines: ["少人数グループなら", "ダブルサイト"],
    lead: "少人数グループならダブルサイト",
    heroHeading: "2区画を贅沢に使える<br>ダブルサイト",
    code: "D-1",
    badgeLines: ["最大", "12名"],
    tags: ["区画サイト", "最大12名", "林間", "ACなし", "車両乗入◯", "ペット◯", "キャンピングカー×"],
    price: "¥18,700〜",
    filters: {
      type: ["区画サイト"],
      capacity: ["10名以上"],
      location: ["林間"],
      power: ["ACなし"],
      car: ["乗り入れ可"],
      pet: ["同伴可"],
      camper: ["利用不可"],
    },
  },
  {
    key: "omakase",
    titleLines: ["平日限定", "おまかせサイト"],
    lead: "平日限定のおまかせサイト",
    heroHeading: "当日のお楽しみ<br>おまかせサイト",
    code: "A-1",
    badgeLines: ["最安"],
    tags: ["フリーサイト", "最大5名", "林間", "ACなし", "車両乗入◯", "ペット◯", "キャンピングカー×"],
    price: "¥3,300〜",
    filters: {
      type: ["フリーサイト"],
      capacity: ["〜4名", "5〜9名"],
      location: ["林間"],
      power: ["ACなし"],
      car: ["乗り入れ可"],
      pet: ["同伴可"],
      camper: ["利用不可"],
    },
  },
  {
    key: "gel",
    titleLines: ["心落ち着く空間の", "ゲルテント"],
    lead: "心落ち着く空間のゲルテント",
    heroHeading: "丸い天井が包み込む<br>非日常の空間",
    code: "Y-1",
    badgeLines: ["ママに", "大人気"],
    badgeSize: "md",
    tags: ["区画サイト", "最大5名", "林間", "ACあり", "車両乗入×", "ペット×", "キャンピングカー×"],
    price: "¥19,800〜",
    filters: {
      type: ["ゲルテント"],
      capacity: ["〜4名", "5〜9名"],
      location: ["林間"],
      power: ["ACあり"],
      car: ["乗り入れ不可"],
      pet: ["同伴不可"],
      camper: ["利用不可"],
    },
  },
  {
    key: "trailer",
    titleLines: ["限りなく外に近い", "トレーラーハウス"],
    lead: "限りなく外に近いトレーラーハウス",
    heroHeading: "屋根付きデッキでゆったり<br>トレーラーハウス",
    code: "T-1",
    badgeLines: ["屋根付き", "デッキ"],
    badgeSize: "sp-md",
    tags: ["キャビン", "最大4名", "林間", "ACなし", "車両乗入×", "ペット×", "キャンピングカー×"],
    price: "¥18,700〜",
    filters: {
      type: ["トレーラーハウス"],
      capacity: ["〜4名"],
      location: ["林間"],
      power: ["ACなし"],
      car: ["乗り入れ不可"],
      pet: ["同伴不可"],
      camper: ["利用不可"],
    },
  },
  {
    key: "kukaku",
    titleLines: ["場所を指定できる", "区画サイト"],
    lead: "場所を指定できる区画サイト",
    heroHeading: "場所を選んで予約できる<br>区画サイト",
    code: "R-1",
    badgeLines: ["初心者に", "おすすめ"],
    badgeSize: "sm",
    tags: ["区画サイト", "最大5名", "林間", "ACなし", "車両乗入◯", "ペット◯", "キャンピングカー×"],
    price: "¥9,350〜",
    filters: {
      type: ["区画サイト"],
      capacity: ["〜4名", "5〜9名"],
      location: ["林間"],
      power: ["ACなし"],
      car: ["乗り入れ可"],
      pet: ["同伴可"],
      camper: ["利用不可"],
    },
  },
] satisfies Array<
  Omit<
    Stay,
    | "slug"
    | "photo"
    | "heroPhotos"
    | "heroBody"
    | "spec"
    | "mapMarker"
    | "priceAmount"
    | "priceRows"
    | "notes"
  > & { key: string }
>;

/** Figmaのダミー（8種 × 2周 = 16件）を再現した暫定データ */
export const stays: Stay[] = Array.from({ length: 16 }, (_, i) => {
  const { key, ...rest } = base[i % base.length];
  const round = Math.floor(i / base.length);
  return {
    ...rest,
    slug: round === 0 ? key : `${key}-${round + 1}`,
    photo: photos[i % photos.length],
    heroPhotos,
    heroBody,
    spec,
    // 実データ確定までは区画ごとに位置をずらしたダミー
    mapMarker: {
      left: 1221 - (i % 4) * 210,
      top: 785 - Math.floor((i % 8) / 4) * 180,
      width: 76,
      height: 134,
    },
    priceAmount: `${rest.price.replace("¥", "").replace("〜", "")}円（税込）〜/1泊`,
    priceRows,
    notes,
  };
});
