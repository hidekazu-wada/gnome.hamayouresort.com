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
  /** カードの角丸タグ */
  tags: string[];
  /** 「¥9,350〜」の部分 */
  price: string;
  /** 絞り込み用の属性。該当する選択肢を全て入れる */
  filters: Record<StayFilterKey, string[]>;
};

const photos = [site01, site02, site03, site04, site05, site06, site07, site08];

const base = [
  {
    key: "rinkan",
    titleLines: ["木々に囲まれた", "林間サイト"],
    lead: "木々に囲まれた林間サイト",
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
    code: "Y-1",
    badgeLines: ["ママに", "大人気"],
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
    code: "T-1",
    badgeLines: ["屋根付き", "デッキ"],
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
    code: "R-1",
    badgeLines: ["初心者に", "おすすめ"],
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
] satisfies Array<Omit<Stay, "slug" | "photo"> & { key: string }>;

/** Figmaのダミー（8種 × 2周 = 16件）を再現した暫定データ */
export const stays: Stay[] = Array.from({ length: 16 }, (_, i) => {
  const { key, ...rest } = base[i % base.length];
  const round = Math.floor(i / base.length);
  return {
    ...rest,
    slug: round === 0 ? key : `${key}-${round + 1}`,
    photo: photos[i % photos.length],
  };
});
