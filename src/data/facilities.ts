// 共有施設・設備のデータ。
// 写真が未支給のものはFigmaでもグレーのままなので、photo を持たせていない。

import kanri from "../assets/images/facility/photos/kanri.webp";
import toilet from "../assets/images/facility/photos/toilet.webp";
import kitchen from "../assets/images/facility/photos/kitchen.webp";
import onsen from "../assets/images/facility/photos/onsen.webp";
import hodohodo from "../assets/images/facility/photos/hodohodo.webp";
import kokko from "../assets/images/facility/photos/kokko.webp";

export type Facility = {
  /** カードの見出し。小さく添える文字がある場合は small に入れる */
  title: string;
  small?: string;
  /** 補足説明。改行位置は配列で指定 */
  lines: string[];
  photo?: ImageMetadata;
  /** MOREボタンの遷移先。無い施設はボタンを出さない */
  href?: string;
};

const dummy = ["補足説明◯◯◯◯◯◯◯◯◯◯◯◯", "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"];

export const facilities: Facility[] = [
  {
    title: "管理棟",
    lines: ["受付はこちらへお越しください", "営業時間 9:00〜17:00"],
    photo: kanri,
  },
  { title: "売店", lines: dummy },
  { title: "駐車場", lines: dummy },
  { title: "ゴミステーション", lines: dummy },
  { title: "シャワールーム", lines: dummy },
  { title: "トイレ", lines: dummy, photo: toilet },
  { title: "炊事場", lines: dummy, photo: kitchen },
  { title: "体育館", lines: dummy },
  // 遷移先は確定待ち
  // いずみの湯は姉妹サイトへ（プレイパーク・KokkoはURL確定待ち）
  { title: "温泉（いずみの湯）", lines: dummy, photo: onsen, href: "https://izuminoyu.hamayouresort.com/" },
  {
    title: "ほどほどの森",
    lines: dummy,
    photo: hodohodo,
    href: "/facility/hodohodo/",
  },
  { title: "プレイパーク", lines: dummy, href: "#" },
  {
    title: "Kokko",
    small: "BBQ and Activity",
    lines: dummy,
    photo: kokko,
    href: "#",
  },
];
