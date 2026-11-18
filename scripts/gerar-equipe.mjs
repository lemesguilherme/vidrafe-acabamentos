/*
  Retratos da equipe (secao Sobre): converte public/equipe/originais/<slug>.jpg|png
  em public/equipe/<slug>.webp e gera o manifesto data/equipe.gerada.ts.
  Roda local (npm run equipe), nunca na Vercel.

  Fluxo:
    1. Salvar o original com o slug da pessoa (ver `equipe` em data/site.ts):
       public/equipe/originais/joel.jpg, public/equipe/originais/joel-junior.jpg
    2. npm run equipe
    3. Commitar o .webp e o manifesto. A pasta originais/ fica fora do git.

  O manifesto diz quais retratos existem: sem entrada, o componente mostra o
  placeholder (nunca imagem quebrada). O recorte 4:5 e feito no CSS
  (object-cover), entao a foto original pode ter qualquer proporcao.

  Idempotente: se o .webp e mais novo que o original, pula.
*/
import { mkdir, readdir, stat, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import { converterParaWebp } from "./otimizar-imagens.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PASTA = path.join(root, "public", "equipe");
const ORIGINAIS = path.join(PASTA, "originais");
const MANIFESTO = path.join(root, "data", "equipe.gerada.ts");
const ORIGINAL = /\.(jpe?g|png)$/i;
// Retrato ocupa no maximo ~460px de largura na tela; 1000px cobre tela 2x.
const LARGURA = 1000;

const mtime = (f) => stat(f).then((s) => s.mtimeMs, () => 0);

await mkdir(ORIGINAIS, { recursive: true });
const originais = (await readdir(ORIGINAIS)).filter((a) => ORIGINAL.test(a)).sort();

const manifesto = {};
for (const original of originais) {
  const slug = original.replace(ORIGINAL, "");
  const entrada = path.join(ORIGINAIS, original);
  const saida = path.join(PASTA, `${slug}.webp`);

  if ((await mtime(saida)) >= (await mtime(entrada))) {
    console.log(`  ${slug}: ja atualizado`);
  } else {
    const r = await converterParaWebp(entrada, saida, { largura: LARGURA });
    console.log(`  ${slug}: ${r.largura}x${r.altura}, ${Math.round(r.bytes / 1024)} KB`);
  }
  const { width, height } = await sharp(saida).metadata();
  manifesto[slug] = { src: `/equipe/${slug}.webp`, width, height };
}

await writeFile(
  MANIFESTO,
  `/*
  ARQUIVO GERADO por scripts/gerar-equipe.mjs (npm run equipe). Nao editar a mao.
  So entram os retratos que existem; quem nao esta aqui aparece com placeholder.
*/
export type RetratoEquipe = { src: string; width: number; height: number };

export const retratosEquipe: Record<string, RetratoEquipe> = ${JSON.stringify(manifesto, null, 2)};
`,
);
console.log(`equipe: ${Object.keys(manifesto).length} retrato(s) no manifesto`);
