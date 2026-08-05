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
  /** 補足説明。改行位置は配列で指定。SPだけの改行は <br class="facility-list__br-sp"> */
  lines: string[];
  photo?: ImageMetadata;
  /** MOREボタンの遷移先。無い施設はボタンを出さない */
  href?: string;
};

// SPは「補足説明」の後で1回改行する（Figma準拠）
const dummy = [
  '補足説明<br class="facility-list__br-sp">◯◯◯◯◯◯◯◯◯◯◯◯',
  "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
];

// 説明文の1行はPC/TBが16字・SPが11字。配列1要素＝PCの1行で、
// SPで溢れる行だけ <br class="facility-list__br-sp"> で割っている。
// 文面の出典はなっぷの「場内共有設備」「駐車場」「アクセス案内」欄
// https://www.nap-camp.com/yamanashi/13592
// ※ 体育館・ほどほどの森・プレイパークはなっぷにも現行サイトにも記載がないため
//   dummy のまま。現場ヒアリング待ち（docs/現場ヒアリングシート.md B-1）

export const facilities: Facility[] = [
  {
    title: "管理棟",
    lines: ["受付はこちらへお越しください", "営業時間 9:00〜17:00"],
    photo: kanri,
  },
  {
    title: "売店",
    lines: [
      '薪や木炭などの<br class="facility-list__br-sp">キャンプ用品を',
      "管理棟で販売しています",
    ],
  },
  {
    title: "駐車場",
    lines: [
      '1台目はサイト内に<br class="facility-list__br-sp">駐車できます',
      '2台目は駐車場を<br class="facility-list__br-sp">ご利用ください',
    ],
  },
  {
    title: "ゴミステーション",
    lines: [
      "ゴミは分別してこちらへ",
      '指定のゴミ袋を<br class="facility-list__br-sp">お渡しします',
    ],
  },
  {
    title: "シャワールーム",
    lines: [
      'コインシャワー<br class="facility-list__br-sp">（3分100円）',
      '※冬季は<br class="facility-list__br-sp">ご利用いただけません',
    ],
  },
  {
    title: "トイレ",
    lines: [
      '温水洗浄便座を<br class="facility-list__br-sp">完備しています',
      '車いす用の個室も<br class="facility-list__br-sp">ございます',
    ],
    photo: toilet,
  },
  {
    title: "炊事場",
    lines: [
      '給湯できる蛇口を<br class="facility-list__br-sp">備えています',
      '焚火台・コンロ<br class="facility-list__br-sp">洗い場あり',
    ],
    photo: kitchen,
  },
  { title: "体育館", lines: dummy },
  // いずみの湯だけ姉妹サイトへ。残り3つはサイト内の詳細ページ
  {
    title: "温泉（いずみの湯）",
    lines: [
      "キャンプ場から約150m",
      '姉妹施設の<br class="facility-list__br-sp">日帰り温泉です',
    ],
    photo: onsen,
    href: "https://izuminoyu.hamayouresort.com/",
  },
  {
    title: "ほどほどの森",
    lines: dummy,
    photo: hodohodo,
    href: "/facility/hodohodo/",
  },
  { title: "プレイパーク", lines: dummy, href: "/facility/playpark/" },
  {
    title: "Kokko",
    small: "BBQ and Activity",
    lines: dummy,
    photo: kokko,
    href: "/facility/kokko/",
  },
];
