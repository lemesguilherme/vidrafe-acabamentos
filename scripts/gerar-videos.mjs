/*
  Videos do site: otimiza os originais e gera os arquivos leves em public/videos/.
  Roda local (npm run videos), nunca na Vercel. Precisa do ffmpeg no PATH.

  Para cada video da lista VIDEOS gera:
    - <slug>.mp4   H.264 + AAC, yuv420p, +faststart (fallback universal, iPhone)
    - <slug>.webm  VP9 + Opus, duas passadas (menor, tentado primeiro)
    - <slug>-poster.webp  quadro escolhido, pelo pipeline de imagens

  Maximo 1080p na menor dimensao (video vertical de celular: 1080x1920); se o
  original for menor, fica na resolucao dele. O audio e mantido quando o video
  tem fala (`audio: true`); decorativo vai sem audio.

  O original fica fora do git (ver .gitignore da galeria). So a saida otimizada
  de public/videos/ e versionada.

  Idempotente: se as tres saidas sao mais novas que o original, pula.
*/
import { mkdir, rm, stat } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import os from "node:os";
import path from "node:path";
import { converterParaWebp } from "./otimizar-imagens.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SAIDA = path.join(root, "public", "videos");

const VIDEOS = [
  {
    entrada: "public/galeria/forro-pvc-amadeirado/forro-amadeirado-tabaco.mp4",
    slug: "forro-amadeirado-espaco",
    // Junior olhando pra camera com o telhado ainda sem forro.
    posterEm: 4.5,
    audio: true,
  },
];

// Menor dimensao ate 1080, sem aumentar video pequeno; lados pares pro yuv420p.
const ESCALA =
  "scale='if(gt(iw,ih),-2,min(1080,iw))':'if(gt(iw,ih),min(1080,ih),-2)'";

const mtime = (f) => stat(f).then((s) => s.mtimeMs, () => 0);

function ffmpeg(args) {
  const r = spawnSync("ffmpeg", ["-hide_banner", "-loglevel", "error", "-y", ...args], {
    stdio: "inherit",
  });
  if (r.error) throw new Error(`ffmpeg nao encontrado no PATH (${r.error.message})`);
  if (r.status !== 0) throw new Error(`ffmpeg saiu com codigo ${r.status}`);
}

const kb = async (f) => Math.round((await stat(f)).size / 1024);

await mkdir(SAIDA, { recursive: true });

for (const v of VIDEOS) {
  const entrada = path.join(root, v.entrada);
  const mp4 = path.join(SAIDA, `${v.slug}.mp4`);
  const webm = path.join(SAIDA, `${v.slug}.webm`);
  const poster = path.join(SAIDA, `${v.slug}-poster.webp`);

  const original = await mtime(entrada);
  if (!original) throw new Error(`original nao encontrado: ${v.entrada}`);
  const saidas = await Promise.all([mp4, webm, poster].map(mtime));
  if (saidas.every((t) => t >= original)) {
    console.log(`  ${v.slug}: ja atualizado`);
    continue;
  }

  // MP4 H.264: CRF com teto de bitrate, pra cena de celular tremida nao estourar.
  ffmpeg([
    "-i", entrada, "-vf", ESCALA,
    "-c:v", "libx264", "-preset", "slow", "-crf", "27", "-maxrate", "1400k", "-bufsize", "2800k",
    "-profile:v", "high", "-pix_fmt", "yuv420p",
    ...(v.audio ? ["-c:a", "aac", "-b:a", "96k", "-ac", "1"] : ["-an"]),
    "-movflags", "+faststart", mp4,
  ]);

  // WebM VP9 em duas passadas, qualidade restrita: -crf manda, -b:v e o teto.
  const log = path.join(os.tmpdir(), `vp9-${v.slug}`);
  const vp9 = ["-c:v", "libvpx-vp9", "-crf", "36", "-b:v", "1100k", "-row-mt", "1"];
  ffmpeg(["-i", entrada, "-vf", ESCALA, ...vp9, "-pass", "1", "-passlogfile", log, "-an", "-f", "null", os.devNull]);
  ffmpeg([
    "-i", entrada, "-vf", ESCALA, ...vp9, "-pass", "2", "-passlogfile", log,
    ...(v.audio ? ["-c:a", "libopus", "-b:a", "64k", "-ac", "1"] : ["-an"]),
    webm,
  ]);
  await rm(`${log}-0.log`, { force: true });

  // Poster: quadro em JPEG de alta qualidade e depois WebP pelo pipeline de imagens.
  const quadro = path.join(os.tmpdir(), `${v.slug}-poster.jpg`);
  ffmpeg(["-ss", String(v.posterEm), "-i", entrada, "-frames:v", "1", "-q:v", "2", quadro]);
  await converterParaWebp(quadro, poster, { largura: 1280 });
  await rm(quadro, { force: true });

  console.log(
    `  ${v.slug}: mp4 ${await kb(mp4)} KB, webm ${await kb(webm)} KB, poster ${await kb(poster)} KB` +
      ` (original ${await kb(entrada)} KB)`,
  );
}
