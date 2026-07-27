// よくあるご質問のデータ。
// Figmaの質問文・回答文はダミーのままなので、実データが来たらここを差し替える。

export type FaqItem = {
  q: string;
  a: string;
};

export type FaqCategory = {
  /** アンカーリンクのid */
  id: string;
  title: string;
  items: FaqItem[];
};

const dummyAnswer =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";

const dummyItems: FaqItem[] = [
  { q: "ペットと一緒に泊まれますか？", a: dummyAnswer },
  { q: "フリーサイトは何時から受付ができますか？", a: dummyAnswer },
  { q: "1人で2サイト予約した場合は隣同士になれますか？", a: dummyAnswer },
  { q: "フリーサイトは何時から受付ができますか？", a: dummyAnswer },
  { q: "1人で2サイト予約した場合は隣同士になれますか？", a: dummyAnswer },
];

export const faqCategories: FaqCategory[] = [
  { id: "stay", title: "宿泊について", items: dummyItems },
  { id: "facility", title: "施設・設備について", items: dummyItems },
  { id: "activity", title: "アクティビティについて", items: dummyItems },
  { id: "payment", title: "お支払い方法について", items: dummyItems },
];
