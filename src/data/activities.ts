// アクティビティのデータ。
//
// 実データがあるのは SUP の詳細ページのみ（supDetail）。
// キャンプファイヤー・カヤック・樹海トレイルは dummyDetail を割り当てている。
// 以前は supDetail を全アクティビティに流用していたため、たとえばキャンプファイヤーの
// 詳細ページに「開催日：11月」「湖畔へ移動して漕ぎ方を説明」といった
// もっともらしい嘘が出ていた。実データが来るまではダミーとわかる状態を保つこと。
//
// カードの durationLabel / priceLabel / tags / filters は4種ともFigmaのダミー値
// （全て「約60分」「¥4,400〜」）。一覧の見た目が崩れるためそのままにしてあるが、
// これも実データではない。

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
  /** ご利用の流れ */
  steps: { title: string; text: string }[];
  /** 注意事項。1要素＝1項目、配列の中身は段落 */
  notes: string[][];
};

const photos = [card01, card02, card03, card04, card05, card06, card07, card08];

const description =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";

// 詳細ページのメインビジュアル（実データ確定までは全アクティビティ共通のダミー）
const heroPhotos = [hero01, card01, card05];

// ---------------------------------------------------------------------------
// SUPの詳細ページ（実データ）
// ---------------------------------------------------------------------------

const supHeroBody = [
  "1日のうちで最もコンディションがよくなる確率が高いのが早朝と夕方です。",
  "1組限定のプライベートツアーで朝ならではの見どころをご案内いたします。",
  "約1時間半のツアーです。もちろんレクチャー付きなので初めてでも大丈夫です。",
];

// lines: 1要素＝1段落。"" はSPだけの空行。SPだけの改行は <br class="detail-overview__br-sp">
const supOverview = [
  {
    label: "開催日",
    lines: [
      '11月　<br class="detail-overview__br-sp">その年の気候により早めに開催、終了する場合がございます。',
      "※事前予約制になります。",
    ],
  },
  {
    label: "受付場所",
    lines: [
      '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">アクティビティ管理棟（赤いトレーラーハウス）',
    ],
  },
  { label: "受付時間", lines: ["7時45分集合　8時開始"] },
  {
    label: "対象年齢",
    lines: [
      "中学生以上",
      "",
      "※小学生のお子様は大人と同乗でご参加いただけます。",
      "（お子様の年齢に合わせてシングル艇又はタンデム艇でご案内）",
      "※小学生のお子様も人数のカウントに含まれます。",
    ],
  },
  {
    label: "お子様の利用",
    lines: [
      "小学生のお子様は大人と同乗でご参加いただけます。",
      "",
      "※お子様の年齢に合わせてシングル艇又はタンデム艇でご案内",
      "※小学生のお子様も人数のカウントに含まれます。",
      "小学生未満のお子様はご参加いただけません。",
    ],
  },
];

const supSteps = [
  {
    title: "受付",
    text: "キャンプビレッジＧＮＯＭＥ内のアクティビティ管理棟（赤いトレーラーハウス）にて受付を行います。",
  },
  { title: "誓約書にサイン", text: "誓約書の内容をご確認いただきサインをいただきます。" },
  {
    title: "道具のお渡し",
    text: "管理棟にてボード、ライフジャケット、パドル等をお渡しいたします。",
  },
  { title: "レクチャー", text: "湖畔へ移動して漕ぎ方や注意点などの説明をいたします。" },
  {
    title: "ツアー開始",
    text: "安全に注意してツアーをお楽しみください。その日のコンディションに合わせて見どころを周ります。",
  },
  {
    title: "終了",
    text: "ツアーが終わりましたら管理棟までSUPを戻していただき終了となります。",
  },
];

const supNotes = [
  ["基本はシングル艇でのご案内となります。"],
  [
    "景色を楽しむことに重点を置いたツアーですので落水防止のために基本的には座って乗っていただきます。",
    "（ウェットスーツなどご持参の方は立って乗っていただいても大丈夫です）",
  ],
  ["中学生以上（大人同伴）で1人乗りでご参加可能です。"],
  ["ご希望に合わせてタンデム艇（2～3人乗り）でのご案内も可能です。"],
  [
    "小学生のお子様は大人の方と同乗でご参加可能です。その場合、お子様の年齢など条件によりタンデム艇（2～3人乗り）に変更になる場合がございます。",
  ],
  ["小学生のお子様も申込人数に含まれます。"],
  ["破損や紛失等の場合は所定の金額をお支払いいただく場合がございます。"],
  ["安全のため、必ずガイドの指示にしたがってください。"],
  ["防寒対策をしてお越しください。"],
  ["濡れても大丈夫な服装でお越しください。"],
  ["必ずライフジャケットを着用ください。"],
  ["天候によっては中止させていただく場合がございます。"],
  ["ペットの乗船はお断りしております。"],
];

// ※カードの priceLabel「¥4,400〜」と金額が食い違っている。どちらが正か要確認
const supPrice = [
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

type ActivityDetail = Pick<
  Activity,
  "heroBody" | "overview" | "price" | "steps" | "notes"
>;

const supDetail: ActivityDetail = {
  heroBody: supHeroBody,
  overview: supOverview,
  price: supPrice,
  steps: supSteps,
  notes: supNotes,
};

// ---------------------------------------------------------------------------
// SUP以外の詳細ページ（実データ待ちのダミー）
//
// 開催日・受付場所・持ち物・料金・注意事項は現場に確認しないと書けないため、
// 他のデータファイル（facilities.ts / hodohodo.ts / faq.ts）と同じ表記で
// 「未確定」とわかる状態にしてある。項目数はレイアウト確認のため実データに近づけつつ、
// 注意事項だけSUPの13項目から6項目に減らしてある。
// ---------------------------------------------------------------------------

const dummyLine = "ここに説明文が入ります。ここに説明文が入ります。";

const dummyDetail: ActivityDetail = {
  heroBody: [dummyLine, dummyLine, dummyLine],
  overview: [
    { label: "開催日", lines: ["◯◯月〜◯◯月", "※事前予約制になります。"] },
    { label: "受付場所", lines: ["◯◯◯◯◯◯◯◯◯◯◯◯"] },
    { label: "受付時間", lines: ["◯◯時◯◯分集合　◯◯時開始"] },
    { label: "対象年齢", lines: ["◯◯◯◯以上", "", "※◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"] },
    { label: "お子様の利用", lines: ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"] },
  ],
  price: [
    {
      label: "ツアー代金",
      amount: "◯,◯◯◯円（税込）/人",
      amountNote: "　◯名様より",
      lines: ["※◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    },
    { label: "キャンセル料", lines: ["当日　◯◯%　前日　◯◯%"] },
  ],
  steps: [
    { title: "受付", text: dummyLine },
    { title: "誓約書にサイン", text: dummyLine },
    { title: "道具のお渡し", text: dummyLine },
    { title: "レクチャー", text: dummyLine },
    { title: "開始", text: dummyLine },
    { title: "終了", text: dummyLine },
  ],
  notes: [
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
  ],
};

const base = [
  {
    key: "sup",
    title: "SUPツアー",
    titleEn: "SUP",
    titleJa: "サップツアー",
    lead: '新しい景色と出会える<br class="page-header__br-sp">水上散歩',
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
    detail: supDetail,
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
    detail: dummyDetail,
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
    detail: dummyDetail,
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
    detail: dummyDetail,
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
    | "steps"
    | "notes"
  > & { key: string; detail: ActivityDetail }
>;

/** Figmaのダミー（4種 × 3周 = 12件）を再現した暫定データ */
export const activities: Activity[] = Array.from({ length: 12 }, (_, i) => {
  const { key, detail, ...rest } = base[i % base.length];
  const round = Math.floor(i / base.length);
  return {
    ...rest,
    ...detail,
    slug: round === 0 ? key : `${key}-${round + 1}`,
    photo: photos[i % photos.length],
    description,
    heroPhotos,
  };
});

export const getActivity = (slug: string) =>
  activities.find((activity) => activity.slug === slug);
