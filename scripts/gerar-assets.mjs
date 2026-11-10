/*
  Gera os assets de marca a partir de public/logo.jpg:
    - app/favicon.ico   (ICO real com 16, 32 e 48px; nunca PNG renomeado)
    - app/apple-icon.png (180x180)
    - public/og-image.jpg (Open Graph, exatamente 1200x630)

  Uso: npm run assets
  Rodar de novo sempre que a logo mudar e versionar os arquivos gerados.
*/
import { writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const p = (...parts) => path.join(root, ...parts);

const NAVY = "#1B2A4A";
const GOLD = "#FFD700";
const BRICK = "#8B1A1A";
const GOLD_RGB = [255, 215, 0];

/*
  O fundo da logo e um amarelo em degrade (mais claro no centro). Em recortes
  pequenos isso vira mancha, entao trocamos todo pixel amarelado pelo gold
  chapado da marca. Navy e vermelho nao entram no criterio (verde baixo).
*/
async function logoComFundoChapado() {
  const { data, info } = await sharp(p("public", "logo.jpg"))
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 3) {
    if (data[i] > 190 && data[i + 1] > 170) {
      data[i] = GOLD_RGB[0];
      data[i + 1] = GOLD_RGB[1];
      data[i + 2] = GOLD_RGB[2];
    }
  }
  return sharp(data, { raw: info }).png().toBuffer();
}

// Recortes da logo original (1254x1254).
const CASA = { left: 260, top: 290, width: 800, height: 285 }; // so o simbolo da casa
const MARCA = { left: 90, top: 290, width: 1100, height: 670 }; // casa + VIDRAFE + ACABAMENTOS

// Encaixa um recorte num quadrado gold com respiro nas bordas.
async function quadrado(logo, area, size, padding) {
  const inner = Math.round(size * (1 - padding * 2));
  const recorte = await sharp(logo)
    .extract(area)
    .resize(inner, inner, { fit: "contain", background: GOLD })
    .toBuffer();
  return sharp({ create: { width: size, height: size, channels: 3, background: GOLD } })
    .composite([{ input: recorte, gravity: "center" }])
    .png()
    .toBuffer();
}

/*
  Monta um .ico real (cabecalho ICONDIR + entradas) com PNGs comprimidos
  dentro, formato aceito por todos os navegadores atuais. Fica bem menor
  que o ICO com bitmap cru.
*/
function montarIco(imagens) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reservado
  header.writeUInt16LE(1, 2); // tipo 1 = icone
  header.writeUInt16LE(imagens.length, 4);

  let offset = 6 + imagens.length * 16;
  const entradas = imagens.map(({ size, png }) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(size, 0); // largura
    e.writeUInt8(size, 1); // altura
    e.writeUInt8(0, 2); // paleta
    e.writeUInt8(0, 3); // reservado
    e.writeUInt16LE(1, 4); // planos
    e.writeUInt16LE(32, 6); // bits por pixel
    e.writeUInt32LE(png.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += png.length;
    return e;
  });
  return Buffer.concat([header, ...entradas, ...imagens.map((i) => i.png)]);
}

async function gerarFavicon(logo) {
  // So a casa: o texto vira borrao em 16px. PNG com paleta deixa o arquivo pequeno.
  const imagens = await Promise.all(
    [16, 32, 48].map(async (size) => ({
      size,
      png: await sharp(await quadrado(logo, CASA, size, 0.04))
        .png({ palette: true, colours: 16, compressionLevel: 9 })
        .toBuffer(),
    })),
  );
  await writeFile(p("app", "favicon.ico"), montarIco(imagens));
}

async function gerarAppleIcon(logo) {
  await writeFile(p("app", "apple-icon.png"), await quadrado(logo, MARCA, 180, 0.08));
}

/*
  OG provisoria montada em SVG. Quando chegar a foto da fachada, da para
  trocar por uma OG com a foto real ao fundo (mesmo 1200x630) e manter
  as dimensoes declaradas no layout.
*/
async function gerarOg(logo) {
  const W = 1200;
  const H = 630;
  const LOGO = 300;

  const logoQuadrada = await sharp(logo)
    .extract(MARCA)
    .resize(LOGO - 48, LOGO - 48, { fit: "contain", background: GOLD })
    .extend({ top: 24, bottom: 24, left: 24, right: 24, background: GOLD })
    .composite([
      {
        input: Buffer.from(
          `<svg width="${LOGO}" height="${LOGO}"><rect width="${LOGO}" height="${LOGO}" rx="18" fill="#fff"/></svg>`,
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const svg = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${W}" height="${H}" fill="${NAVY}"/>
  <rect x="0" y="${H - 14}" width="${W}" height="14" fill="${GOLD}"/>
  <rect x="440" y="168" width="80" height="5" fill="${BRICK}"/>
  <text x="440" y="252" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="#FFFFFF">Vidraçaria e acabamentos</text>
  <text x="440" y="312" font-family="Georgia, 'Times New Roman', serif" font-size="48" font-weight="700" fill="#FFFFFF">em <tspan fill="${GOLD}">Santa Bárbara de Goiás</tspan></text>
  <text x="440" y="380" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#FFFFFF" fill-opacity="0.8">Box, espelhos, esquadrias, forro PVC e drywall</text>
  <text x="440" y="424" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="${GOLD}">Orçamento pelo WhatsApp</text>
</svg>`;

  await sharp(Buffer.from(svg))
    .composite([{ input: logoQuadrada, left: 90, top: Math.round((H - 14 - LOGO) / 2) }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(p("public", "og-image.jpg"));
}

const logo = await logoComFundoChapado();
await Promise.all([gerarFavicon(logo), gerarAppleIcon(logo), gerarOg(logo)]);

for (const f of [["app", "favicon.ico"], ["app", "apple-icon.png"], ["public", "og-image.jpg"]]) {
  const meta = await sharp(p(...f)).metadata().catch(() => null);
  const { size } = await import("node:fs").then((fs) => fs.statSync(p(...f)));
  console.log(`${f.join("/")}: ${meta ? `${meta.width}x${meta.height}, ` : ""}${size} bytes`);
}
