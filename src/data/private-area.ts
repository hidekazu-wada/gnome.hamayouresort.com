// 企業研修・団体利用・ロケ撮影ページのデータ。
// 本文・カードの補足はFigmaがダミーのままなので、実データが来たらここを差し替える。

import illustHodohodo from "../assets/images/private-area/area-hodohodo.svg";
import illustPlaypark from "../assets/images/private-area/area-playpark.svg";
import illustKokko from "../assets/images/private-area/area-kokko.svg";

export type PrivateArea = {
  /** ページ内リンクのid */
  slug: string;
  /** 「貸切エリア①」 */
  eyebrow: string;
  /** Kokkoだけ名前の上に小さく乗る英字 */
  nameSub?: string;
  name: string;
  illustration: ImageMetadata;
};

export const privateAreas: PrivateArea[] = [
  {
    slug: "hodohodo",
    eyebrow: "貸切エリア①",
    name: "ほどほどの森",
    illustration: illustHodohodo,
  },
  {
    slug: "playpark",
    eyebrow: "貸切エリア②",
    name: "プレイパーク",
    illustration: illustPlaypark,
  },
  {
    slug: "kokko",
    eyebrow: "貸切エリア③",
    nameSub: "BBQ and Activity",
    name: "Kokko",
    illustration: illustKokko,
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
