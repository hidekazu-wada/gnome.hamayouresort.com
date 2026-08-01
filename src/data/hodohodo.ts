// ほどほどの森の詳細ページのデータ。
// 写真が未支給のものはFigmaでもグレーのままなので photo を持たせていない。

import hero from "../assets/images/facility/hodohodo/hero.webp";
import ashiyu from "../assets/images/facility/hodohodo/ashiyu.webp";
import sauna from "../assets/images/facility/hodohodo/sauna.webp";
import swing from "../assets/images/facility/hodohodo/swing.webp";
import ninja from "../assets/images/facility/hodohodo/ninja.webp";
import treehouse from "../assets/images/facility/hodohodo/treehouse.webp";
import hammock from "../assets/images/facility/hodohodo/hammock.webp";
import crossbow from "../assets/images/facility/hodohodo/crossbow.webp";

export type HodohodoItem = {
  title: string;
  lines: string[];
  photo?: ImageMetadata;
  /** 「利用料」ボタンを出すか。遷移先は確定待ち */
  hasFee?: boolean;
};

const dummy = ["補足説明◯◯◯◯◯◯◯◯◯◯◯◯", "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"];

/** ヒーローのディゾルブ写真（実データ確定までは既存写真のダミー3枚） */
export const hodohodoHeroPhotos = [hero, ashiyu, sauna];

/** 利用料モーダルの中身（実データ確定までダミー） */
export const hodohodoFee = {
  price: "◯◯◯◯◯円",
  notes: [
    "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
    "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
    "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
    "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
  ],
};

export const hodohodoItems: HodohodoItem[] = [
  { title: "足湯", lines: dummy, photo: ashiyu, hasFee: true },
  { title: "森のサウナ", lines: dummy, photo: sauna, hasFee: true },
  { title: "貸切利用", lines: dummy, hasFee: true },
  { title: "森のブランコ", lines: dummy, photo: swing },
  { title: "NINJA LINE", lines: dummy, photo: ninja },
  { title: "ツリーハウス", lines: dummy, photo: treehouse },
  { title: "ハンモック", lines: dummy, photo: hammock },
  { title: "クロスボウ", lines: dummy, photo: crossbow },
  { title: "ファイヤーピット", lines: dummy },
  { title: "燻製器", lines: dummy },
  { title: "ダイニングスペースと水場", lines: dummy },
];

export const hodohodoSpec: { label: string; lines: string[] }[] = [
  { label: "施設名", lines: ["ほどほどの森"] },
  // lines: "" はSPだけの空行。SPだけの改行は <br class="hodo-spec__br-sp">
  {
    label: "収容人数",
    lines: [
      'キャンプ：30名程度　<br class="hodo-spec__br-sp">イベント：50～100名程度',
      "",
      "※内容によって異なりますので詳しくはお問い合わせください。",
    ],
  },
  { label: "面積", lines: ["約1,000㎡（60m x 15 ～ 18m）"] },
  { label: "営業時間", lines: ["9:00-21:00　※プランによって異なります。"] },
];
