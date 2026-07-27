// レンタル・販売品のデータ。写真はFigmaの支給画像をそのまま書き出したもの。

import tent from "../assets/images/rental/tent.webp";
import tarp from "../assets/images/rental/tarp.webp";
import mat from "../assets/images/rental/mat.webp";
import silverMat from "../assets/images/rental/silver-mat.webp";
import sleepingBag from "../assets/images/rental/sleeping-bag.webp";
import bbqGrill from "../assets/images/rental/bbq-grill.webp";
import dutchOven from "../assets/images/rental/dutch-oven.webp";
import chair from "../assets/images/rental/chair.webp";
import table from "../assets/images/rental/table.webp";
import bonfireStand from "../assets/images/rental/bonfire-stand.webp";
import ledLantern from "../assets/images/rental/led-lantern.webp";

import firewood from "../assets/images/rental/firewood.webp";
import charcoal from "../assets/images/rental/charcoal.webp";
import firelighter from "../assets/images/rental/firelighter.webp";
import lighter from "../assets/images/rental/lighter.webp";
import batteryD from "../assets/images/rental/battery-d.webp";
import batteryC from "../assets/images/rental/battery-c.webp";
import batteryAa from "../assets/images/rental/battery-aa.webp";
import dishSoap from "../assets/images/rental/dish-soap.webp";
import sponge from "../assets/images/rental/sponge.webp";
import bbqNet from "../assets/images/rental/bbq-net.webp";

export type Item = {
  /** 品名 */
  name: string;
  /** 品名のうしろに小さく添える文字（例: （5名用）） */
  small?: string;
  /** 価格の左に置く緑のピル。無い品目はピルごと出さない */
  badge?: string;
  price: string;
  photo: ImageMetadata;
};

export const rentalItems: Item[] = [
  {
    name: "テント",
    small: "（5名用）",
    badge: "1張2泊まで",
    price: "7,700円",
    photo: tent,
  },
  { name: "タープ", badge: "1張2泊まで", price: "7,700円", photo: tarp },
  { name: "マット", badge: "1泊", price: "600円", photo: mat },
  { name: "銀マット", badge: "1泊", price: "350円", photo: silverMat },
  {
    name: "寝袋",
    small: "（3シーズン対応）",
    badge: "1泊",
    price: "1,200円",
    photo: sleepingBag,
  },
  {
    name: "BBQグリル",
    small: "（網付き）",
    badge: "1泊",
    price: "2,600円",
    photo: bbqGrill,
  },
  { name: "ダッチオーブン", badge: "1泊", price: "1,200円", photo: dutchOven },
  { name: "イス", badge: "1泊", price: "350円", photo: chair },
  { name: "テーブル", badge: "1泊", price: "600円", photo: table },
  { name: "焚火台", badge: "1泊", price: "1,800円", photo: bonfireStand },
  { name: "LEDランタン", badge: "1泊", price: "600円", photo: ledLantern },
];

export const saleItems: Item[] = [
  { name: "薪", badge: "1束", price: "800円", photo: firewood },
  { name: "木炭", badge: "3kg", price: "800円", photo: charcoal },
  { name: "着火剤", price: "300円", photo: firelighter },
  { name: "チャッカマン", price: "350円", photo: lighter },
  { name: "単一電池", badge: "2本", price: "400円", photo: batteryD },
  { name: "単二電池", badge: "2本", price: "300円", photo: batteryC },
  { name: "単三/単四電池", badge: "4本", price: "200円", photo: batteryAa },
  { name: "食器用洗剤", badge: "200ml", price: "300円", photo: dishSoap },
  { name: "スポンジ", badge: "1個", price: "100円", photo: sponge },
  // 「COMING SOON !」はFigmaの支給写真に焼き込まれている
  { name: "ＢＢＱ用焼き網", price: "200円", photo: bbqNet },
];
