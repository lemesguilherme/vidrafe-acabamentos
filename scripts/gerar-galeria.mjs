/*
  Galeria: converte as fotos de public/galeria/<categoria>/ para WebP e gera o
  manifesto data/galeria.gerada.ts. Roda local (npm run galeria), nunca na Vercel.

  Fluxo pra adicionar fotos:
    1. Jogar os originais (JPEG/PNG) na pasta da categoria, ex.
       public/galeria/box-banheiro/box-01.jpeg. O nome da pasta e o `slug` da
       categoria em data/site.ts.
    2. npm run galeria
    3. Commitar os .webp e o manifesto. Os originais ficam fora do git
       (.gitignore), entao o repo continua leve e a Vercel builda do WebP.

  Ordem das fotos: nome do arquivo em ordem natural (foto-2 antes de foto-10).
  Se o nome tiver "antes", "andamento" ou "depois", a legenda mostra a etapa.
  Convencao pra agrupar por obra: <prefixo>-obra<N>-<SS>[-etapa].ext, ex.
  forro-branco-obra1-03-andamento.jpeg. A obra vem primeiro e o SS ordena
  antes -> durante -> depois dentro dela (o nome da etapa sozinho nao ordena:
  "andamento" viria antes de "antes").

  Idempotente: se o .webp existe e e mais novo que o original, pula. WebP sem
  original (foto apagada) e removido, pra galeria nao mostrar o que saiu.
*/
import { readdir, stat, unlink, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";
import { converterParaWebp, LARGURAS } from "./otimizar-imagens.mjs";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const PASTA = path.join(root, "public", "galeria");
const MANIFESTO = path.join(root, "data", "galeria.gerada.ts");
const ORIGINAL = /\.(jpe?g|png)$/i;

const ordemNatural = new Intl.Collator("pt-BR", { numeric: true }).compare;

function etapaDoNome(nome) {
  const n = nome.toLowerCase();
  if (n.includes("antes")) return "Antes";
  if (n.includes("andamento")) return "Durante";
  if (n.includes("depois")) return "Depois";
  return undefined;
}

async function mtime(arquivo) {
  try {
    return (await stat(arquivo)).mtimeMs;
  } catch {
    return 0;
  }
}

const manifesto = {};
let convertidas = 0;
let puladas = 0;
let removidas = 0;

// Pasta com "_" na frente nao e categoria: public/galeria/_removidas/ guarda as
// fotos tiradas da galeria (fora do git), pra nada se perder.
const categorias = (await readdir(PASTA, { withFileTypes: true }))
  .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
  .map((d) => d.name)
  .sort(ordemNatural);

for (const slug of categorias) {
  const dir = path.join(PASTA, slug);
  const arquivos = (await readdir(dir)).sort(ordemNatural);
  const originais = arquivos.filter((a) => ORIGINAL.test(a));
  const base = new Set(originais.map((a) => a.replace(ORIGINAL, "")));

  // WebP orfao: o original foi apagado da pasta.
  for (const a of arquivos.filter((a) => a.endsWith(".webp"))) {
    if (!base.has(a.replace(/\.webp$/, ""))) {
      await unlink(path.join(dir, a));
      removidas++;
    }
  }

  const fotos = [];
  for (const original of originais) {
    const entrada = path.join(dir, original);
    const nomeWebp = original.replace(ORIGINAL, ".webp");
    const saida = path.join(dir, nomeWebp);

    if ((await mtime(saida)) >= (await mtime(entrada))) {
      puladas++;
    } else {
      await converterParaWebp(entrada, saida, { largura: LARGURAS.galeria });
      convertidas++;
    }

    // Dimensoes reais no manifesto: width/height no <img> evitam layout shift.
    const { width, height } = await sharp(saida).metadata();
    const etapa = etapaDoNome(original);
    fotos.push({ src: `/galeria/${slug}/${nomeWebp}`, width, height, ...(etapa && { etapa }) });
  }
  manifesto[slug] = fotos;
}

const conteudo = `/*
  ARQUIVO GERADO por scripts/gerar-galeria.mjs (npm run galeria). Nao editar a mao:
  as fotos vem das pastas de public/galeria/<slug>/.
*/
export type FotoGaleria = {
  src: string;
  width: number;
  height: number;
  etapa?: "Antes" | "Durante" | "Depois";
};

export const fotosGaleria: Record<string, FotoGaleria[]> = ${JSON.stringify(manifesto, null, 2)};
`;
await writeFile(MANIFESTO, conteudo);

const total = Object.values(manifesto).reduce((n, f) => n + f.length, 0);
console.log(
  `galeria: ${total} fotos em ${categorias.length} categorias ` +
    `(${convertidas} convertidas, ${puladas} ja atualizadas, ${removidas} webp orfaos removidos)`,
);
for (const [slug, fotos] of Object.entries(manifesto)) {
  if (fotos.length) console.log(`  ${slug}: ${fotos.length}`);
}
