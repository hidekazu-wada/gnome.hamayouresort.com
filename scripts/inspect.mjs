// headless Chrome を CDP で叩いて、実際に組まれたDOMを測る/操作する検証用ツール。
// スクリーンショットだけでは詰められない「はみ出していないか」「絞り込みが効いているか」を確認する。
//
//   node scripts/inspect.mjs <URL> <幅> <高さ> <評価するJSのファイル> [出力するPNG]
//
// 評価するJSは async 即時関数の中身として実行され、返した値が JSON で出力される。
// 返り値に clip: {x, y, width, height} を含めると、その範囲だけを切り出して保存する。
// 修正前後を同じ位置・同じ倍率で撮って並べるときに使う。

import { spawn } from "node:child_process";
import { readFile, writeFile } from "node:fs/promises";

const [url, width = "600", height = "1200", scriptPath, shotPath] = process.argv.slice(2);
if (!url) {
  console.error("usage: node scripts/inspect.mjs <URL> [幅] [高さ] [評価するJS] [PNG]");
  process.exit(1);
}

// BROWSER=edge で Microsoft Edge に切り替える（Chromium系なので同じCDPで動く）
const BROWSERS = {
  chrome: "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  edge: "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
};
const CHROME = BROWSERS[process.env.BROWSER ?? "chrome"] ?? BROWSERS.chrome;
// 連続で走らせたときに前のChromeと衝突しないよう、実行ごとに変える
const PORT = 9300 + (process.pid % 600);
const PROFILE = `/tmp/chrome-inspect-${process.pid}`;

// 追加のChromeフラグを渡したいとき用（CHROME_FLAGS="--foo --bar"）
const extraFlags = (process.env.CHROME_FLAGS ?? "").split(" ").filter(Boolean);

const chrome = spawn(CHROME, [
  ...extraFlags,
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--disable-gpu",
  // SHOW_SCROLLBARS=1 で実機同様のスクロールバーを出す（vw とのズレを見るとき用）
  ...(process.env.SHOW_SCROLLBARS === "1" ? [] : ["--hide-scrollbars"]),
  "--no-first-run",
  `--user-data-dir=${PROFILE}`,
  `--window-size=${width},${height}`,
  "about:blank",
]);
chrome.stderr.on("data", () => {});

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** DevTools が受け付けるようになるまで待つ */
async function waitForDevtools() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      if (res.ok) return (await res.json()).webSocketDebuggerUrl;
    } catch {}
    await sleep(250);
  }
  throw new Error("DevTools に接続できませんでした");
}

const browserWs = await waitForDevtools();

let nextId = 1;
function connect(wsUrl) {
  const socket = new WebSocket(wsUrl);
  const pending = new Map();
  const ready = new Promise((resolve) => socket.addEventListener("open", resolve));
  socket.addEventListener("message", (event) => {
    const message = JSON.parse(event.data);
    const entry = pending.get(message.id);
    if (!entry) return;
    pending.delete(message.id);
    if (message.error) entry.reject(new Error(JSON.stringify(message.error)));
    else entry.resolve(message.result);
  });
  return {
    socket,
    ready,
    send(method, params = {}, sessionId) {
      const id = nextId++;
      return new Promise((resolve, reject) => {
        pending.set(id, { resolve, reject });
        socket.send(JSON.stringify({ id, method, params, sessionId }));
      });
    },
  };
}

const browser = connect(browserWs);
await browser.ready;

const { targetId } = await browser.send("Target.createTarget", { url: "about:blank" });
const { sessionId } = await browser.send("Target.attachToTarget", { targetId, flatten: true });

const send = (method, params) => browser.send(method, params, sessionId);

await send("Page.enable");
await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", {
  width: Number(width),
  height: Number(height),
  deviceScaleFactor: 1,
  mobile: Number(width) < 744,
});

// REDUCED_MOTION=1 で「視差効果を減らす」設定の利用者を再現する。
// Chromeの --force-prefers-reduced-motion は効かないので CDP 側で指定する
if (process.env.REDUCED_MOTION === "1") {
  await send("Emulation.setEmulatedMedia", {
    features: [{ name: "prefers-reduced-motion", value: "reduce" }],
  });
}

await send("Page.navigate", { url });
// 地図タイルとフォントの読み込みを待つ
await sleep(6000);

let clip = null;

if (scriptPath) {
  const body = await readFile(scriptPath, "utf8");
  const { result, exceptionDetails } = await send("Runtime.evaluate", {
    expression: `(async () => { ${body} })()`,
    awaitPromise: true,
    returnByValue: true,
  });
  if (exceptionDetails) console.error("評価でエラー:", JSON.stringify(exceptionDetails, null, 2));
  else {
    if (result.value && result.value.clip) clip = { ...result.value.clip, scale: 1 };
    console.log(JSON.stringify(result.value, null, 2));
  }
}

if (shotPath) {
  // clip はビューポートではなくドキュメント基準の座標なので、
  // 画面外も撮れるように captureBeyondViewport を立てる
  const { data } = await send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: Boolean(clip),
    ...(clip ? { clip } : {}),
  });
  await writeFile(shotPath, Buffer.from(data, "base64"));
  console.error(`saved ${shotPath}`);
}

browser.socket.close();
chrome.kill();
process.exit(0);
