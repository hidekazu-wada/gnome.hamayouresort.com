# GNOME サイト デザインシステム（実装の実測）

このリポジトリ（西湖キャンプビレッジ・ノーム）の実装に**実在する**トークンとコンポーネントの一覧。
`/rain/`（雨の日応援セットLP）を追加する際の判断材料として作成。

**この文書のルール**

- 推測で埋めていない。コードに定義が無いものは **`未定義`** と明記している
- 各項目に「どのファイルの何行目から採ったか」を添えている
- 調査時点: 2026-08-07 / コミット `c232b44`

**先に要点**

このサイトには**デザイントークンの仕組みがほぼ存在しない**。色・余白・角丸・影はすべて
各コンポーネントの `<style>` に**生の値で直書き**されている。共通化されているのは
**ビューポート変換関数（`ppx`/`tpx`/`spx`）とブレークポイントだけ**。
新規ページを作るときは「変数を参照する」のではなく「**既存コンポーネントから値をコピーする**」ことになる。

---

## 1. カラートークン

### 1-1. 変数として定義されている色

**なし（`未定義`）。**

- `src/styles/_variables.scss`（全12行）に定義されているのは**ビューポート基準値・ブレークポイント・フォント名のみ**で、色の変数は1つも無い（`_variables.scss:1-12`）
- CSS カスタムプロパティによる色定義もグローバルには無い。`--accent` 等はコンポーネント単位のローカル変数として存在するだけ（下記 1-3）
- Tailwind・テーマファイルは**未使用**

### 1-2. ハードコードで繰り返し使われている色（＝事実上のパレット）

`src/**/*.{astro,scss,ts}` を全文検索した出現回数。**すべて変数化されていない。**

| 色 | 出現数 | 役割（実際の使われ方） | 代表的な出典 |
|---|---|---|---|
| `#000` | 155 | 本文・見出しの既定文字色 | `pageHeader/PageHeader.astro:214` ほか |
| `#fff` | 125 | 白背景・白文字・白フチ | `feeModal/FeeModal.astro:89` ほか |
| `#138185` | 95 | **ティール。サイトの主アクセント**。リンク文字、FAQ/フッターのピル、モーダル内の項目名、カード選択時の枠、`:focus-visible` の輪郭 | `AreaCard.astro:183-194`（選択時の枠）/ `FeeModal.astro:108`（項目名）/ `AreaCard.astro:196`（focus） |
| `#7c6351` | 90 | **茶色**。詳細ページ系（アクティビティ詳細・ホテルセットプラン・過ごし方・泊まる詳細）の見出し・罫線・表 | `activity-detail/7-reservation.astro` / `hotel-set-plan/3-price.astro` |
| `#fffdf7` | 52 | **カード・パネルの地色（クリーム）** | `AreaCard.astro:162` / `menu/Menu.astro:250` / `FeeModal.astro:92` |
| `#d6b156` | 48 | **金色**。ホバー時の塗り、カレント表示、強調文字 | `menu/Menu.astro:293`（カレント）/ `PageHeader.astro:20`（`__lead-em` の用法コメント） |
| `#bee0e1` | 45 | **淡い水色。周辺情報セクション・メニュー・フッターの背景** | `menu/Menu.astro:117` / `area/1-map.astro` / `footer/Footer.astro:147` |
| `#507425` | 32 | **濃い緑**。メニューのリンク文字、価格の数字、タグの文字、ホバー時の塗り | `StayCard.astro:336`（タグ文字）/ `StayCard.astro:368`（価格）/ `Menu.astro:251` |
| `#8aad61` | 25 | **黄緑**。区画IDの丸、利用料ボタンの塗り | `StayCard.astro:246`（区画ID）/ `private-area/3-details.astro:527` |
| `#cfcfcf` | 9 | グレーの罫線・非活性 | 各所 |
| `#c3925e` | 6 | **キャラメル色**。タイムスケジュールの時刻、料金表の見出し | `howto/2-schedule.astro:190` |
| `#dde9cd` | 5 | **淡いグリーンのタグの地色** | `StayCard.astro:333` |
| `#c0d4a9` | 5 | 貸切エリアセクションの背景 | `private-area/3-details.astro:175` |
| `#7f7f7f` | 5 | モーダルの罫線 | `private-area/3-details.astro`（エリアマップ） |
| `#c4c4c4` | 4 | **写真未支給のグレーボックス** | `facility/detail/2-items.astro:203` |
| `#5b5347` | 4 | 補足テキスト | `area/1-map.astro` |
| `#ef6f6f` | 3 | 赤（強調文字） | `howto/4-activity.astro:143` |
| `#e2dbc1` | 3 | タイムスケジュールの背景（ベージュ） | `howto/2-schedule.astro:62` |
| `#f0f0f0` | 2 | `body` の背景 | `reset.scss:54` / `main.scss:28` |
| `#fbf2dc` | 1 | 共有施設詳細セクションの背景 | `facility/detail/2-items.astro:84` |

そのほか 1〜2回だけ登場する色が約20種（`#fce8e6` `#a34a4a` `#0e6467` `#a9a3d5` など）。
多くは `src/data/areaPois.ts` `src/data/seasons.ts` の**データ側に持たせたカテゴリ色・季節色**。

### 1-3. コンポーネント内のローカル CSS 変数

色をコンポーネント外から差し替える仕組みは、以下の3つだけ存在する。

| 変数 | 定義 | 用途 |
|---|---|---|
| `--accent` | `activityCard/ActivityCard.astro:75`（既定 `#138185`）、`:88`（`variant="green"` で `#507425`） | アクティビティカードの配色。`accent` prop で任意色も渡せる（`ActivityCard.astro:29`） |
| `--accent` / `--bg` / `--badge-bg` / `--texture-opacity` | `season/2-main.astro:23-27`、`season/3-point.astro:16`、`season/4-activity.astro:23` | 四季ページの季節ごとの色。値は `src/data/seasons.ts` |
| `--area-paper` | `area/1-map.astro:28` | 紙テクスチャ画像のURLをCSSへ渡す（色ではない） |

---

## 2. タイポグラフィ

### 2-1. font-family の実体

| 用途 | 指定 | 出典 |
|---|---|---|
| **サイト全体（日本語・欧文とも）** | `"Noto Sans JP", sans-serif` | `reset.scss:60`（body）。コンポーネント内での明示指定が **239 箇所** |
| body の初期指定（ミックスイン経由） | `Zen Kaku Gothic New` | `main.scss:27` が `@include zen-kaku-gothic-new-regular`（`_mixins.scss`）。**ただしWebフォントを読み込んでいないため実際には効かない** |
| 変数として定義だけされている | `$font-didot: "Didot", serif;` / `$font-noto-serif-jp: "Noto Serif JP", serif;` | `_variables.scss:11-12`。**サイト内で参照している箇所は0件** |

**Webフォントの読み込み元**（`layout/BaseLayout.astro:76-81`）

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;700&display=swap" rel="stylesheet" />
```

- **読み込んでいるファミリーは Noto Sans JP のみ。ウェイトは 400 と 700 の2つだけ**
- `reset.scss:61` は `font-weight: 500` を指定しているが、**500 は読み込んでいないので実際には 400 が使われる**
- 欧文専用フォントは**未使用**（英字大見出しも Noto Sans JP の 700）

### 2-2. 見出しのサイズスケール

**`clamp()` は全ファイルで 0 件。** サイズはすべて `ppx()` / `spx()` によるビューポート比（vw）で、
断面ごとに個別指定されている。`h1`〜`h4` に対する共通スタイルは**未定義**（見出しタグの使用実績は
`h1` 5件・`h2` 32件・`h3` 2件、`h4` は 0件）。

代表的な見出しの実測値（`px` はそれぞれの基準ビューポートでの設計値）:

| 用途 | SP（基準720） | TB | PC（基準2560） | 出典 |
|---|---|---|---|---|
| 下層ページの英字大見出し（`PAGE HEADER`） | `spx(79)` | PC値と同じ | `ppx(105)` | `PageHeader.astro:235-245` |
| 下層ページの和文小見出し | `spx(26)` | PC値と同じ | `ppx(32)` | `PageHeader.astro:247-257` |
| トップの英字大見出し | `spx(79)` | `ppx(105 * 1.2)` | `ppx(105)` | `top/3-activity.astro:275-292` |
| トップの和文小見出し | `spx(26)` | `ppx(32 * 1.2)` | `ppx(32)` | `top/3-activity.astro:294-305` |
| セクション見出し（`"〜"でできること`） | `spx(46)` | — | `ppx(60)` | `facility/detail/2-items.astro:106-120` |
| カードの見出し | `spx(27)` | — | `ppx(35)` | `facility/detail/2-items.astro:206-220` |

### 2-3. letter-spacing / line-height

- **共通の定義は無い。** すべてコンポーネントごとの直書き
- `letter-spacing` は **`em` ではなく Figma の px 値を `ppx()`/`spx()` で指定する**（プロジェクト共通ルール）。例: `letter-spacing: ppx(5.25)`（`PageHeader.astro:239`）
- **中央寄せテキストには同量の負の `margin-right` を必ず添える**。CSSは末尾の文字にも字間を入れるため、中央寄せが `letter-spacing/2` だけ左にずれるのを打ち消す運用（`PageHeader.astro:240` `margin-right: ppx(-5.25)`）
- `line-height` は用途ごとにバラバラ。見出し `1.1`（`PageHeader.astro:236`）、和文小見出し `1.7`（`:248`）、本文 `1.6`（`AreaCard.astro`）、SP本文 `1.7〜1.8`

### 2-4. 「英字大見出し＋日本語小見出し」の型

**下層ページ用はコンポーネント化されている。トップ用はされていない。**

| | 実装 | 出典 |
|---|---|---|
| 下層ページ | **`PageHeader.astro`**（`titleEn` / `titleJa` prop）。`<h1 class="page-header__title-en">` ＋ `<p class="page-header__title-ja">` | `PageHeader.astro:69-70` |
| トップページ | **各セクションに直書き**。`activity__title-en` / `stay__title-en` … とセクションごとに別クラスで同じ形を再実装している | `top/3-activity.astro:59-60`、`top/5-stay.astro:58-59` ほか |

---

## 3. スペーシング・形状

### 3-1. 余白のスケール

**変数化されていない（`未定義`）。** `$space` `$gap` `$spacing` などの定義は `src/styles/` に存在しない。

余白は毎回 `padding: ppx(30) ppx(30) ppx(30) ppx(44)` のように **Figma の px 値を直接 `ppx()`/`spx()` に通して書く**。
共通の刻み（4の倍数など）も定めていない。

**px→vw 変換関数**（`_functions.scss:7-29`）— これが実質唯一のスペーシング機構。

| 関数 | 基準ビューポート | 使いどころ |
|---|---|---|
| `spx($n)` | 720 | SP |
| `tpx($n)` | 2048 | タブレット（**ほぼ未使用**。通例は `ppx($n * 1.2)`） |
| `ppx($n)` | 2560 | PC |

### 3-2. border-radius

用途ごとの変数は無い。出現回数の多い順（実測）:

| 値 | 回数 | 用途 |
|---|---|---|
| `999px` | 39 | **ピル型ボタン・タグ**（メニューのリンク、絞り込みピル、利用料ボタン） |
| `ppx(20)` / `spx(20)` | 21 / 16 | **カードの角丸（標準）** |
| `50%` | 17 | **円形**（区画IDの丸、円形の矢印ボタン） |
| `ppx(30)` / `spx(30)` | 9 / 11 | 大きめのカード・パネル |
| `ppx(40)` / `ppx(50)` | 8 / 8 | 地図の枠・モーダル |
| `spx(10)` / `ppx(10)` | 4 / 5 | **淡いグリーンのタグ** |
| `spx(20) spx(20) 0 0` ほか | 4 | 上だけ角丸（表のヘッダー行など） |

### 3-3. box-shadow

定義済みの変数は無い。**事実上の標準はこの1種**:

```scss
box-shadow: 0 spx(10) spx(12) rgba(0, 0, 0, 0.08);   // SP  … 16箇所
box-shadow: 0 ppx(10) ppx(12) rgba(0, 0, 0, 0.08);   // PC  … 17箇所
box-shadow: 0 ppx(10 * 1.2) ppx(12 * 1.2) rgba(0, 0, 0, 0.08);  // TB … 4箇所
```

そのほか個別のもの:

| 用途 | 値 | 出典 |
|---|---|---|
| カード選択時（周辺情報） | `0 0 0 ppx(10) #138185, 0 ppx(8) ppx(20) rgba(0,0,0,.22)` | `AreaCard.astro:183-194` |
| ヘッダーの破れ紙パネル | `filter: drop-shadow(ppx(7) ppx(7) ppx(10) rgba(0,0,0,.35))` | `header/Header.astro:149-159` |
| カードの浮き（`filter` 版） | `filter: drop-shadow(0 ppx(10) ppx(12) rgba(0,0,0,.08))` | `facility/detail/2-items.astro:178-184` |

### 3-4. ブレークポイント

```scss
$breakpoint-tablet-up: 744px;   // _variables.scss:7
$breakpoint-desktop-up: 1024px; // _variables.scss:8
```

**モバイルファースト（SP-First）。** ベース（メディアクエリ外）にSPを書き、上書きしていく。

| ミックスイン | 条件 | 出典 |
|---|---|---|
| `tablet-up` | `min-width: 744px` | `_mixins.scss:7-12` |
| `desktop-up` | `min-width: 1024px` | `_mixins.scss:14-19` |
| `sp-only` | `max-width: 743px` | `_mixins.scss:23-28` |
| `tablet-only` | `744px 〜 1023px` | `_mixins.scss:31-35`（2026-08-07 追加） |
| `hover` | `@media (hover: hover)` | `_mixins.scss:37-41` |

**タブレットの値の決め方**: 特に指定がなければ **`desktop-up` の `ppx()` 値に 1.2 を掛ける**（例 `ppx(105 * 1.2)`）。
ただし**全幅の絶対配置レイアウトのセクションは ×1.2 だと溢れるため PC 比率そのまま**という例外がある。

### 3-5. コンテナ幅

**共通のコンテナコンポーネント・変数は `未定義`。** 各セクションが自前で幅を持つ。
PC でよく使われる中身の幅は `ppx(2000)`（7箇所）・`ppx(2150)`（5箇所）・`ppx(2020)`（5箇所）・`ppx(2120)`（3箇所）で、
**2560 のうち 2000〜2150 前後（＝左右に 200〜280px 相当の余白）が事実上の標準**。

---

## 4. コンポーネント一覧

### 4-1. 共通コンポーネント（`src/assets/components/common/`）

| コンポーネント | パス | props | 使われているページ |
|---|---|---|---|
| **BaseLayout** | `common/layout/BaseLayout.astro` | `title?` `description?` `flush?` `breadcrumb?` `ogImage?` `ogType?` | 全ページ |
| **Header** | `common/header/Header.astro` | なし | BaseLayout 経由で全ページ |
| **Menu** | `common/menu/Menu.astro` | なし | BaseLayout 経由で全ページ |
| **Footer** | `common/footer/Footer.astro` | `breadcrumb?` `showTop?` | BaseLayout / Menu |
| **PageTop** | `common/pageTop/PageTop.astro` | なし | BaseLayout 経由で全ページ |
| **PageHeader** | `common/pageHeader/PageHeader.astro` | `titleEn` `titleJa` `lead?` `leadVariant?`（`default`/`info`/`date`/`large`） `tallSp?` | 下層16ページ |
| **AnchorNav** | `common/anchorNav/AnchorNav.astro` | `links: {label, href}[]` | `stay/[slug]`、`activity/[slug]` |
| **FilterBar** | `common/filter/FilterBar.astro` | `groups: {key, label, options}[]` | `stay/index`、`activity/index` |
| **StayCard** | `common/stayCard/StayCard.astro` | `stay: Stay` `compact?` | `stay/1-list`、`stay-detail/7-sites` |
| **ActivityCard** | `common/activityCard/ActivityCard.astro` | `activity: Activity` `variant?`（`teal`/`green`） `accent?` | activity一覧・activity詳細・season・howto・private-area・stay詳細（6箇所） |
| **FeeModal** | `common/feeModal/FeeModal.astro` | `id: string` `fee: {price, notes[]}` | `facility/detail/2-items`、`private-area/3-details` |

### 4-2. ページ配下だが再利用されている部品

| コンポーネント | パス | props | 使われている場所 |
|---|---|---|---|
| **AreaCard** | `pages/area/AreaCard.astro` | `poi: AreaPoi` | `area/1-map`（68件をSSR出力） |
| **ItemSection** | `pages/rental/ItemSection.astro` | `title` `lead` `items` | `rental/1-rental`、`rental/2-sale` |
| **Transition** | `pages/private-area/Transition.astro` | `step: 1〜6` | `private-area/3-details`、`private-area.astro` |

### 4-3. ご指定の部品の部品化状況

| 部品 | 状態 | 実装場所 |
|---|---|---|
| **宿泊サイトのカード** | ✅ **部品化済み** | `common/stayCard/StayCard.astro` |
| **アクティビティのカード** | ✅ **部品化済み** | `common/activityCard/ActivityCard.astro` |
| **ピル型ボタン（絞り込みの「種別」「定員」）** | ✅ **FilterBar の中に部品化**（単体では取り出せない） | `common/filter/FilterBar.astro:31`（`filter-bar__pill`） |
| **塗りボタン（「リセット」）** | ⚠️ **同じピルの修飾子**。独立部品ではない | `FilterBar.astro:49`（`filter-bar__pill--reset`） |
| **円形の `\Check/` バッジ** | ❌ **部品化されていない**。StayCard 内に直書き（SVG 2枚＋テキスト3段）／トップの泊まるセクションにも**別実装で再現**されている | `StayCard.astro:36-59`（`stay-card__badge`）、`top/5-stay.astro:75`（`stay__card-badge`、`badge-frame.svg` を使う別実装） |
| **区画IDのグリーンの丸** | ❌ **部品化されていない**。StayCard 内に直書き | `StayCard.astro:61`（要素）／`:241-260`（`background-color: #8aad61` + `border-radius: 50%`） |
| **淡いグリーンのタグ** | ❌ **部品化されていない**。StayCard 内に直書き | `StayCard.astro:69`（要素）／`:329-346`（地 `#dde9cd` / 文字 `#507425` / `border-radius: spx(10)`） |
| **円形の矢印ボタン** | ❌ **部品化されていない**。各コンポーネントが共有SVG（`images/common/icon-arrow*.svg` 5種）を読み込んで**それぞれ実装**。通常＋ホバー用の2枚を重ねて `opacity` で入れ替える型 | `StayCard.astro:79`＋`:392-410`、`private-area/3-details.astro:99-103`、`news-detail/1-article.astro:66` |
| **雲型のセクション区切り** | ❌ **部品化されていない** | `PageHeader.astro:48-51`（下層ページ上部の雲）、`footer/Footer.astro:69-78`（フッターの雲） |
| **波型のセクション区切り** | ⚠️ **一部だけ部品化**。`season/0-wave.astro`・`howto/0-wave.astro`・`private-area/Transition.astro` はページ専用の波コンポーネント。**それ以外の16セクションは各ファイルに直書き**（`stay-detail`・`activity-detail`・`hotel-set-plan` など） | `season/0-wave.astro`、`howto/0-wave.astro`、`private-area/Transition.astro` ほか |
| **見出し上の放射状の飾り線** | ❌ **部品化されていない**。`sunburst.png` / `burst` 画像を6ファイルがそれぞれ `<img>` で読み込む | `PageHeader.astro`（`__burst`）、`top/3-activity`・`4-season`・`5-stay`・`6-information`・`7-howto` |
| **価格表示（`¥9,350〜 ／1泊`）** | ❌ **部品化されていない**。StayCard 内に直書き。トップの泊まるセクションにも別実装あり | `StayCard.astro:75`（`__price-main` `__price-unit`）／`:365-390`、`top/5-stay.astro:109`（`stay__card-price`） |

---

## 5. レイアウトと固定要素

### 5-1. 共通レイアウト

`BaseLayout.astro:84-91` の構成:

```
<body>
  <Header />          … 右上に固定
  <Menu />            … 全画面オーバーレイ
  <main class="layout-main [is-flush]">
    <slot />          … ページ本体
  </main>
  <Footer breadcrumb={...} />
  <PageTop />         … 右下に固定
</body>
```

- **コンテナ幅の指定は BaseLayout には無い**（各セクションが自前で持つ。3-5 参照）
- `main` には固定ヘッダー分の `padding-top` が `reset.scss:87-99` で入る:
  SP `16.667vw` / `768px以上` `7vw` / `1024px以上` `5.469vw`
- トップのようにヒーローを全面表示するページは `flush` prop で打ち消す（`BaseLayout.astro:102-104`）

### 5-2. 固定要素の実装位置と z-index

| 要素 | position | z-index | 位置 | 出典 |
|---|---|---|---|---|
| **Header（Instagram＋MENU）** | `fixed` | **110** | `top: spx(15); right: 0`（SP）／ `top: ppx(40)`（PC） | `header/Header.astro:127-141` |
| **Menu（全画面オーバーレイ）** | `fixed` | **100** | `inset: 0` | `menu/Menu.astro:112-114` |
| **PageTop** | `fixed` | **90** | `right: spx(30); bottom: spx(30)`（SP）／`right: ppx(60*1.2)`（TB以上） | `pageTop/PageTop.astro:34-46` |

コンテンツ側の z-index は **0 / 1 / 2 / 3 のみ**（`z-index: 1` が125箇所、`0` が62箇所、`2` が20箇所、`3` が3箇所）。
固定要素の 90/100/110 とは十分に離れている。

### 5-3. 固定要素とコンテンツの重なり

**縦方向（ヘッダー分）だけ回避策がある。横方向・下方向は無い。**

| | 状態 |
|---|---|
| ヘッダー分の上余白 | ✅ **あり**。`reset.scss:87-99` が `main` に `padding-top` を入れる（`flush` で解除可） |
| **右上ヘッダーとの重なりを避けるクラス・余白** | ❌ **無い（`未定義`）**。ヘッダーは `right: 0` の固定で、`padding-top` の範囲を超えて下にスクロールした要素とは重なりうる。実際、周辺情報ページでは**地図の右上隅にヘッダーが重なることを承知のうえで許容している**（`area/1-map.astro:539-541` のコメントに明記） |
| **右下 PAGE TOP との重なりを避けるクラス・余白** | ❌ **無い（`未定義`）**。`pageTop/PageTop.astro:39-42` のコメントに「フッターのコピーライトに被らないよう `bottom` を `spx(46)` 以下にする必要がある」と**個別に計算した記録**があるだけで、汎用の回避余白は用意されていない |

**`/rain/` を作るときの注意**: 右上・右下に置く要素（追従CTAなど）は、**自分で `z-index` と余白を計算して避ける必要がある**。
共通の「安全領域」変数やユーティリティクラスは存在しない。

---

## 6. 画像・イラストアセット

### 6-1. 置き場所

```
src/assets/images/
├── common/          … 全ページ共通（icon-arrow*.svg, paper-texture.png, logo-*.svg）
│   ├── footer/  header/  pageHeader/  pagetop/
├── top/             … トップ専用。セクション番号でディレクトリを切る
│   ├── 1-hero/  2-concept/  3-activity/  4-season/  5-stay/  6-information/  7-howto/  8-access/
├── stay/            … cards/  detail/
├── activity/        … cards/  detail/  heroes/
├── facility/        … hodohodo/  photos/
├── season/          … photos/
├── howto/           … photos/
├── private-area/    … transitions/  _src/（支給元データ。ビルドには使わない）
├── area/  news/  rental/  hotel-set-plan/
└── _pending/        … 未使用・保留

public/              … favicon一式・og-image.jpg・robots.txt・site.webmanifest・movie/
```

ファイル数の内訳: **SVG 127 / WebP 97 / JPG 70 / PNG 22**

### 6-2. 命名規則

**明文化された規則は無い（`未定義`）が、実態として以下の傾向がある。**

- **すべて小文字＋ハイフン区切り**（`icon-arrow-white.svg`、`area-map-annotated.webp`）— 例外なし
- **連番は 2桁ゼロ埋め**（`site-01.jpg` 〜 `site-08.jpg`）
- **役割の接頭辞**が使われる: `icon-`（アイコン）、`badge-`（バッジ）、`logo-`（ロゴ）、`wave-`（波）、`illust-`（イラスト）
- **断面の接尾辞**: `-pc` / `-sp`（`join-pc.svg` / `join-sp.svg`、`cloud-pc.svg` / `cloud-sp.svg`）
- **ホバー用は `-hover`**（`icon-menu.svg` / `icon-menu-hover.svg`）
- **アンダースコア始まりのディレクトリはビルド対象外の置き場**（`_src/`、`_pending/`）

### 6-3. 読み込み方

**ほぼ全てが素の `<img>`。Astro の画像最適化は1箇所しか使っていない。**

| 方式 | 件数 | 備考 |
|---|---|---|
| `import X from "...";` → `<img src={X.src}>` | **91箇所** | Astro は**ファイルをコピーするだけで最適化しない**。`width` / `height` 属性は付けたり付けなかったりで統一されていない |
| `astro:assets` の `getImage()` | **1箇所のみ** | `top/5-stay.astro:24-33`。WebP 化＋`widths: [1024, 1440, 1931]` の srcset を生成（2026-08-07 に導入） |
| `<Image>` / `<Picture>` コンポーネント | **0件** | 未使用 |
| `loading="lazy"` | 14箇所 | 付いているのはカードの写真など一部のみ |

**SP/PC で画像を出し分ける場合**は、`<picture>` ＋ `<source media="(min-width: 744px)">` を手書きする
（`top/5-stay.astro:137-145`、`PageHeader.astro:48-51`）。Astro の `<Picture>` はアートディレクション非対応のため使っていない。

### 6-4. イラストと写真の扱いの違い

**分かれている。**

| | 形式 | 扱い |
|---|---|---|
| **イラスト・装飾・アイコン** | SVG（127ファイル） | そのまま `<img>`。テクスチャなど一部は PNG（`paper-texture.png`）で `background-image` に使う |
| **写真** | JPG / WebP | `<img>`。**新規は WebP を推奨**（`top/7-howto/case-*.webp` は生成PNG→WebP q82 に変換して使用）。元PNGはコミットしない運用 |
| **波・繋ぎの図形** | WebP（透過） | ベタ色を焼き込むと本体背景とズレるため、**透過にして本体の背景を見せる**運用（`wave-to-areamap.webp` など） |

---

## 7. 新規1ページ（`/rain/`）を足す観点でのまとめ

### 7-1. そのまま再利用できる部品

| 部品 | 使い方 |
|---|---|
| **BaseLayout** | `title` / `description` / `breadcrumb` / `ogImage` を渡すだけ。ヘッダー・メニュー・フッター・PAGE TOP が付く |
| **PageHeader** | 英字大見出し＋和文小見出し＋リード文。`leadVariant="large"` でキャッチコピー用の大きめリードも出せる |
| **ActivityCard** | 雨の日に楽しめるアクティビティを並べるならそのまま使える。`variant` / `accent` で配色を変えられる |
| **StayCard** | 宿泊サイトへ誘導するならそのまま使える |
| **FeeModal** | 「料金＋注意事項」のモーダル。`id` と `{price, notes[]}` を渡すだけ。開くボタン側は自前 |
| **AnchorNav** | ページ内の目次。`links` を渡すだけ |
| **`ppx()` / `spx()` / `tablet-up` / `desktop-up` / `tablet-only` / `hover`** | 全て利用可 |
| **紙テクスチャ・波・雲の画像アセット** | `images/common/paper-texture.png` ほか既存アセットを流用可 |

### 7-2. 新しく作る必要がある部品

| LPで必要になりそうなもの | 現状 | 作り方の当て |
|---|---|---|
| **料金の内訳表示** | ❌ **汎用の表コンポーネントは無い**。`stay-detail/3-price.astro` と `hotel-set-plan/3-price.astro` に**それぞれ直書き**の料金表がある | どちらかをコピーして起こす。ラベル列＋金額列＋注記の3段構成が既存の型 |
| **FAQのアコーディオン** | ⚠️ **`faq/2-sections.astro` に実装があるが、コンポーネント化されていない**（ページ専用）。`<button aria-expanded>` ＋ `is-open` クラス切り替えの素朴な実装（`faq/2-sections.astro:28-38, 57-62`）。`<details>` は不使用 | `2-sections.astro` から切り出して共通化するか、コピーして作る |
| **申込フォーム** | ⚠️ `contact/1-form.astro` に**完成品がある**（下記 7-4）。ただし**コンポーネント化されておらずページ専用**。項目もお問い合わせ用に固定 | `1-form.astro` を複製して項目を差し替える。Formspree の送信先・reCAPTCHA の作りはそのまま流用できる |
| **追従CTA** | ❌ **存在しない**。固定要素は Header(110) / Menu(100) / PageTop(90) の3つだけ | 新規作成。**z-index は 90 未満（コンテンツ側は最大3なので 10〜80 が安全）**。右下は PageTop と重なるので、位置か PageTop の出し分けを検討する必要がある |
| **セクション間の波・繋ぎ** | ⚠️ ページ専用のものしかない | 既存ページからコピーする。作り方は `docs/` 外だがプロジェクトの定石として「枠の背景＝CSS／図形＝透過画像」 |

### 7-3. 新規ページを追加する手順

**`src/pages/_template.astro` は存在しない（`未定義`）。** 既存ページを写して作る。

**1. ルーティング** — `src/pages/rain.astro` を置くだけで `/rain/` になる（ファイルベースルーティング）。
サブページを作るなら `src/pages/rain/index.astro`。

**2. レイアウトの継承と共通メタ情報** — `src/pages/rental.astro`（全17行）が最小の見本:

```astro
---
import BaseLayout from "../assets/components/common/layout/BaseLayout.astro";
import PageHeader from "../assets/components/common/pageHeader/PageHeader.astro";
import Section1 from "../assets/components/pages/rain/1-hero.astro";
---

<BaseLayout
  title="雨の日応援セット | 西湖キャンプビレッジ・ノーム"
  description="（meta description。未指定ならサイト共通文が入る）"
  flush
  breadcrumb={[{ label: "TOP", href: "/" }, { label: "雨の日応援セット" }]}
>
  <PageHeader titleEn="RAIN" titleJa="雨の日応援セット" />
  <Section1 />
</BaseLayout>
```

- `flush` はヒーローを全面表示するとき。**下層ページでも `flush` を付けている実績が多い**（`rental.astro:11`）
- `canonical` と OGP は `BaseLayout.astro:39-40` が `astro.config.mjs` の `site` を基準に自動生成する
- **sitemap は自動**（`astro.config.mjs` の `@astrojs/sitemap`。404 のみ除外）

**3. セクションの分け方** — `src/assets/components/pages/rain/` を作り、
`1-hero.astro` `2-xxx.astro` … と**番号プレフィックスで1ファイル1セクション**に分ける（既存の全ページがこの形）。

**4. 公開前の注意** — `BaseLayout.astro` に `<meta name="robots" content="noindex, nofollow">` が
**「【公開前に削除】」コメント付きで入ったまま**。サイト全体が noindex なので、`/rain/` も公開時にここを外す必要がある。

### 7-4. 問い合わせフォームの有無と送信先

**存在する。送信先も設定済み。**

| 項目 | 値 | 出典 |
|---|---|---|
| 実装 | `src/assets/components/pages/contact/1-form.astro`（ページ専用。コンポーネント化はされていない） | — |
| ページ | `/contact/`（`src/pages/contact.astro`） | — |
| **送信先** | **`https://formspree.io/f/mbgrrlep`**（Formspree） | `contact/1-form.astro:12`（`FORM_ACTION`） |
| 送信方式 | `fetch` による AJAX 送信。成功時は完了表示に差し替え | `1-form.astro:125` |
| **reCAPTCHA** | **v3 実装済み**。サイトキー `6Le_lQ4aAAAAABd-UvFqrCw0De2awPx1gpF2tzxK` | `1-form.astro:21`（`RECAPTCHA_SITE_KEY`）、`:270`（スクリプト読み込み） |
| スパム対策 | `_gotcha` ハニーポット | `1-form.astro` |
| 自動返信 | **未設定**（Formspree 側の設定のみで実装可能。コード変更は不要） | — |

**`/rain/` に申込フォームを付ける場合**: `1-form.astro` を複製して項目を差し替えるのが最短。
Formspree のプロジェクトは Business プランで送信数に余裕があるが、
**同じエンドポイント（`mbgrrlep`）を使い回すと問い合わせと申込が同じ受信箱に混ざる**ため、
Formspree 側で新しいフォームを作って `FORM_ACTION` を分けるのが望ましい。

---

## 付録: この文書で「未定義」と判定したもの

| 項目 | 状態 |
|---|---|
| 色の変数（SCSS変数 / CSSカスタムプロパティ / Tailwind） | **未定義**（グローバルには1つも無い） |
| 余白のスケール変数 | **未定義** |
| `h1`〜`h4` の共通スタイル | **未定義**（`h4` は使用実績も0） |
| `clamp()` によるサイズ指定 | **未使用**（0件） |
| 共通コンテナ幅の変数・コンポーネント | **未定義** |
| ページテンプレート（`_template.astro`） | **存在しない** |
| 画像命名規則の明文化 | **未定義**（実態としての傾向はある） |
| 固定要素との重なり回避クラス・安全領域 | **未定義** |
| 追従CTAの実装 | **存在しない** |
| フォームの自動返信 | **未設定** |
| 欧文専用Webフォント | **未使用**（英字も Noto Sans JP） |
