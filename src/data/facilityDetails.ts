// 共有施設・設備の詳細ページのデータ。
//
// ほどほどの森 / プレイパーク / Kokko の3ページが
// src/assets/components/pages/facility/detail/ の同じコンポーネントを共有し、
// 中身だけをここから流し込む。デザインはFigmaにほどほどの森ぶんしか無いため、
// 3ページとも配色・レイアウトは同一（デザインが分かれたらコンポーネントを分割する）。
//
// 出典:
// - ほどほどの森 … Figma（本文はダミーのまま。現地ヒアリング待ち）
// - Kokko … 現行サイト https://www.hamayouresort.com/bbq-and-activity-kokko/ の実データ
// - プレイパーク … 資料なし。遊具名だけ private-area.ts（Figma）と揃え、
//                  それ以外は【ヒアリング】と明記したアタリ文章
//
// アタリ文章は ◯ を並べずに「その欄に何を書くか」を書いてある。
// 打ち合わせで画面を見ながら埋められるようにするため。
//
// 1行に入る文字数（実測。vw基準なのでPC/TBは同じ位置で折り返す）
//   ヒーローの lead … 1行15字程度 × 2行
//   ヒーローの body … PC 23字 / SP 20字
//   カード見出し title … PC 13字 / SP 10字
//   カード説明 lines  … PC 16字 / SP 11字（配列の1要素＝1行）
//
// カード説明は PC と SP で1行に入る字数が違うので、狭いほう（SP 11字）に合わせて書く。
// PC 基準で16字にするとSPで各行がさらに折り返して2倍の行数になる。

import hero from "../assets/images/facility/hodohodo/hero.webp";
import ashiyu from "../assets/images/facility/hodohodo/ashiyu.webp";
import sauna from "../assets/images/facility/hodohodo/sauna.webp";
import swing from "../assets/images/facility/hodohodo/swing.webp";
import ninja from "../assets/images/facility/hodohodo/ninja.webp";
import treehouse from "../assets/images/facility/hodohodo/treehouse.webp";
import hammock from "../assets/images/facility/hodohodo/hammock.webp";
import crossbow from "../assets/images/facility/hodohodo/crossbow.webp";
import campIllust from "../assets/images/facility/hodohodo/camp-illust.svg";
import kokkoPhoto from "../assets/images/facility/photos/kokko.webp";

export type FacilityDetailItem = {
  title: string;
  lines: string[];
  photo?: ImageMetadata;
  /** 「利用料」ボタンを出すか。遷移先は確定待ち */
  hasFee?: boolean;
};

export type FacilityDetailSpecRow = { label: string; lines: string[] };

export type FacilityDetail = {
  /** /facility/{slug}/ */
  slug: string;
  /** h1 と「“◯◯”でできること」に使う施設名 */
  name: string;
  /** 名前の上に小さく乗る英字（Kokkoのみ） */
  nameSub?: string;
  /** <title> / meta description */
  description: string;
  /** ヒーローの白いバッジ。持たない施設は出さない */
  badge?: string;
  /** バッジ下の注記。1要素＝1行 */
  notes?: string[];
  /** ディゾルブする写真。空配列ならグレーの箱を出す */
  heroPhotos: ImageMetadata[];
  /** 本文カラムの上に重ねるイラスト（ほどほどの森のみ） */
  illustration?: ImageMetadata;
  /** 緑の見出し。1要素＝1行 */
  lead: string[];
  body: string;
  items: FacilityDetailItem[];
  /** 利用料モーダル。持たない施設はボタンもモーダルも出ない */
  fee?: { price: string; notes: string[] };
  spec: FacilityDetailSpecRow[];
};

const dummy = ["補足説明◯◯◯◯◯◯◯◯◯◯◯◯", "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"];

// ─────────────────────────────────────────────
// ほどほどの森（既存。中身は移設前と同じ）
// ─────────────────────────────────────────────
const hodohodo: FacilityDetail = {
  slug: "hodohodo",
  name: "ほどほどの森",
  description:
    "道路を渡ってすぐ隣に広がる1,000㎡のカラマツ林。天然温泉の足湯やサウナ小屋、キャンプ、アウトドア体験が楽しめます。",
  badge: "ご利用料：無料",
  notes: [
    "※源泉、サウナ、貸切のご利用は有料となります。",
    "※貸切利用中はご利用いただけません。また、ご利用はご宿泊されているお客様に限ります。",
  ],
  // 実データ確定までは既存写真のダミー3枚
  heroPhotos: [hero, ashiyu, sauna],
  illustration: campIllust,
  lead: ["すべてがちょうどいい！", "プライベートな森！"],
  body: "道路を渡ってすぐ隣に広がる1,000㎡のカラマツ林。ほどよい間隔で間伐してあり、夏は涼しい木陰に、秋は林が黄金色に輝き、冬は沢山の陽の光が差し込みます。西湖唯一の天然温泉をかけ流しにした足湯やサウナ小屋、キャンプ、アウトドア体験が楽しめます。",
  items: [
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
  ],
  // 利用料モーダルの中身（実データ確定までダミー）
  fee: {
    price: "◯◯◯◯◯円",
    notes: [
      "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
      "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
      "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
      "◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯",
    ],
  },
  spec: [
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
  ],
};

// ─────────────────────────────────────────────
// プレイパーク
// 資料が一切ないページ。遊具の4点だけ private-area.ts（Figma）と揃えてあり、
// それ以外はすべて【】で囲んだヒアリング項目。打ち合わせでここを潰していく。
// ─────────────────────────────────────────────
const playpark: FacilityDetail = {
  slug: "playpark",
  name: "プレイパーク",
  description:
    "サッカーゴールやストラックアウト、モルックなどで体を動かせる、貸切もできる広場です。",
  badge: "ご利用料：【ヒアリング】",
  notes: [
    "※無料か有料か、貸切の場合の料金と予約方法をヒアリングして記載します。",
    "※宿泊者限定なのか、日帰りでも使えるのかもこの行に書きます。",
  ],
  // 写真が未支給。空配列にするとグレーの箱が出る
  heroPhotos: [],
  lead: ["【キャッチコピー上段】", "【下段・各15字程度】"],
  body: "【紹介文がここに入ります。1行23字で4〜6行が目安です。どんな場所か／そこで何ができるか／どんな人におすすめかの3点を入れると読み手に伝わります。長さの見当は、同じ枠のほどほどの森の紹介文と見比べてください。】",
  items: [
    // 遊具の4点は private-area.ts（Figma）と同じ。増減はここに行を足し引きする
    {
      title: "サッカーゴール",
      lines: ["【台数とサイズ、", "ボール貸出の有無】"],
    },
    {
      title: "ストラックアウト",
      lines: ["【的の数と対象年齢、", "利用料の有無】"],
    },
    {
      title: "テント設営",
      lines: ["【体験の内容と", "所要時間・料金】"],
    },
    {
      title: "モルック",
      lines: ["【貸出セット数と", "ルール説明の有無】"],
    },
    {
      title: "【遊具を追加】",
      lines: ["【他の遊具・設備は", "この形式で足せます】"],
    },
  ],
  spec: [
    { label: "施設名", lines: ["プレイパーク"] },
    {
      label: "収容人数",
      lines: [
        "【ヒアリング】キャンプ：◯名程度／イベント：◯名程度",
        "",
        "※内容によって異なりますので詳しくはお問い合わせください。",
      ],
    },
    { label: "面積", lines: ["【ヒアリング】約◯,◯◯◯㎡（◯m x ◯m）"] },
    { label: "営業時間", lines: ["【ヒアリング】◯:00-◯◯:00"] },
    {
      // ラベル欄は ppx(200)＝全角5字ぶんしかないので6字だと折り返す
      label: "貸切料金",
      lines: ["【ヒアリング】平日／土日祝それぞれの料金"],
    },
  ],
};

// ─────────────────────────────────────────────
// Kokko
// 現行サイト https://www.hamayouresort.com/bbq-and-activity-kokko/ の実データ。
// 面積だけは現行サイトにも記載がないためヒアリング項目。
// ─────────────────────────────────────────────
const kokko: FacilityDetail = {
  slug: "kokko",
  name: "Kokko",
  nameSub: "BBQ and Activity",
  description:
    "西湖が目の前に広がる貸切エリア。大型ファイヤーピットやピザ窯、かまど、プロジェクターを備え、最大320名までご利用いただけます。",
  // バッジはSPで white-space: nowrap が効くため長い文字列は横に飛び出す。
  // 平日／土日祝の内訳は注記と施設概要のほうに書く
  badge: "貸切利用料：¥55,000〜",
  notes: [
    "※平日 ¥55,000〜／土日祝 ¥88,000〜（税込）。人数・内容により変動します。",
    "※お申し込みは問合せフォームより、ご利用希望日時と人数をご連絡ください。",
  ],
  // 支給済みの写真は1枚だけ。増えたらここに足すとディゾルブが有効になる
  heroPhotos: [kokkoPhoto],
  lead: ["家族・友人・仲間と一緒に！", "貸切で楽しむ贅沢な休日！"],
  body: "富士五湖の中でも透明度が高く、静かで美しい西湖が目の前に広がる絶好のロケーションに位置しています。トイレ・シャワー棟をはじめ、大型スクリーン、プロジェクター、音響システムなどの映像・音響機器や、大型ファイヤーピット、大型ピザ窯、かまどなどを備えています。",
  items: [
    {
      title: "大型ファイヤーピット",
      lines: ["1台。火を囲んで", "過ごす中心の設備"],
    },
    {
      title: "大型ピザ窯",
      lines: ["1台。生地をのばす", "ところから体験可能"],
    },
    {
      title: "炊飯用かまど",
      lines: ["14台。大人数でも", "一度に飯盒炊爨可能"],
    },
    {
      title: "ファイヤーピットテーブル",
      lines: ["20台。1台につき", "最大8名まで利用可"],
    },
    {
      title: "スクリーン・音響",
      lines: ["大型スクリーン、", "プロジェクター、音響"],
    },
    {
      title: "トイレ・シャワー棟",
      lines: ["エリア内にトイレと", "シャワー棟があります"],
    },
  ],
  spec: [
    {
      label: "施設名",
      lines: ["Kokko（こっこ）　※フィンランド語の「焚火」です"],
    },
    { label: "最大収容", lines: ["320名"] },
    { label: "面積", lines: ["【ヒアリング】現行サイトに記載がないため未確定"] },
    { label: "営業時間", lines: ["9:00-16:00　※時間外については応相談"] },
    {
      // ラベル欄は ppx(200)＝全角5字ぶんしかないので6字だと折り返す
      label: "貸切料金",
      lines: [
        '土日祝：¥88,000（税込）〜　<br class="hodo-spec__br-sp">平日：¥55,000（税込）〜',
      ],
    },
    { label: "精算方法", lines: ["現地精算（現金またはカード）"] },
  ],
};

export const facilityDetails = { hodohodo, playpark, kokko };

export type FacilityDetailSlug = keyof typeof facilityDetails;
