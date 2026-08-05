// アクティビティのデータ。
//
// 掲載するのは「個人で予約できる」10種のみ。キャンプファイヤー・いかだ作り・
// チームビルディング等は10名〜300名の団体プログラムなので、企業研修・団体ページの
// 領分としてここには載せない。
//
// 出典はすべて現行サイト（hamayouresort.com）の各アクティビティ詳細ページ。
// 各エントリのコメントに出典URLを書いてある。現行サイトに記載がない項目は
// 推測で埋めず、filters なら空配列、テキストなら省略している（【ヒアリング】と明記）。
// filters が空配列の項目は、その絞り込みを使ったときに該当しなくなる。
//
// カードの priceLabel は幅 ppx(180) の nowrap なので7〜8字が上限。
// 「/組」「/人」の単位は入らないため、単位は詳細ページの料金表でのみ示している。

import cardSupTour from "../assets/images/activity/cards/sup-tour.jpg";
import cardSupRental from "../assets/images/activity/cards/sup-rental.jpg";
import cardPedalBoards from "../assets/images/activity/cards/pedal-boards.jpg";
import cardKayak from "../assets/images/activity/cards/kayak.jpg";
import cardJukaiTour from "../assets/images/activity/cards/jukai-tour.jpg";
import cardJukaiMorning from "../assets/images/activity/cards/jukai-morning.jpg";
import cardSenoumiSaiko from "../assets/images/activity/cards/senoumi-saiko.jpg";
import cardSenoumiMotosu from "../assets/images/activity/cards/senoumi-motosu.jpg";
import cardSenoumiShoji from "../assets/images/activity/cards/senoumi-shoji.jpg";
import cardPrivateSauna from "../assets/images/activity/cards/private-sauna.jpg";

import heroSupTour1 from "../assets/images/activity/heroes/sup-tour-1.jpg";
import heroSupTour2 from "../assets/images/activity/heroes/sup-tour-2.jpg";
import heroSupTour3 from "../assets/images/activity/heroes/sup-tour-3.jpg";
import heroSupRental1 from "../assets/images/activity/heroes/sup-rental-1.jpg";
import heroSupRental2 from "../assets/images/activity/heroes/sup-rental-2.jpg";
import heroSupRental3 from "../assets/images/activity/heroes/sup-rental-3.jpg";
import heroPedalBoards1 from "../assets/images/activity/heroes/pedal-boards-1.jpg";
import heroPedalBoards2 from "../assets/images/activity/heroes/pedal-boards-2.jpg";
import heroPedalBoards3 from "../assets/images/activity/heroes/pedal-boards-3.jpg";
import heroKayak1 from "../assets/images/activity/heroes/kayak-1.jpg";
import heroKayak2 from "../assets/images/activity/heroes/kayak-2.jpg";
import heroJukaiTour1 from "../assets/images/activity/heroes/jukai-tour-1.jpg";
import heroJukaiTour2 from "../assets/images/activity/heroes/jukai-tour-2.jpg";
import heroJukaiTour3 from "../assets/images/activity/heroes/jukai-tour-3.jpg";
import heroJukaiMorning1 from "../assets/images/activity/heroes/jukai-morning-1.jpg";
import heroJukaiMorning2 from "../assets/images/activity/heroes/jukai-morning-2.jpg";
import heroJukaiMorning3 from "../assets/images/activity/heroes/jukai-morning-3.jpg";
import heroSenoumiSaiko1 from "../assets/images/activity/heroes/senoumi-saiko-1.jpg";
import heroSenoumiSaiko2 from "../assets/images/activity/heroes/senoumi-saiko-2.jpg";
import heroSenoumiMotosu1 from "../assets/images/activity/heroes/senoumi-motosu-1.jpg";
import heroSenoumiMotosu2 from "../assets/images/activity/heroes/senoumi-motosu-2.jpg";
import heroSenoumiMotosu3 from "../assets/images/activity/heroes/senoumi-motosu-3.jpg";
import heroSenoumiShoji1 from "../assets/images/activity/heroes/senoumi-shoji-1.jpg";
import heroSenoumiShoji2 from "../assets/images/activity/heroes/senoumi-shoji-2.jpg";
import heroSenoumiShoji3 from "../assets/images/activity/heroes/senoumi-shoji-3.jpg";
import heroPrivateSauna1 from "../assets/images/activity/heroes/private-sauna-1.jpg";
import heroPrivateSauna2 from "../assets/images/activity/heroes/private-sauna-2.jpg";
import heroPrivateSauna3 from "../assets/images/activity/heroes/private-sauna-3.jpg";

/**
 * 絞り込み検索の項目と選択肢。
 * Figmaに選択肢の定義がないため暫定。実データ確定時はここだけ差し替えれば
 * プルダウンと絞り込みの両方に反映される。
 */
export const filterGroups = [
  { key: "age", label: "対象年齢", options: ["制限なし", "小学生以上", "中学生以上"] },
  { key: "season", label: "実施時期", options: ["春", "夏", "秋", "冬"] },
  { key: "people", label: "人数", options: ["1名〜", "2名〜", "4名〜"] },
  { key: "price", label: "料金", options: ["〜3,000円", "3,000〜5,000円", "5,000円〜"] },
  { key: "duration", label: "所要時間", options: ["〜30分", "30〜60分", "60分〜"] },
  { key: "weather", label: "天気", options: ["晴れ", "雨天可"] },
  { key: "reservation", label: "ご予約", options: ["要予約", "予約不要"] },
] as const;

export type FilterKey = (typeof filterGroups)[number]["key"];

export type Activity = {
  /** URL（/activity/{slug}/） */
  slug: string;
  /** 一覧カードの見出し。ppx(530)・font ppx(40) なので12字が上限 */
  title: string;
  /**
   * 詳細ページの英字タイトル。nowrap なのでSPは折り返さず溢れる。
   * 実測でSPに収まるのは13字まで（14字の SENOUMI MOTOSU は左右が切れた）。
   * 超える場合は `<br class="page-header__br-sp">` で割る。
   * br を含むと [slug].astro が PageHeader に tallSp を渡してヘッダーを縦に伸ばす。
   */
  titleEn: string;
  /** 詳細ページの和文タイトル */
  titleJa: string;
  /** 詳細ページのリード文。nowrap。SPは <br class="page-header__br-sp"> で割る */
  lead: string;
  photo: ImageMetadata;
  /** カードの写真上バッジ */
  durationLabel: string;
  /** カードの料金表記。幅 ppx(180) の nowrap で7〜8字が上限 */
  priceLabel: string;
  /** カードの角丸タグ（4文字以上は2行で表示される） */
  tags: string[];
  /** カードの説明文。1行18字 */
  description: string;
  /** 絞り込み用の属性。該当する選択肢を全て入れる。出典に記載がなければ空配列 */
  filters: Record<FilterKey, string[]>;

  // --- 詳細ページ ---
  /** メインビジュアルの写真。自動でディゾルブ切り替えする */
  heroPhotos: ImageMetadata[];
  /** メインビジュアルの見出し（改行は <br> で明示）。SPは1行12字 */
  heroHeading: string;
  /** メインビジュアルの本文。1要素＝1段落。PC23字 / SP20字 */
  heroBody: string[];
  /** 概要テーブル。lines は1要素＝1段落 */
  overview: { label: string; lines: string[] }[];
  /** 料金テーブル。amount がある行は金額を大きく強調表示する */
  price: {
    label: string;
    amount?: string;
    amountNote?: string;
    lines: string[];
  }[];
  /** ご利用の流れ */
  steps: { title: string; text: string }[];
  /** 注意事項。1要素＝1項目、配列の中身は段落 */
  notes: string[][];
  /**
   * WEB予約の遷移先。省略するとノーム共通のなっぷ予約ページになる。
   * Hobie（HOBIE JAPAN 主催）とカヤック（5LAKES & MT 主催）は
   * 主催者が別で予約先も別なので、ここで上書きする。
   */
  reservation?: {
    /** WEB予約ボタンのリンク先 */
    url: string;
    /** ボタンの文言。省略すると「WEB予約はこちら」 */
    label?: string;
    /** ボタン下の補足。省略すると「（ 受付時間 24時間 ）」 */
    note?: string;
    /** 主催が外部の場合の注記。予約カードの下に出す */
    operatorNote?: string;
  };
};

type ActivityDetail = Pick<
  Activity,
  "heroBody" | "overview" | "price" | "steps" | "notes"
>;

// ---------------------------------------------------------------------------
// 詳細ページの実データ待ち（ダミー）
//
// 開催日・料金・流れ・注意事項は他のデータファイル（facilities.ts /
// facilityDetails.ts / faq.ts）と同じ表記で「未確定」とわかる状態にしてある。
// ---------------------------------------------------------------------------

const dummyLine = "ここに説明文が入ります。ここに説明文が入ります。";

const dummyDetail: ActivityDetail = {
  heroBody: [dummyLine, dummyLine, dummyLine],
  overview: [
    { label: "開催日", lines: ["◯◯月〜◯◯月", "※事前予約制になります。"] },
    { label: "受付場所", lines: ["◯◯◯◯◯◯◯◯◯◯◯◯"] },
    { label: "受付時間", lines: ["◯◯時◯◯分集合　◯◯時開始"] },
    { label: "対象年齢", lines: ["◯◯◯◯以上", "", "※◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"] },
    { label: "お子様の利用", lines: ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"] },
  ],
  price: [
    {
      label: "ツアー代金",
      amount: "◯,◯◯◯円（税込）/人",
      amountNote: "　◯名様より",
      lines: ["※◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    },
    { label: "取消料", lines: ["当日　◯◯%　前日　◯◯%"] },
  ],
  steps: [
    { title: "受付", text: dummyLine },
    { title: "誓約書にサイン", text: dummyLine },
    { title: "道具のお渡し", text: dummyLine },
    { title: "レクチャー", text: dummyLine },
    { title: "開始", text: dummyLine },
    { title: "終了", text: dummyLine },
  ],
  notes: [
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
    ["◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯◯"],
  ],
};

// ---------------------------------------------------------------------------
// Hobie ペダルボード / カヤックレンタル & ツアー
//
// この2件は主催が外部（HOBIE JAPAN / 5LAKES & MT）で、現行サイトに
// 「ご利用の流れ」の記載がない。流れは現場ヒアリング待ちのためダミーのまま残す。
// docs/現場ヒアリングシート.md に起票済み。
// ---------------------------------------------------------------------------

const dummySteps = dummyDetail.steps;

// ---------------------------------------------------------------------------
// SUP早朝プライベートツアー
// https://www.hamayouresort.com/suptour-morning/
// ---------------------------------------------------------------------------

const supTourDetail: ActivityDetail = {
  heroBody: [
    "1日のうちで最もコンディションがよくなる確率が高いのが早朝と夕方です。",
    "1組限定のプライベートツアーで朝ならではの見どころをご案内いたします。",
    "約1時間半のツアーです。もちろんレクチャー付きなので初めてでも大丈夫です。",
  ],
  overview: [
    { label: "開催日", lines: ["4月末〜10月", "※事前予約制になります。"] },
    {
      label: "受付場所",
      lines: [
        '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">アクティビティ管理棟（赤いトレーラーハウス）',
      ],
    },
    { label: "受付時間", lines: ["6時45分集合　7時開始"] },
    // 原典は「対象年齢」と「お子様の利用」の2欄に同じ3行が重複して載っている。
    // 事実は落とさず、重複分を「お子様の利用」側にまとめた
    { label: "対象年齢", lines: ["中学生以上"] },
    {
      label: "お子様の利用",
      lines: [
        "小学生のお子様は大人と同乗でご参加いただけます。",
        "",
        "※お子様の年齢に合わせてシングル艇又はタンデム艇でご案内します。",
        "※小学生のお子様も人数のカウントに含まれます。",
        "※小学生未満のお子様はご参加いただけません。",
      ],
    },
  ],
  price: [
    {
      label: "ツアー代金",
      amount: "5,500円（税込）/人",
      amountNote: "　2名様より",
      // 施設使用料（550円/人）の記載は早朝ツアーのページにはない。レンタルのみ
      lines: ["例：大人2名、小学生1名　16,500円（税込）"],
    },
    {
      label: "取消料",
      lines: [
        "当日　100％　前日　50％",
        "※天候により実施が難しい場合には取消料はいただきません。",
      ],
    },
  ],
  steps: [
    {
      title: "受付",
      text: "西湖キャンプビレッジ・ノーム内のアクティビティ管理棟（赤いトレーラーハウス）にて受付を行います。",
    },
    { title: "誓約書にサイン", text: "誓約書の内容をご確認いただきサインをいただきます。" },
    {
      title: "道具のお渡し",
      text: "管理棟にてボード、ライフジャケット、パドル等をお渡しいたします。",
    },
    { title: "レクチャー", text: "湖畔へ移動して漕ぎ方や注意点などの説明をいたします。" },
    {
      title: "ツアー開始",
      text: "安全に注意してツアーをお楽しみください。その日のコンディションに合わせて見どころを周ります。",
    },
    {
      title: "終了",
      text: "ツアーが終わりましたら管理棟までSUPを戻していただき終了となります。",
    },
  ],
  notes: [
    ["基本はシングル艇でのご案内となります。"],
    ["中学生以上（大人同伴）で1人乗りでご参加可能です。"],
    ["ご希望に合わせてタンデム艇（2～3人乗り）でのご案内も可能です。"],
    [
      "小学生のお子様は大人の方と同乗でご参加可能です。その場合、お子様の年齢など条件によりタンデム艇（2～3人乗り）に変更になる場合がございます。",
    ],
    ["小学生のお子様も申込人数に含まれます。"],
    ["破損や紛失等の場合は所定の金額をお支払いいただく場合がございます。"],
    ["安全のため、必ずガイドの指示にしたがってください。"],
    ["濡れても大丈夫な服装でお越しください。"],
    ["必ずライフジャケットを着用ください。"],
    ["天候によっては中止させていただく場合がございます。"],
    ["ペットの乗船はお断りしております。"],
  ],
};

// ---------------------------------------------------------------------------
// SUPレンタル（シングル、タンデム、メガ）
// https://www.hamayouresort.com/sup_rental/
// ---------------------------------------------------------------------------

const supRentalDetail: ActivityDetail = {
  heroBody: [
    "湖は海と違い波もないので比較的バランスが取りやすく体験するには最適です。",
    "シングル、タンデム（2〜3名乗り）、メガ（4〜8名乗り）の3パターンをご用意。",
    "レクチャー付きなので初心者の方でも安心です。湖上からの景色は格別ですよ。",
  ],
  overview: [
    { label: "開催日", lines: ["4月下旬〜10月中旬"] },
    {
      label: "受付場所",
      lines: [
        '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">赤いトレーラーハウス',
      ],
    },
    {
      label: "受付時間",
      lines: [
        "2時間レンタル",
        "",
        "07：00〜　※7〜9月限定　完全予約制",
        "10：00〜",
        "12：00〜　※当日受付のみ",
        "14：00〜",
        "※15分前までに受付をお願いいたします。",
      ],
    },
    { label: "対象年齢", lines: ["中学生以上"] },
    {
      label: "お子様の利用",
      lines: [
        "5才〜小学生は大人と一緒にボードに乗ることが可能です。",
        "",
        "※別途ライフベストのレンタルが必要です。",
        "※総重量を超えないこと（シングル110kg、タンデム200kg）",
      ],
    },
    {
      label: "ペットの同乗",
      lines: [
        "同乗可能ですがペット用のライフジャケットご持参が必須です。",
        "",
        "※ペットは保険対象外となります。",
      ],
    },
  ],
  price: [
    {
      label: "レンタル費",
      amount: "4,400円（税込）/2時間",
      amountNote: "　シングル艇",
      lines: [
        "タンデム艇　6,600円（税込）/2時間",
        "メガ艇　12,100円（税込）/2時間",
        "※傷害保険を含みます。",
        "ライフベスト追加レンタル：550円/着",
        "パドル追加レンタル：1,100円/本",
        "※「西湖キャンプビレッジＧＮＯＭＥ」をご利用ではないお客様は別途施設使用料（550円/人）がかかります。",
      ],
    },
    {
      label: "レンタルに含まれるもの",
      lines: [
        "シングル：ボード、ライフベスト1着、パドル1本",
        "タンデム：ボード、ライフベスト2着、パドル2本",
        "メガ：ボード、ライフベスト4着、パドル4本",
        "※緊急時のために携帯電話をお持ちください。",
        "※ウェットスーツの貸出はございません。",
      ],
    },
    {
      // 原典は「当日　100%　前日　50％」と半角/全角が混在。サイト内で表記を揃えて全角に統一
      label: "取消料",
      lines: [
        "当日　100％　前日　50％",
        "※天候により実施が難しい場合には取消料はいただきません。",
      ],
    },
  ],
  steps: [
    {
      title: "受付",
      text: "西湖キャンプビレッジ・ノーム内の赤いトレーラーハウスにて受付を行います。",
    },
    {
      title: "誓約書にサイン",
      text: "誓約書にサインをいただき、レンタル代をお支払いいただきます。",
    },
    {
      title: "道具のお渡し",
      text: "ボード、ライフジャケット、パドル等をお渡しいたします。",
    },
    { title: "レクチャー", text: "湖畔へ移動して漕ぎ方や注意点などの説明をいたします。" },
    { title: "湖上散策", text: "溶岩帯や根場浜付近など、西湖の見どころを自由に巡れます。" },
    { title: "返却", text: "レンタル品を管理棟まで返却していただき終了となります。" },
  ],
  notes: [
    [
      "1艇のレンタルで交代で乗っていただくことは可能です。その場合には必ず全員の名簿をご提出いただき、全員がレクチャーを受けてください。",
    ],
    ["破損や紛失等の場合は所定の金額をお支払いいただきます。"],
    ["傷害、事故、第三者とのトラブル等に関しまして弊社では一切の責任を負いかねます。"],
    ["濡れても大丈夫な服装でお越しください。"],
    ["必ずライフジャケットを着用ください。"],
  ],
};

// ---------------------------------------------------------------------------
// Hobie ペダルボード（HOBIE レンタル＆ツアー）
// https://www.hamayouresort.com/pedal-boards/
// ---------------------------------------------------------------------------

const pedalBoardsDetail: ActivityDetail = {
  heroBody: [
    "HOBIE社独自のMirage Driveという足漕ぎシステムを搭載したSUPとカヤックです。",
    "両手が空くので、写真を撮ったりのんびり景色を眺めたりしながら進めます。",
    "安定性が高いので、穏やかな湖上ならお子様から大人まで簡単に楽しめます。",
  ],
  overview: [
    {
      label: "営業日",
      lines: [
        "4月　土日祝",
        "5〜7月　金土日祝",
        "8月　毎日",
        "9〜11月　金土日祝",
      ],
    },
    { label: "営業時間", lines: ["8：00〜17：30", "※金曜は12：00〜17：30"] },
    {
      label: "受付場所",
      lines: [
        '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">HOBIE JAPAN 受付',
      ],
    },
    {
      label: "ペットの同乗",
      lines: [
        "Fiesta・Compass DUO・Passport/Compass・Adventure Island で同乗可能です。",
        "",
        "※追加料金1,100円（税込）がかかります。",
      ],
    },
    {
      label: "主催",
      lines: ["HOBIE JAPAN（アミューズ）　西湖キャンプビレッジＧＮＯＭＥ内"],
    },
  ],
  price: [
    {
      label: "レンタル費",
      amount: "6,600円（税込）/60分",
      amountNote: "　1艇・1名乗り",
      lines: [
        "Eclipse（1名乗り・足漕ぎSUP）　6,600円（税込）",
        "Passport/Compass（1名乗り）　6,600円（税込）",
        "Compass DUO（2名乗り）　8,800円（税込）",
        "Fiesta（4名乗り）　13,200円（税込）",
        "※いずれも1艇60分の料金です。",
        "※MIRAGE ECLIPSEを初めてレンタルされる方はツアープランをご利用ください。",
      ],
    },
    {
      label: "ツアー費",
      amount: "16,500円（税込）/60分",
      amountNote: "　Adventure Island（3名乗り）",
      lines: [
        "ガイド付きの西湖上散歩ツアーで、おすすめの湖上スポットをご案内します。",
        "風の力だけで水面をすべるセーリングを体験できます。",
      ],
    },
    {
      label: "オプション",
      lines: [
        "ペット・110cm以下のお子様の同乗　1,100円（税込）",
        "ウェットスーツ貸出　1,100円（税込）※Eclipseご利用時",
      ],
    },
    {
      label: "施設使用料",
      lines: [
        "光風閣くわるび・キャンプビレッジＧＮＯＭＥにご宿泊以外のお客様は550円がかかります。",
      ],
    },
  ],
  // 現行サイトに流れの記載がないため未確定。【ヒアリング】
  steps: dummySteps,
  notes: [
    ["主催はHOBIE JAPAN（アミューズ）です。ご予約・お問い合わせは主催者へお願いいたします。"],
    ["MIRAGE ECLIPSEを初めてレンタルされる方はツアープランをご利用ください。"],
    ["ペット・110cm以下のお子様の同乗には追加料金1,100円（税込）がかかります。"],
    ["Adventure Islandはガイド付きのツアーメニューです。"],
    [
      "光風閣くわるび・キャンプビレッジＧＮＯＭＥにご宿泊以外のお客様は施設使用料550円がかかります。",
    ],
  ],
};

// ---------------------------------------------------------------------------
// カヤックレンタル & ツアー
// https://www.hamayouresort.com/kayak-rental/
// ---------------------------------------------------------------------------

const kayakDetail: ActivityDetail = {
  heroBody: [
    "1日から3日間まで、好きなだけ湖に浮かんでいられるカヤックレンタルです。",
    "レンタルはすべてタンデム艇。パドル2本とライフベスト2枚が付属します。",
    "富士五湖を知り尽くしたガイドがご案内する西湖カヤックツアーもあります。",
  ],
  overview: [
    {
      label: "受付場所",
      lines: [
        '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">アクティビティ管理棟',
      ],
    },
    {
      label: "受付時間",
      lines: ["それぞれ貸し出し時間の15分前までに受付をお済ませください。"],
    },
    {
      label: "レンタルの内容",
      lines: [
        "レンタルはすべてタンデム艇です。",
        "",
        "※カヤック1艇につきパドル2本、ライフベストは最大で大人用2枚が付属します。",
        "※時間は厳守でお願いします。",
      ],
    },
    {
      label: "服装",
      lines: [
        "膝から下、場合によっては腰の部分まで濡れることもありますので、それなりの服装でお越しください。",
      ],
    },
    {
      label: "ツアーの主催",
      lines: ["「5LAKES & MT」（木村東吉とそのスタッフ）"],
    },
  ],
  price: [
    {
      label: "レンタル費",
      amount: "5,500円/艇",
      amountNote: "　1日（貸出10:00〜）",
      lines: [
        "オーバーナイト　5,500円/艇　貸出16:00〜翌日9:30",
        "24h　8,800円/艇　貸出10:00〜翌日9:30 もしくは16:00〜翌日15:30",
        "ワンモアナイト　11,000円/艇　貸出16:00〜翌々日9:30",
        "（翌日の1日料金が無料で付いてくるお得なサービスです）",
        "ロング・ウィークエンド　19,800円/艇　最大72時間（チェックイン〜チェックアウト）",
        "【期間限定】イージーサンデー　3,300円/艇　日曜日の午前中限定 10:00〜12:00",
        "※実施期間はお申し込みいただいた時点で返信にてご案内します。",
      ],
    },
    {
      label: "ツアー費",
      amount: "2,750円/名",
      amountNote: "　テイスティング・パドル＠西湖",
      lines: [
        "早朝カヤックツアー＠西湖　4,620円/名　5時45分集合",
        "サンセットカヤックツアー＠西湖　3,630円/名　15時45分集合",
        "テイスティング・パドル＠西湖　2,750円/名　9時45分集合",
      ],
    },
    {
      label: "施設使用料",
      lines: [
        "西湖キャンプビレッジＧＮＯＭＥにご宿泊ではないお客様は550円がかかります。",
      ],
    },
  ],
  // 現行サイトに流れの記載がないため未確定。【ヒアリング】
  steps: dummySteps,
  notes: [
    ["レンタルはすべてタンデム艇です。カヤック1艇につきパドル2本、ライフベスト最大2枚が付属します。"],
    ["貸し出し時間の15分前までに受付をお済ませください。時間は厳守でお願いします。"],
    ["膝から下、場合によっては腰の部分まで濡れることもありますので、それなりの服装でお越しください。"],
    ["ツアーは「5LAKES & MT」の主催です。ご予約・お問い合わせは主催者へお願いいたします。"],
    ["西湖キャンプビレッジＧＮＯＭＥにご宿泊ではないお客様は施設使用料550円がかかります。"],
  ],
};

// ---------------------------------------------------------------------------
// 青木ヶ原樹海【絶景とパワースポット】プライベートツアー
// https://www.hamayouresort.com/juki-tour02/
// ---------------------------------------------------------------------------

const jukaiTourDetail: ActivityDetail = {
  heroBody: [
    "樹海は富士山の噴火で流れてきた溶岩の上にできた、水と栄養が少ない森です。",
    "樹海の中を歩き、樹海の地下をのぞき、山に登って上から樹海を見下ろします。",
    "広大な樹海をさまざまな角度から満喫する、1組限定の周遊ツアーです。",
  ],
  overview: [
    { label: "開催日", lines: ["通年", "※事前予約制になります。"] },
    {
      label: "受付場所",
      lines: [
        '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">アクティビティ管理棟（赤いトレーラーハウス）',
      ],
    },
    {
      label: "受付時間",
      lines: ["午前の部　9時15分集合　9時30分開始", "午後の部　14時15分集合　14時30分開始"],
    },
    { label: "所要時間", lines: ["約2時間半"] },
    {
      label: "対象年齢",
      lines: [
        "3才以上",
        "",
        "※お子様だけでのご参加はできません。",
        "※小学生未満のお子様は人数のカウントに含まれません。",
      ],
    },
  ],
  price: [
    {
      label: "ツアー代金",
      amount: "13,000円（税込）/組",
      amountNote: "　4名様迄",
      lines: ["追加1名に付き　2,500円"],
    },
    {
      label: "取消料",
      lines: ["当日　100％　前日　50％", "※天候により実施が難しい場合には取消料はいただきません。"],
    },
  ],
  steps: [
    {
      title: "受付",
      text: "西湖キャンプビレッジ・ノーム内のアクティビティ管理棟（赤いトレーラーハウス）にて受付を行います。",
    },
    { title: "誓約書にサイン", text: "誓約書の内容をご確認いただきサインをいただきます。" },
    { title: "樹海へ移動", text: "送迎車にて樹海の入口まで移動します。" },
    {
      title: "樹海を歩く",
      text: "樹海の中を歩き、その後はパワースポットの洞窟や絶景ポイントなど各スポットを巡ります。",
    },
    {
      title: "終了",
      text: "送迎車にて西湖キャンプビレッジ・ノームまで戻って終了となります。",
    },
  ],
  notes: [
    ["樹海の中は平坦な道が多いですが、下は溶岩で木の根などがでています。"],
    ["絶景スポットへは10分ほどの上りがあります。"],
    ["動きやすい服装、歩きやすい靴でお越しください。"],
    ["3才以上からご参加いただけます。"],
    ["小学生以上のお子様から人数に含まれます。"],
    ["安全のため、必ずガイドの指示にしたがってください。"],
    ["天候によっては中止させていただく場合がございます。"],
    ["ご予約の受付は30日前からとなります。"],
  ],
};

// ---------------------------------------------------------------------------
// 青木ヶ原樹海早朝プライベートツアー
// https://www.hamayouresort.com/jukai_morning/
//
// 料金は現行サイトに「10,000円（税込）/組」「2026年5月7日以降　11,000円（税込）/組」と
// 併記されている。改定日を過ぎているので改定後の11,000円のみを載せている。
// ---------------------------------------------------------------------------

const jukaiMorningDetail: ActivityDetail = {
  heroBody: [
    "早朝の樹海は空気が澄んで光がとても美しく、鳥の声もよく聞こえる時間帯です。",
    "溶岩と苔、地表に張り巡らされた木の根に、植物たちの生存戦略があふれています。",
    "パワースポットや富士山の撮影ポイントにも立ち寄る、1組限定のツアーです。",
  ],
  overview: [
    { label: "開催日", lines: ["通年", "※事前予約制になります。"] },
    {
      label: "受付場所",
      lines: [
        '西湖キャンプビレッジ・ノーム内　<br class="detail-overview__br-sp">アクティビティ管理棟（赤いトレーラーハウス）',
      ],
    },
    { label: "受付時間", lines: ["6時45分集合　7時開始"] },
    {
      label: "対象年齢",
      lines: [
        "3才以上",
        "",
        "※お子様だけでのご参加はできません。",
        "※小学生未満のお子様は人数のカウントに含まれません。",
      ],
    },
  ],
  price: [
    {
      label: "ツアー代金",
      amount: "11,000円（税込）/組",
      amountNote: "　4名様迄",
      lines: ["追加1名に付き　2,000円"],
    },
    {
      label: "取消料",
      lines: ["当日　100％　前日　50％", "※天候により実施が難しい場合には取消料はいただきません。"],
    },
  ],
  steps: [
    {
      title: "受付",
      text: "西湖キャンプビレッジ・ノーム内のアクティビティ管理棟（赤いトレーラーハウス）にて受付を行います。",
    },
    { title: "誓約書にサイン", text: "誓約書の内容をご確認いただきサインをいただきます。" },
    { title: "樹海へ移動", text: "送迎車にて樹海の入口まで移動します。" },
    { title: "樹海を歩く", text: "樹海の中を歩き、各スポットを巡ります。" },
    {
      title: "終了",
      text: "送迎車にて西湖キャンプビレッジ・ノームまで戻って終了となります。",
    },
  ],
  notes: [
    ["登り降りはあまりありませんが、下は溶岩で木の根などがでています。"],
    ["動きやすい服装、歩きやすい靴でお越しください。"],
    ["3才以上からご参加いただけます。"],
    ["小学生以上のお子様から人数に含まれます。"],
    ["安全のため、必ずガイドの指示にしたがってください。"],
    ["天候によっては中止させていただく場合がございます。"],
    ["ご予約の受付は30日前からとなります。"],
  ],
};

export const activities: Activity[] = [
  // -------------------------------------------------------------------------
  // SUP早朝プライベートツアー
  // -------------------------------------------------------------------------
  {
    slug: "sup-tour",
    title: "SUP早朝ツアー",
    titleEn: "SUP TOUR",
    titleJa: "サップ早朝ツアー",
    lead: '朝いちばんの湖を<br class="page-header__br-sp">ひとり占め',
    photo: cardSupTour,
    durationLabel: "所要時間：約90分",
    priceLabel: "¥5,500〜",
    tags: ["事前予約", "1組限定", "2名〜"],
    description:
      "1日で最も湖が穏やかになる早朝に、1組限定で漕ぎ出すプライベートツアー。レクチャー付きなので初めてでも安心です。",
    filters: {
      age: ["中学生以上"],
      season: ["春", "夏", "秋"],
      people: ["2名〜"],
      price: ["5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroSupTour1, heroSupTour2, heroSupTour3],
    heroHeading: "天気が良ければ<br>富士山が見える水上散歩",
    ...supTourDetail,
  },

  // -------------------------------------------------------------------------
  // SUPレンタル
  // -------------------------------------------------------------------------
  {
    slug: "sup-rental",
    title: "SUPレンタル",
    titleEn: "SUP RENTAL",
    titleJa: "サップレンタル",
    lead: '好きな時間だけ<br class="page-header__br-sp">湖の上を歩く',
    photo: cardSupRental,
    durationLabel: "所要時間：2時間",
    priceLabel: "¥4,400〜",
    tags: ["レンタル", "2時間", "5才〜"],
    description:
      "シングル・タンデム・メガの3種類から選べる2時間レンタル。5才から大人と一緒に乗ることができます。",
    filters: {
      age: ["中学生以上"],
      season: ["春", "夏", "秋"],
      people: ["1名〜"],
      price: ["3,000〜5,000円"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約", "予約不要"],
    },
    heroPhotos: [heroSupRental1, heroSupRental2, heroSupRental3],
    heroHeading: "3種類のボードで<br>湖上を自由に散歩",
    ...supRentalDetail,
  },

  // -------------------------------------------------------------------------
  // Pedal Boards（HOBIE レンタル＆ツアー）※流れのみ実データ待ち
  // https://www.hamayouresort.com/pedal-boards/
  // -------------------------------------------------------------------------
  {
    slug: "pedal-boards",
    title: "Hobie ペダルボード",
    titleEn: "PEDAL BOARDS",
    titleJa: "ホビー ペダルボード",
    lead: '足で漕ぐから<br class="page-header__br-sp">手はいつでも自由',
    photo: cardPedalBoards,
    durationLabel: "所要時間：60分",
    priceLabel: "¥6,600〜",
    tags: ["足漕ぎ", "ペット可", "1名〜"],
    description:
      "足で漕ぐHOBIE社のボードとカヤック。両手が空くので写真も撮れます。ペットと一緒に乗れる艇もあります。",
    filters: {
      // 対象年齢の記載はなし。「110cm以下のお子様は同乗」とあるので制限なしとした
      age: ["制限なし"],
      // 営業日が4月〜11月なので春・夏・秋
      season: ["春", "夏", "秋"],
      people: ["1名〜"],
      price: ["5,000円〜"],
      duration: ["30〜60分"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroPedalBoards1, heroPedalBoards2, heroPedalBoards3],
    heroHeading: "足で漕ぐから<br>両手が空いたまま進む",
    reservation: {
      url: "https://hobiejapan.com/product-category/booking-product/",
      label: "HOBIE JAPANで予約",
      note: "（ 主催者の予約ページへ ）",
      operatorNote:
        "このアクティビティはHOBIE JAPAN（アミューズ）の主催です。ご予約・お問い合わせは主催者へお願いいたします。",
    },
    ...pedalBoardsDetail,
  },

  // -------------------------------------------------------------------------
  // カヤックレンタル & ツアー ※流れのみ実データ待ち
  // https://www.hamayouresort.com/kayak-rental/
  // -------------------------------------------------------------------------
  {
    slug: "kayak",
    title: "カヤック",
    titleEn: "KAYAK",
    titleJa: "カヤックレンタル・ツアー",
    lead: '一日中でも<br class="page-header__br-sp">湖に浮かんでいたい',
    photo: cardKayak,
    durationLabel: "所要時間：コース別",
    priceLabel: "¥2,750〜",
    // レンタルは「すべてタンデム」と明記されている
    tags: ["レンタル", "ツアー", "タンデム"],
    description:
      "1日、24時間、3日間から選べるカヤックレンタル。ガイド付きの西湖ツアーもご用意しています。",
    filters: {
      // 対象年齢・開催時期は現行サイトに記載がないため空。【ヒアリング】
      age: [],
      season: [],
      people: ["1名〜"],
      price: ["〜3,000円", "3,000〜5,000円", "5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroKayak1, heroKayak2],
    heroHeading: "1日から3日間まで<br>好きなだけ湖の上に",
    reservation: {
      url: "https://5lakesandmt.square.site/",
      label: "5LAKES & MTで予約",
      note: "（ 主催者の予約ページへ ）",
      operatorNote:
        "レンタル・ツアーは「5LAKES & MT」の主催です。ご予約・お問い合わせは主催者へお願いいたします。",
    },
    ...kayakDetail,
  },

  // -------------------------------------------------------------------------
  // 青木ヶ原樹海【絶景とパワースポット】プライベートツアー
  // 現行サイトのURLは juki-（タイプミス）だが正しくこのツアーのページ
  // https://www.hamayouresort.com/juki-tour02/
  // -------------------------------------------------------------------------
  {
    slug: "jukai-tour",
    title: "樹海トレイル",
    titleEn: "JUKAI TOUR",
    titleJa: "青木ヶ原樹海ツアー",
    lead: '歩いて、覗いて<br class="page-header__br-sp">見下ろす樹海',
    photo: cardJukaiTour,
    durationLabel: "所要時間：約2時間半",
    priceLabel: "¥13,000〜",
    tags: ["事前予約", "1組限定", "3才〜"],
    description:
      "樹海の中を歩き、洞窟を覗き、山の上から見下ろす。1組限定で3才から参加できる周遊ツアーです。",
    filters: {
      age: ["制限なし"],
      season: ["春", "夏", "秋", "冬"],
      people: ["1名〜"],
      price: ["5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroJukaiTour1, heroJukaiTour2, heroJukaiTour3],
    heroHeading: "洞窟から絶景まで<br>樹海をあらゆる角度で",
    ...jukaiTourDetail,
  },

  // -------------------------------------------------------------------------
  // 青木ヶ原樹海早朝プライベートツアー
  // https://www.hamayouresort.com/jukai_morning/
  // -------------------------------------------------------------------------
  {
    slug: "jukai-morning",
    title: "樹海早朝ツアー",
    titleEn: "JUKAI MORNING",
    titleJa: "青木ヶ原樹海早朝ツアー",
    lead: '光が最も美しい<br class="page-header__br-sp">朝の樹海へ',
    photo: cardJukaiMorning,
    // 現行サイトに総所要時間の記載がなく「森の中を歩くのは45〜60分」のみ。【ヒアリング】
    durationLabel: "森歩き：45〜60分",
    priceLabel: "¥11,000〜",
    tags: ["事前予約", "早朝", "3才〜"],
    description:
      "空気が澄んで光が美しい早朝の樹海へ。歩くのは45〜60分ほどの平坦な道なので体力に自信がなくても大丈夫。",
    filters: {
      age: ["制限なし"],
      season: ["春", "夏", "秋", "冬"],
      people: ["1名〜"],
      price: ["5,000円〜"],
      duration: ["30〜60分"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroJukaiMorning1, heroJukaiMorning2, heroJukaiMorning3],
    heroHeading: "空気が澄んで<br>鳥の声がよく届く時間",
    ...jukaiMorningDetail,
  },

  // -------------------------------------------------------------------------
  // せのうみツアー【西湖編】 ※詳細ページは実データ待ち
  // 現行サイトのURLが jukai- 始まりだが中身は「せのうみツアー【西湖編】」。誤記ではない
  // https://www.hamayouresort.com/jukai-adventure-tour/
  // -------------------------------------------------------------------------
  {
    slug: "senoumi-saiko",
    title: "せのうみ 西湖編",
    titleEn: 'SENOUMI<br class="page-header__br-sp"> SAIKO',
    titleJa: "せのうみツアー 西湖編",
    lead: '漕いで、走って<br class="page-header__br-sp">登る樹海',
    photo: cardSenoumiSaiko,
    durationLabel: "所要時間：約5時間",
    priceLabel: "¥12,000〜",
    tags: ["事前予約", "1組限定", "2名〜"],
    description:
      "SUP、自転車、徒歩、登山とすべて人力で西湖から樹海の絶景ポイントまで巡る約5時間のツアーです。",
    filters: {
      // 対象年齢・開催時期は現行サイトが「お問合せ下さい」のため空。【ヒアリング】
      age: [],
      season: [],
      people: ["2名〜"],
      price: ["5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroSenoumiSaiko1, heroSenoumiSaiko2],
    heroHeading: "すべて人力で巡る<br>約5時間の周遊ツアー",
    ...dummyDetail,
  },

  // -------------------------------------------------------------------------
  // せのうみツアー【本栖湖編】 ※詳細ページは実データ待ち
  // https://www.hamayouresort.com/senoumi_motosu/
  // -------------------------------------------------------------------------
  {
    slug: "senoumi-motosu",
    title: "せのうみ 本栖湖編",
    titleEn: 'SENOUMI<br class="page-header__br-sp"> MOTOSU',
    titleJa: "せのうみツアー 本栖湖編",
    lead: '千円札の富士山に<br class="page-header__br-sp">会いに行く',
    photo: cardSenoumiMotosu,
    durationLabel: "所要時間：約5時間半",
    priceLabel: "¥12,000〜",
    tags: ["事前予約", "昼食付", "2名〜"],
    description:
      "本栖湖を望む中の倉峠から旧中道往還まで。最後はダッチオーブンで野戦食ほうとうを作ります。",
    filters: {
      age: [],
      season: [],
      people: ["2名〜"],
      price: ["5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroSenoumiMotosu1, heroSenoumiMotosu2, heroSenoumiMotosu3],
    heroHeading: "登って、漕いで<br>最後はほうとうを作る",
    ...dummyDetail,
  },

  // -------------------------------------------------------------------------
  // せのうみツアー【精進湖編】 ※詳細ページは実データ待ち
  // https://www.hamayouresort.com/senoumi-shoji/
  // -------------------------------------------------------------------------
  {
    slug: "senoumi-shoji",
    title: "せのうみ 精進湖編",
    titleEn: 'SENOUMI<br class="page-header__br-sp"> SHOJI',
    titleJa: "せのうみツアー 精進湖編",
    lead: '洞窟からブナ林へ<br class="page-header__br-sp">地下と地上を巡る',
    photo: cardSenoumiShoji,
    durationLabel: "所要時間：約5時間",
    priceLabel: "¥12,000〜",
    tags: ["事前予約", "1組限定", "2名〜"],
    description:
      "ヘッドライトを付けて洞窟へ。大室山のブナ林からトレイルランとダウンヒルで精進湖まで駆け抜けます。",
    filters: {
      age: [],
      season: [],
      people: ["2名〜"],
      price: ["5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroSenoumiShoji1, heroSenoumiShoji2, heroSenoumiShoji3],
    heroHeading: "溶岩の地下世界と<br>三千年のブナ林へ",
    ...dummyDetail,
  },

  // -------------------------------------------------------------------------
  // 【1組限定】プライベートサウナ ※詳細ページは実データ待ち
  // https://www.hamayouresort.com/sauna-car/
  // -------------------------------------------------------------------------
  {
    slug: "private-sauna",
    title: "プライベートサウナ",
    titleEn: "PRIVATE SAUNA",
    titleJa: "プライベートサウナ",
    lead: '西湖の水際まで<br class="page-header__br-sp">サウナごと運ぶ',
    photo: cardPrivateSauna,
    durationLabel: "所要時間：3時間",
    priceLabel: "¥9,900〜",
    tags: ["事前予約", "1組限定", "3時間"],
    description:
      "サウナカーを湖畔まで運んで1組貸切。西湖へのダイブ、檜の桶の水風呂、源泉から選べます。",
    filters: {
      age: [],
      season: ["春", "夏", "秋", "冬"],
      people: ["2名〜"],
      price: ["5,000円〜"],
      duration: ["60分〜"],
      weather: ["晴れ"],
      reservation: ["要予約"],
    },
    heroPhotos: [heroPrivateSauna1, heroPrivateSauna2, heroPrivateSauna3],
    heroHeading: "薪と湖と外気浴を<br>1組だけで独り占め",
    ...dummyDetail,
  },
];

export const getActivity = (slug: string) =>
  activities.find((activity) => activity.slug === slug);
