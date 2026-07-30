// 企業研修・団体利用・ロケ撮影ページのデータ。
// 本文・カードの補足はFigmaがダミーのままなので、実データが来たらここを差し替える。

import illustHodohodo from "../assets/images/private-area/area-hodohodo.svg";
import illustPlaypark from "../assets/images/private-area/area-playpark.svg";
import illustKokko from "../assets/images/private-area/area-kokko.svg";

import mainHodohodo from "../assets/images/private-area/main-hodohodo.svg";
import mainPlaypark from "../assets/images/private-area/main-playpark.svg";
import mainKokko from "../assets/images/private-area/main-kokko.svg";

import ashiyu from "../assets/images/private-area/ashiyu.webp";
import sauna from "../assets/images/private-area/sauna.webp";
import swing from "../assets/images/private-area/swing.webp";
import ninjaLine from "../assets/images/private-area/ninja-line.webp";
import treehouse from "../assets/images/private-area/treehouse.webp";
import hammock from "../assets/images/private-area/hammock.webp";
import crossbow from "../assets/images/private-area/crossbow.webp";

/** 「〜でできること」のカード。写真が未支給のものは photo を持たせない */
export type AreaFeature = {
  title: string;
  note: string;
  photo?: ImageMetadata;
  /** 利用料ボタンを出すカードだけ持つ。遷移先は未定 */
  feeHref?: string;
};

export type PrivateArea = {
  /** ページ内リンクのid */
  slug: string;
  /** 「貸切エリア①」 */
  eyebrow: string;
  /** Kokkoだけ名前の上に小さく乗る英字 */
  nameSub?: string;
  name: string;
  /** カード用の小さいイラスト */
  illustration: ImageMetadata;
  /** 詳細セクションの大きいイラスト（PC） */
  mainIllustration: ImageMetadata;
  /** SPで別サイズのイラストを使う場合 */
  spIllustration?: ImageMetadata;
  /** 背景。green = 色＋テクスチャ / plain = テクスチャのみ */
  bg: "green" | "plain";
  body: string;
  features: AreaFeature[];
  detailHref: string;
};

const dummyBody =
  "ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。ここに説明文が入ります。";

const dummyNote = "補足説明◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯";

export const privateAreas: PrivateArea[] = [
  {
    slug: "hodohodo",
    eyebrow: "貸切エリア①",
    name: "ほどほどの森",
    illustration: illustHodohodo,
    mainIllustration: mainHodohodo,
    bg: "green",
    body: dummyBody,
    detailHref: "/facility/hodohodo/",
    features: [
      { title: "足湯", note: dummyNote, photo: ashiyu, feeHref: "#" },
      { title: "森のサウナ", note: dummyNote, photo: sauna, feeHref: "#" },
      { title: "貸切利用", note: dummyNote, feeHref: "#" },
      { title: "森のブランコ", note: dummyNote, photo: swing },
      { title: "NINJA LINE", note: dummyNote, photo: ninjaLine },
      { title: "ツリーハウス", note: dummyNote, photo: treehouse },
      { title: "ハンモック", note: dummyNote, photo: hammock },
      { title: "クロスボウ", note: dummyNote, photo: crossbow },
      { title: "ファイヤーピット", note: dummyNote },
      { title: "燻製器", note: dummyNote },
      { title: "ダイニングスペースと水場", note: dummyNote },
    ],
  },
  {
    slug: "playpark",
    eyebrow: "貸切エリア②",
    name: "プレイパーク",
    illustration: illustPlaypark,
    mainIllustration: mainPlaypark,
    bg: "plain",
    body: dummyBody,
    detailHref: "/facility/",
    features: [
      { title: "サッカーゴール", note: dummyNote },
      { title: "ストラックアウト", note: dummyNote },
      { title: "テント設営", note: dummyNote },
      { title: "モルック", note: dummyNote },
    ],
  },
  {
    slug: "kokko",
    eyebrow: "貸切エリア③",
    nameSub: "BBQ and Activity",
    name: "Kokko",
    illustration: illustKokko,
    mainIllustration: mainKokko,
    spIllustration: illustKokko,
    bg: "green",
    body: dummyBody,
    detailHref: "/facility/",
    features: [
      { title: "BBQ", note: dummyNote },
      { title: "飯盒炊爨", note: dummyNote },
      { title: "ピザ作り", note: dummyNote },
      { title: "プロジェクター上映", note: dummyNote },
    ],
  },
];

/** ご利用シーンのタグ。改行位置はFigmaどおり */
export const usageScenes: string[][] = [
  ["コミュニティ", "サークル"],
  ["企業研修"],
  ["イベント"],
  ["オリエン", "テーション"],
  ["スポーツ団体"],
  ["ボーイ", "スカウト"],
  ["懇親会"],
  ["オフ会"],
  ["ファンクラブ"],
  ["ロケ撮影"],
];
