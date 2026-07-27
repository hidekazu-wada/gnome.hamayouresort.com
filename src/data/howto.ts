// 過ごし方ページのデータ。
// Figmaにあるのは CASE01 ファミリーのみ。他の4件は同じ構成のダミーで、
// 実データ確定時にここを差し替える。

import introPhoto from "../assets/images/howto/photos/intro-dummy.webp";
import dayPhoto from "../assets/images/howto/photos/day-dummy.webp";

export type HowtoEntry = {
  time: string;
  title: string;
  body: string;
  photo: ImageMetadata;
};

export type Howto = {
  /** URL（/howto/{slug}/） */
  slug: string;
  /** ナビの円に入る文字 */
  label: string;
  /** 「CASE01」 */
  caseNo: string;
  /** 「FAMILY」 */
  en: string;
  lead: string;
  photo: ImageMetadata;
  /** 上部の時間軸。日ごとにまとめる */
  schedule: { day: string; items: { time: string; label: string }[] }[];
  /** 本文。日ごとの詳細 */
  days: { day: string; entries: HowtoEntry[] }[];
};

const body =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";

const lead =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";

// Figmaどおりの時間軸（全ケース共通のダミー）
const schedule = [
  {
    day: "Day 1",
    items: [
      { time: "15:00", label: "チェックイン" },
      { time: "15:30", label: "お部屋でひとやすみ" },
      { time: "16:00", label: "周辺散策・買い出し" },
      { time: "17:00", label: "ご夕食" },
      { time: "19:00", label: "入浴" },
      { time: "20:00", label: "ゆったりした時間を過ごす" },
      { time: "21:00", label: "星空鑑賞・就寝" },
    ],
  },
  {
    day: "Day 2",
    items: [
      { time: "7:30", label: "湖畔を散歩" },
      { time: "8:00", label: "朝食" },
      { time: "10:00", label: "チェックアウト" },
      { time: "11:00", label: "周辺観光" },
    ],
  },
];

// 本文はFigmaのダミーどおり4件ずつ
const entries = (times: string[]): HowtoEntry[] =>
  times.map((time) => ({ time, title: "チェックイン", body, photo: dayPhoto }));

const days = [
  { day: "Day 1", entries: entries(["15:00", "15:30", "16:00", "17:00"]) },
  { day: "Day 2", entries: entries(["7:30", "8:00", "10:00", "11:00"]) },
];

const base = [
  { slug: "family", label: "ファミリー", en: "FAMILY" },
  { slug: "couple", label: "カップル", en: "COUPLE" },
  { slug: "girls", label: "女子会", en: "GIRLS" },
  { slug: "group", label: "グルキャン", en: "GROUP" },
  { slug: "training", label: "企業研修", en: "TRAINING" },
];

export const howtos: Howto[] = base.map((item, i) => ({
  ...item,
  caseNo: `CASE0${i + 1}`,
  lead,
  photo: introPhoto,
  schedule,
  days,
}));
