// お知らせのデータ。Figmaは同じ記事のダミーが12件並んでいるだけなので、
// 実データが来たらこのファイルを差し替える。

import renewal from "../assets/images/news/renewal.webp";

/** 絞り込みピルの並び順もこの配列に従う */
export const newsCategories = [
  "お知らせ",
  "イベント・キャンペーン",
  "スタッフブログ",
] as const;

export type NewsCategory = (typeof newsCategories)[number];

/** 本文は段落と画像のブロックを並べて表現する */
export type NewsBlock =
  | { type: "text"; text: string }
  | { type: "image"; image: ImageMetadata };

export type NewsItem = {
  slug: string;
  date: string;
  category: NewsCategory;
  /** PCとSPで改行位置が違うので、SPだけの改行は本文側で <br> を入れずタイトルを分割する */
  title: string;
  titleSp?: string[];
  body: NewsBlock[];
};

const dummyBody: NewsBlock[] = [
  {
    type: "text",
    text: [
      "この度、弊社ホームページをリニューアルいたしました。",
      "今回のリニューアルでは皆さまに、より見やすく、",
      "また情報を分かりやすくお伝えできるホームページとなるように、",
      "デザインや構成を一新しました。",
      "",
      "今後とも「湖のほとりのキャンプ場 Gnome」をよろしくお願い申し上げます。",
    ].join("\n"),
  },
  { type: "image", image: renewal },
];

// Figmaは12件。カテゴリの並びもデザインどおり
// ※13件目以降は「もっと見る」の動作確認用ダミー（実データが来たら丸ごと差し替え）
const categoryOrder: NewsCategory[] = [
  "お知らせ",
  "イベント・キャンペーン",
  "スタッフブログ",
  "お知らせ",
  "お知らせ",
  "イベント・キャンペーン",
  "スタッフブログ",
  "お知らせ",
  "お知らせ",
  "イベント・キャンペーン",
  "スタッフブログ",
  "お知らせ",
  "お知らせ",
  "イベント・キャンペーン",
  "スタッフブログ",
  "お知らせ",
];

export const newsItems: NewsItem[] = categoryOrder.map((category, i) => ({
  slug: `renewal-${i + 1}`,
  date: "2025/01/01",
  category,
  title: "ホームページをリニューアルいたしました。",
  titleSp: ["ホームページを", "リニューアルいたしました。"],
  body: dummyBody,
}));
