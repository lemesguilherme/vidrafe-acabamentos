/*
  Pipeline de imagens do site: JPEG/PNG -> WebP leve.

  Regra do projeto (CLAUDE.md / regras.md): imagem em WebP, qualidade ~80,
  sem metadados, bem abaixo de ~300 KB. Larguras maximas por uso:
    - hero:    1800px
    - galeria: 1600px

  A funcao converterParaWebp e reutilizavel (a tarefa da galeria importa
  ela pra converter as fotos em lote):

    import { converterParaWebp, LARGURAS } from "./otimizar-imagens.mjs";
    await converterParaWebp("origem.jpeg", "public/galeria/x.webp", { largura: LARGURAS.galeria });

  Uso pela linha de comando (npm run midia):
    npm run midia                                  converte os assets ja usados no site (ASSETS abaixo)
    npm run midia -- <entrada> [saida] [--largura N] [--qualidade N]

  O OG (public/og-image.jpg) fica de fora de proposito: ver gerar-assets.mjs.
*/
import { stat } from "node:fs/promises";
import { fileURLToPath, pathToFileURL } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const LARGURAS = { hero: 1800, galeria: 1600 };
export const QUALIDADE = 80;
// Alvo: bem abaixo disso. Passou, o script avisa.
export const LIMITE_BYTES = 300 * 1024;

/*
  Converte uma imagem pra WebP. So reduz (nunca amplia), respeita a
  orientacao EXIF antes de descartar os metadados e grava sem EXIF/ICC/GPS
  (o sharp so copia metadados quando se pede withMetadata).
  Devolve { saida, largura, altura, bytes } pra quem chamou montar width/height.
*/
export async function converterParaWebp(
  entrada,
  saida = entrada.replace(/\.(jpe?g|png)$/i, ".webp"),
  { largura = LARGURAS.galeria, qualidade = QUALIDADE, contraste = 1 } = {},
) {
  let img = sharp(entrada)
    .rotate()
    .resize({ width: largura, height: largura, fit: "inside", withoutEnlargement: true });
  // Contraste leve opcional, centrado no cinza medio (1 = sem ajuste).
  if (contraste !== 1) img = img.linear(contraste, 128 * (1 - contraste));
  const info = await img
    .webp({ quality: qualidade, effort: 6 })
    .toFile(saida);

  const { size } = await stat(saida);
  if (size > LIMITE_BYTES) {
    console.warn(`  aviso: ${path.basename(saida)} ficou com ${kb(size)}, acima do alvo de ${kb(LIMITE_BYTES)}`);
  }
  return { saida, largura: info.width, altura: info.height, bytes: size };
}

const kb = (bytes) => `${Math.round(bytes / 1024)} KB`;

// Assets ja usados no site. A galeria tem fluxo proprio e nao entra aqui.
const ASSETS = [
  // Hero (desktop e mobile usam a mesma). Foto vertical 3:4: o lado maior fica
  // em ~1700px, e o contraste leve segura a fachada sob o overlay navy.
  { entrada: "midia/originais/fachada-vidrafe.jpeg", saida: "public/fachada-vidrafe.webp", largura: 1707, contraste: 1.04 },
];

function lerArgs(argv) {
  const opcoes = {};
  const posicionais = [];
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === "--largura") opcoes.largura = Number(argv[++i]);
    else if (argv[i] === "--qualidade") opcoes.qualidade = Number(argv[++i]);
    else posicionais.push(argv[i]);
  }
  return { opcoes, posicionais };
}

async function main() {
  const { opcoes, posicionais } = lerArgs(process.argv.slice(2));
  const tarefas = posicionais.length
    ? [{ entrada: posicionais[0], saida: posicionais[1], ...opcoes }]
    : ASSETS.map((a) => ({ ...a, entrada: path.join(root, a.entrada), saida: path.join(root, a.saida) }));

  for (const { entrada, saida, ...resto } of tarefas) {
    const antes = (await stat(entrada)).size;
    const r = await converterParaWebp(entrada, saida, resto);
    console.log(
      `${path.relative(root, r.saida)}: ${r.largura}x${r.altura}, ${kb(antes)} -> ${kb(r.bytes)}`,
    );
  }
}

// So roda a CLI quando chamado direto (importar o modulo nao converte nada).
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main();
}
