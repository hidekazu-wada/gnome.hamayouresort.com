// アクティビティのデータ。
// 現状はFigmaのダミーをもとにした暫定データで、実データ確定時にこのファイルを差し替える。

import card01 from "../assets/images/activity/cards/card-01.jpg";
import card02 from "../assets/images/activity/cards/card-02.jpg";
import card03 from "../assets/images/activity/cards/card-03.jpg";
import card04 from "../assets/images/activity/cards/card-04.jpg";
import card05 from "../assets/images/activity/cards/card-05.jpg";
import card06 from "../assets/images/activity/cards/card-06.jpg";
import card07 from "../assets/images/activity/cards/card-07.jpg";
import card08 from "../assets/images/activity/cards/card-08.jpg";
import hero01 from "../assets/images/activity/detail/hero-01.jpg";

/**
 * 絞り込み検索の項目と選択肢。
 * Figmaに選択肢の定義がないため暫定。実データ確定時はここだけ差し替えれば
 * プルダウンと絞り込みの両方に反映される。
 */
export const filterGroups = [
  { key: "age", label: "対象年齢", options: ["制限なし", "小学生以上", "中学生以上"] },
  { key: "season", label: "実施時期", options: ["春", "夏", "秋", "冬"] },
  { key: "people", label: "人数", options: ["1名〜", "2名〜", "4名〜"] },
  { key: "price", label: "料金", options: ["〜3,000円", "3,000〜5,000円", "5,000円〜"] },
  { key: "duration", label: "所要時間", options: ["〜30分", "30〜60分", "60分〜"] },
  { key: "weather", label: "天気", options: ["晴れ", "雨天可"] },
  { key: "reservation", label: "ご予約", options: ["要予約", "予約不要"] },
] as const;

export type FilterKey = (typeof filterGroups)[number]["key"];

export type Activity = {
  /** URL（/activity/{slug}/） */
  slug: string;
  /** 一覧カードの見出し */
  title: string;
  /** 詳細ページの英字タイトル */
  titleEn: string;
  /** 詳細ページの和文タイトル */
  titleJa: string;
  /** 詳細ページのリード文 */
  lead: string;
  photo: ImageMetadata;
  /** カードの写真上バッジ */
  durationLabel: string;
  /** カードの料金表記 */
  priceLabel: string;
  /** カードの角丸タグ（4文字以上は2行で表示される） */
  tags: string[];
  description: string;
  /** 絞り込み用の属性。該当する選択肢を全て入れる */
  filters: Record<FilterKey, string[]>;

  // --- 詳細ページ ---
  /** メインビジュアルの写真。自動でディゾルブ切り替えする */
  heroPhotos: ImageMetadata[];
  /** メインビジュアルの見出し（改行は <br> で明示） */
  heroHeading: string;
  /** メインビジュアルの本文。1要素＝1段落 */
  heroBody: string[];
  /** 概要テーブル。lines は1要素＝1段落 */
  overview: { label: string; lines: string[] }[];
  /** 料金テーブル。amount がある行は金額を大きく強調表示する */
  price: {
    label: string;
    amount?: string;
    amountNote?: string;
    lines: string[];
  }[];
};

const photos = [card01, card02, card03, card04, card05, card06, card07, card08];

const description =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";

// 詳細ページのメインビジュアル（実データ確定までは全アクティビティ共通のダミー）
const heroPhotos = [hero01, card01, card05];
const heroBody = [
  "1日のうちで最もコンディションがよくなる確率が高いのが早朝と夕方です。",
  "1組限定のプライベートツアーで朝ならではの見どころをご案内いたします。",
  "約1時間半のツアーです。もちろんレクチャー付きなので初めてでも大丈夫です。",
];

const overview = [
  {
    label: "開催日",
    lines: [
      "11月　その年の気候により早めに開催、終了する場合がございます。",
      "※事前予約制になります。",
    ],
  },
  {
    label: "受付場所",
    lines: ["西湖キャンプビレッジ・ノーム内　アクティビティ管理棟（赤いトレーラーハウス）"],
  },
  { label: "受付時間", lines: ["7時45分集合　8時開始"] },
  {
    label: "対象年齢",
    lines: [
      "中学生以上",
      "※小学生のお子様は大人と同乗でご参加いただけます。",
      "（お子様の年齢に合わせてシングル艇又はタンデム艇でご案内）",
      "※小学生のお子様も人数のカウントに含まれます。",
    ],
  },
  {
    label: "お子様の利用",
    lines: [
      "小学生のお子様は大人と同乗でご参加いただけます。",
      "※お子様の年齢に合わせてシングル艇又はタンデム艇でご案内",
      "※小学生のお子様も人数のカウントに含まれます。",
      "小学生未満のお子様はご参加いただけません。",
    ],
  },
];

const price = [
  {
    label: "ツアー代金",
    amount: "5,500円（税込）/人",
    amountNote: "　2名様より",
    lines: [
      "例：大人2名、小学生1名　16,500円（税込）",
      "※「ＧＮＯＭＥ」をご利用ではないお客様は別途施設使用料（550円/人）がかかります。",
    ],
  },
  {
    label: "キャンセル料",
    lines: [
      "当日　100%　前日　50％",
      "※天候により実施が難しい場合には、取消料はいただきません。",
    ],
  },
];

const base = [
  {
    key: "sup",
    title: "SUPツアー",
    titleEn: "SUP",
    titleJa: "サップツアー",
    lead: "新しい景色と出会える水上散歩",
    heroHeading: "天気が良ければ<br>富士山が見える水上散歩",
    durationLabel: "所要時間：約60分",
    priceLabel: "¥4,400〜",
    tags: ["事前予約", "個人", "こども"],
    filters: {
      age: ["中学生以上"],
      season: ["春", "夏", "秋"],
      people: ["2名〜"],
      price: ["3,000〜5,000円"],
      duration: ["30〜60分"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
  },
  {
    key: "campfire",
    title: "キャンプファイヤー",
    titleEn: "CAMPFIRE",
    titleJa: "キャンプファイヤー",
    lead: "火を囲んで過ごす特別な夜",
    heroHeading: "揺れる炎を眺めながら<br>語り合う特別な夜",
    durationLabel: "所要時間：約60分",
    priceLabel: "¥4,400〜",
    tags: ["事前予約", "個人", "こども"],
    filters: {
      age: ["制限なし"],
      season: ["春", "夏", "秋", "冬"],
      people: ["1名〜"],
      price: ["3,000〜5,000円"],
      duration: ["30〜60分"],
      weather: ["晴れ", "雨天可"],
      reservation: ["要予約"],
    },
  },
  {
    key: "kayak",
    title: "Hobie 足漕ぎカヤック",
    titleEn: "KAYAK",
    titleJa: "ホビー足漕ぎカヤック",
    lead: "足で漕いで両手が自由になるカヤック",
    heroHeading: "両手が自由だから<br>写真も釣りも楽しめる",
    durationLabel: "所要時間：約60分",
    priceLabel: "¥4,400〜",
    tags: ["事前予約", "個人", "こども"],
    filters: {
      age: ["小学生以上"],
      season: ["春", "夏", "秋"],
      people: ["1名〜"],
      price: ["3,000〜5,000円"],
      duration: ["30〜60分"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
  },
  {
    key: "trail",
    title: "樹海トレイル",
    titleEn: "TRAIL",
    titleJa: "樹海トレイル",
    lead: "ガイドと歩く青木ヶ原樹海",
    heroHeading: "ガイドと歩く<br>苔むした原生林の道",
    durationLabel: "所要時間：約60分",
    priceLabel: "¥4,400〜",
    tags: ["事前予約", "個人", "こども"],
    filters: {
      age: ["小学生以上"],
      season: ["春", "夏", "秋", "冬"],
      people: ["2名〜"],
      price: ["3,000〜5,000円"],
      duration: ["60分〜"],
      weather: ["晴れ", "雨天可"],
      reservation: ["要予約"],
    },
  },
] satisfies Array<
  Omit<
    Activity,
    | "slug"
    | "photo"
    | "description"
    | "heroPhotos"
    | "heroBody"
    | "overview"
    | "price"
  > & { key: string }
>;

/** Figmaのダミー（4種 × 3周 = 12件）を再現した暫定データ */
export const activities: Activity[] = Array.from({ length: 12 }, (_, i) => {
  const { key, ...rest } = base[i % base.length];
  const round = Math.floor(i / base.length);
  return {
    ...rest,
    slug: round === 0 ? key : `${key}-${round + 1}`,
    photo: photos[i % photos.length],
    description,
    heroPhotos,
    heroBody,
    overview,
    price,
  };
});

export const getActivity = (slug: string) =>
  activities.find((activity) => activity.slug === slug);
