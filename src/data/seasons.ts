// 四季を楽しむページのデータ。
// 写真はFigmaのダミーをそのまま入れてあるので、実データ確定時に差し替える。

import springMain from "../assets/images/season/photos/spring-main.webp";
import springSub from "../assets/images/season/photos/spring-sub.webp";
import summerMain from "../assets/images/season/photos/summer-main.webp";
import summerSub from "../assets/images/season/photos/summer-sub.webp";
import autumnMain from "../assets/images/season/photos/autumn-main.webp";
import autumnSub from "../assets/images/season/photos/autumn-sub.webp";
import winterMain from "../assets/images/season/photos/winter-main.webp";
import winterSub from "../assets/images/season/photos/winter-sub.webp";

import illustSpring from "../assets/images/season/illust-spring.svg";
import illustSummer from "../assets/images/season/illust-summer.svg";
import illustAutumn from "../assets/images/season/illust-autumn.svg";
import illustWinter from "../assets/images/season/illust-winter.svg";

import pointPhoto from "../assets/images/season/photos/point-dummy.webp";

export type Season = {
  /** アンカー用のID（#spring など） */
  key: string;
  /** 「春」 */
  ja: string;
  /** ナビの「Spring」 */
  en: string;
  /** メインビジュアルの「SPRING」 */
  enLarge: string;
  /** メインビジュアルのキャッチ */
  catch: string;
  /** セクションの地色。冬は色を敷かずテクスチャのみ */
  bg: string | null;
  /**
   * 紙テクスチャの濃さ。既定は 1。
   * テクスチャは mix-blend-mode: luminosity（明度で塗り替える合成）なので、
   * テクスチャより明るい地色は暗く沈む。春のピンクだけ飛び抜けて明るく、
   * そのままだとFigmaより14暗くなるため薄める。
   */
  textureOpacity?: number;
  /** 見出しや文字に使う季節のアクセント色 */
  accent: string;
  /** 「おすすめ01」バッジの地色 */
  badgeBg: string;
  mainPhoto: ImageMetadata;
  subPhoto: ImageMetadata;
  /** メインビジュアル右上の手描き風イラスト */
  illust: string;
  /** イラストの位置。PCは設計2560×1301内のpx */
  illustPc: { left: number; top: number; width: number };
  /** おすすめポイント。1スライド＝写真＋番号＋タイトル＋本文のセットでディゾルブ切り替え */
  points: { titleLines: string[]; body: string; photo: ImageMetadata }[];
};

// おすすめポイントは10枚スライダー。実データ確定まで同じ写真・文章のセットを繰り返す
const makePoints = (titleLines: string[], body: string) =>
  Array.from({ length: 10 }, () => ({ titleLines, body, photo: pointPhoto }));

export const seasons: Season[] = [
  {
    key: "spring",
    ja: "春",
    en: "Spring",
    enLarge: "SPRING",
    catch: "芽吹く新緑と桜の競演",
    bg: "#fff7fa",
    // この値でFigmaの (246,238,241) に一致する
    textureOpacity: 0.39,
    accent: "#ef6f6f",
    badgeBg: "#fce8e6",
    mainPhoto: springMain,
    subPhoto: springSub,
    illust: illustSpring.src,
    illustPc: { left: 1739.3, top: -54.8, width: 590.8 },
    points: makePoints(
      ["野鳥のさえずりと", "自然の音風景"],
      "春は鳥たちが活動を始め、美しいさえずりが湖畔に響き渡ります。新緑の中での野鳥の鳴き声は、心を落ち着かせ、自然との一体感を感じさせてくれます。このリラックス効果は、日常のストレス解消に最適です。"
    ),
  },
  {
    key: "summer",
    ja: "夏",
    en: "Summer",
    enLarge: "SUMMER",
    catch: "清涼感に包まれる湖での水遊び",
    bg: "#bee0e1",
    accent: "#507425",
    badgeBg: "#dde9cd",
    mainPhoto: summerMain,
    subPhoto: summerSub,
    illust: illustSummer.src,
    illustPc: { left: 1755.9, top: -40.6, width: 690.2 },
    points: makePoints(
      ["夜空に輝く星と", "キャンプファイア"],
      "夏の夜間は、満天の星空とともにキャンプファイアを楽しむことができます。焚き火の炎と星の輝きが相まって、非常に幻想的な雰囲気が生まれます。仲間と一緒に火を囲み、語り合う時間は、夏だからこそ味わえる特別な思い出になります。"
    ),
  },
  {
    key: "autumn",
    ja: "秋",
    en: "Autumn",
    enLarge: "AUTUMN",
    catch: "紅葉に染まる湖畔の絶景",
    bg: "#e2dbc1",
    accent: "#d6b156",
    badgeBg: "#fff6df",
    mainPhoto: autumnMain,
    subPhoto: autumnSub,
    illust: illustAutumn.src,
    illustPc: { left: 1781, top: -61, width: 617 },
    points: makePoints(
      // 秋だけ1行のままだと16文字がSPの画面幅を5pxはみ出す。他季節と同じく助詞で改行する
      ["涼しく快適な気候での", "過ごしやすさ"],
      "秋は気温が下がり、キャンプに最適な涼しさが広がります。夏の暑さもなく、冬の寒さも厳しくないこの季節は、長時間を快適に過ごすことができます。天候も安定しやすく、アウトドアライフを思いっきり楽しむことができる絶好の時期です。"
    ),
  },
  {
    key: "winter",
    ja: "冬",
    en: "Winter",
    enLarge: "WINTER",
    catch: "凛とした空気で、際立つ景色",
    bg: null,
    accent: "#138185",
    badgeBg: "#bee0e1",
    mainPhoto: winterMain,
    subPhoto: winterSub,
    illust: illustWinter.src,
    illustPc: { left: 1829.9, top: -100, width: 480 },
    points: makePoints(
      ["凍てついた湖面の", "神秘的な景色"],
      "気温が低い日には湖面が凍り、独特の景観が広がります。朝焼けや夕焼けが湖面に映る光景は非常に美しく、思わず息を呑むほどです。この幻想的な冬景色は、カメラに収めておきたい絶景となり、心に残る思い出が作られます。"
    ),
  },
];
