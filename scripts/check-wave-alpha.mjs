// 繋ぎ波のWEBPに「アルファの欠け」が無いかを調べる。
//
//   node scripts/check-wave-alpha.mjs
//
// 波はアルファ付きの単色画像で、不透明であるべき帯の途中に半透明の行が混ざっていると、
// そこだけ下地が透けて明るい線として見える（「料金の上に下線」等の原因）。
// 縮小時にその行が実ピクセルに乗るかどうかがブラウザの補間方法で変わるため、
// 「特定のブラウザだけ線が出る」という報告になりやすい。
//
// 画像を書き換えることはしない。書き出し元を直すのが本筋なので、
// ここでは「どの画像のどの高さが欠けているか」を出すだけにしている。
// 差し替えが届いたらもう一度実行して、欠けが消えたことを確認する。

import { execFile } from "node:child_process";
import { readFile, unlink } from "node:fs/promises";
import { promisify } from "node:util";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { glob } from "node:fs/promises";

const run = promisify(execFile);

/** 不透明とみなすしきい値 */
const OPAQUE = 240;
/** 周囲より何段階下がっていたら「欠け」とみなすか */
const DROP = 25;
/** 周囲を何行先まで見るか */
const LOOK = 5;

const files = [];
for await (const f of glob("src/assets/images/**/wave*.webp")) files.push(f);
files.sort();

let ng = 0;

for (const file of files) {
  const { stdout } = await run("magick", ["identify", "-format", "%w %h", file]);
  const [w, h] = stdout.trim().split(" ").map(Number);
  const raw = join(tmpdir(), `wa-${Math.random().toString(36).slice(2)}.gray`);
  // 横方向に平均した1列ぶんのアルファ（帯状の欠けはここに素直に出る）
  await run("magick", [file, "-alpha", "extract", "-resize", `1x${h}!`, "-depth", "8", `gray:${raw}`]);
  const a = new Uint8Array(await readFile(raw));
  await unlink(raw).catch(() => {});

  const hits = [];
  for (let y = LOOK; y < h - LOOK; y += 1) {
    let base = 0;
    for (let k = 1; k <= LOOK; k += 1) base = Math.max(base, a[y - k], a[y + k]);
    if (base < OPAQUE) continue; // そもそも不透明な帯の中ではない
    if (base - a[y] < DROP) continue;
    hits.push({ y, alpha: a[y], base });
  }

  // stay/detail と activity/detail のように同名ファイルがあるので、画像ディレクトリからの相対で出す
  const name = file.replace("src/assets/images/", "");
  if (hits.length === 0) {
    console.log(`○ ${name.padEnd(44)} ${w}x${h}  欠けなし`);
    continue;
  }
  ng += 1;
  console.log(`✗ ${name.padEnd(44)} ${w}x${h}`);
  for (const { y, alpha, base } of hits) {
    console.log(
      `    ${String(y).padStart(4)}行目（上から${((y / h) * 100).toFixed(1)}%）` +
        `  alpha ${String(alpha).padStart(3)}  ← 周囲は ${base}`
    );
  }
}

console.log(`\n欠けのある画像: ${ng} / ${files.length}`);
