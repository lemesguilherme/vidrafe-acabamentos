/*
  Fonte unica de verdade dos dados do site (ver prd.md).
  Qualquer numero, servico ou categoria usado em mais de um lugar vive aqui,
  nunca espalhado pelos componentes.
*/
import type { FotoGaleria } from "@/data/galeria.gerada";

export const company = {
  // Dominio provisorio: atualizar pelo dominio final na hora do deploy.
  siteUrl: "https://vidrafe-acabamentos.vercel.app",
  name: "Vidrafe Acabamentos",
  shortName: "Vidrafe",
  city: "Santa Bárbara de Goiás",
  state: "GO",
  cep: "75398-000",
  // Endereco e horario conferidos com a ficha VIDRAFE ACABAMENTOS no Google Maps
  // (a mesma do mapsEmbed e do mapsDirections). Mudou la, muda aqui.
  address: "Rua Sebastiana Rosa da Rocha, Quadra 03 Lote 06, Setor Ana Alves",
  email: "vidrafe@hotmail.com",
  instagram: "@vidrafe",
  instagramUrl: "https://www.instagram.com/vidrafe",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2273.779682617698!2d-49.696796233557144!3d-16.575188325180473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e12ce174b21ab%3A0xdbb3a1d0319c1a19!2sVIDRAFE%20ACABAMENTOS!5e0!3m2!1spt-BR!2sus!4v1787018669826!5m2!1spt-BR!2sus",
  mapsDirections: "https://maps.app.goo.gl/RLknMNTMubvvJFM79",
  // Coordenadas do pin da ficha no Maps (nao do centro do mapa).
  geo: { latitude: -16.575, longitude: -49.6972045 },
  /*
    Horario: `weekdays` + `weekdayHours` e `weekend` sao o texto exibido (hero,
    Localizacao, rodape); dias e turnos separados pra cada tela quebrar a linha
    no lugar certo. `schema` alimenta o openingHoursSpecification do JSON-LD
    (app/layout.tsx): dois turnos de seg a sex, com o almoco entre eles, e
    sab/dom fechados (00:00-00:00 e como o schema.org marca dia fechado).
  */
  hours: {
    weekdays: "Seg a Sex",
    weekdayHours: "08:00 às 12:00 e 13:00 às 18:00",
    weekend: "Sáb e Dom, fechado",
    schema: [
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "12:00" },
      { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "13:00", closes: "18:00" },
      { days: ["Saturday", "Sunday"], opens: "00:00", closes: "00:00" },
    ],
  },
} as const;

/*
  Imagem Open Graph gerada por scripts/gerar-assets.mjs (npm run assets).
  As dimensoes declaradas batem com o arquivo (bug da v1).
*/
export const ogImage = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: "Vidrafe Acabamentos, vidraçaria e acabamentos em Santa Bárbara de Goiás",
};

/*
  Dois profissionais, mas um destino so: todo botao de WhatsApp vai pro Joel
  Júnior (4453) com waMessages.default, por decisao do cliente (Fase 12, ver
  prd.md secao 3). O numero do Joel fica aqui so como dado da empresa; nao
  e usado em nenhum botao. Nao voltar a dividir por profissional.
*/
export const contacts = {
  junior: {
    name: "Joel Júnior",
    role: "Forros, drywall e acabamentos",
    phone: "5562999924453",
    phoneDisplay: "(62) 9.9992-4453",
  },
  joel: {
    name: "Joel",
    role: "Vidraçaria, esquadrias e correlatos",
    phone: "5562984728056",
    phoneDisplay: "(62) 9.8472-8056",
  },
} as const;

// Mensagem pre-preenchida (obrigatorio, foi falha na v1). Desde a Fase 12 todos
// os botoes usam `default` e o destino e sempre o junior. O rastreamento por
// ponto de contato e feito pelo waContexto (lib/whatsapp.ts), nao pela mensagem.
export const waMessages = {
  default: "Olá! Vi o site da Vidrafe e gostaria de pedir um orçamento.",
} as const;

/*
  Equipe (secao Sobre, components/About.tsx), na ordem Joel -> Joel Júnior.

  PREENCHER COM A VERDADE (nao inventar ano, numero nem historia):
  - `desde`: ano em que comecou, ex. "2004". Vazio = a linha do "desde" some.
  - `bio`: uma ou duas frases reais. Enquanto comecar com "PREENCHER" ou estiver
    vazia, o componente NAO mostra (o texto de lembrete nunca vai pro ar).

  `foto`: /equipe/<slug>.webp, gerada por `npm run equipe` a partir de
  public/equipe/originais/<slug>.jpg|png. Sem a foto, aparece o retrato
  placeholder no mesmo recorte (nunca imagem quebrada).

  `whatsapp`: os DOIS vao pro junior, regra do cliente (Fase 12, ver `contacts`).
  Por isso o CTA do Joel fala do servico ("orcamento de vidracaria") e nao
  promete conversar com ele.
*/
export const equipe = [
  {
    slug: "joel",
    nome: contacts.joel.name,
    papel: "Vidraçaria",
    desde: "",
    bio: "PREENCHER: uma frase real sobre o Joel",
    foto: "/equipe/joel.webp",
    alt: "Retrato do Joel, responsável pela vidraçaria da Vidrafe Acabamentos",
    whatsapp: "junior",
    cta: "Pedir orçamento de vidraçaria",
    contexto: "sobre_joel",
  },
  {
    slug: "joel-junior",
    nome: contacts.junior.name,
    papel: "Forros & Drywall",
    desde: "",
    bio: "PREENCHER: uma frase real sobre o Joel Júnior",
    foto: "/equipe/joel-junior.webp",
    alt: "Retrato do Joel Júnior, responsável por forros e drywall da Vidrafe Acabamentos",
    whatsapp: "junior",
    cta: "Falar com o Júnior no WhatsApp",
    contexto: "sobre_junior",
  },
] as const;

/*
  Numeros da Vidrafe (faixa no Sobre, entre o texto e os dois profissionais).

  PREENCHER COM A VERDADE, nunca estimar: ano, obra ou cidade inventada
  derruba a confianca. `valor` vazio = o item NAO aparece; todos vazios = a
  faixa inteira some. Valor so com digitos ("15") ganha contagem animada no
  scroll; qualquer outro formato ("1.200") aparece direto, sem animar.
*/
export const numeros: { valor: string; rotulo: string; prefixo?: string }[] = [
  { valor: "", prefixo: "+", rotulo: "anos de mercado" },
  { valor: "", rotulo: "obras entregues" },
  { valor: "", rotulo: "cidades atendidas na região" },
];

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Localização", href: "#localizacao" },
] as const;

/*
  Servicos (grade de icones da secao Servicos e destaques do rodape).

  `area` diz QUEM FAZ o servico (Vidracaria = Joel, Forros & Drywall = Joel
  Júnior) e agrupa a grade por frente. O WhatsApp de todos vai pro junior
  (Fase 12); cada frente rastreia pelo proprio contexto (servicos_joel /
  servicos_junior, lib/whatsapp.ts).

  `icon` e um icone Lucide de categoria, mapeado em components/Services.tsx.
  Nao repetir os icones de outras secoes (Diferenciais, galeria, FAQ...).

  Tags e textos vem do que a Vidrafe faz de verdade (lista anterior de servicos
  e FAQ). Nada de servico, material ou prazo que nao foi confirmado.
*/
export type AreaServico = "Vidraçaria" | "Forros & Drywall";

export const areaResponsavel: Record<AreaServico, keyof typeof contacts> = {
  "Vidraçaria": "joel",
  "Forros & Drywall": "junior",
};

export const servicos = [
  {
    slug: "box",
    titulo: "Box para banheiro",
    area: "Vidraçaria",
    resumo: "Box de vidro feito na medida do seu banheiro, de canto, frontal ou em formato especial.",
    tags: ["Canto", "Frontal", "Especiais"],
    icon: "ShowerHead",
  },
  {
    slug: "espelhos",
    titulo: "Espelhos e armário de pia",
    area: "Vidraçaria",
    resumo: "Espelho cortado na medida da parede e armário de pia em vidro, sob medida pro seu cômodo.",
    tags: ["Espelho sob medida", "Armário para pia em vidro"],
    icon: "RectangleVertical",
  },
  {
    slug: "vidros",
    titulo: "Vidros",
    area: "Vidraçaria",
    resumo: "Vidro temperado, comum ou laminado pra box, porta, janela e armário de pia. Na dúvida, a gente explica a diferença.",
    tags: ["Temperado", "Comum", "Laminado"],
    icon: "Square",
  },
  {
    slug: "portas-janelas",
    titulo: "Portas e janelas",
    area: "Vidraçaria",
    resumo: "Portas de vidro pivotantes, de correr ou de abrir, e janelas pra casa e pro comércio.",
    tags: ["Porta pivotante", "De correr", "De abrir", "Janela residencial", "Janela comercial"],
    icon: "DoorOpen",
  },
  {
    slug: "esquadrias",
    titulo: "Esquadrias em alumínio",
    area: "Vidraçaria",
    resumo: "Esquadria de alumínio medida no vão e instalada por quem mediu.",
    tags: [],
    icon: "Frame",
  },
  {
    slug: "policarbonato",
    titulo: "Cobertura em policarbonato",
    area: "Vidraçaria",
    resumo: "Cobertura em policarbonato medida no local e instalada pela gente.",
    tags: [],
    icon: "Umbrella",
  },
  {
    slug: "forro-pvc",
    titulo: "Forro PVC",
    area: "Forros & Drywall",
    resumo: "Forro PVC branco, amadeirado ou cerejeira, com o acabamento conferido antes da gente ir embora.",
    tags: ["Branco", "Amadeirado", "Cerejeira", "Ripado"],
    icon: "PanelTop",
  },
  {
    slug: "drywall",
    titulo: "Drywall",
    area: "Forros & Drywall",
    resumo: "Divisória, sanca e rebaixamento em drywall pra mudar o ambiente sem quebra-quebra.",
    tags: ["Divisórias", "Sancas", "Rebaixamentos"],
    icon: "BrickWall",
  },
  {
    slug: "led",
    titulo: "Luminárias LED",
    area: "Forros & Drywall",
    resumo: "Spots, painéis e fitas de LED instalados junto com o forro ou o drywall.",
    tags: ["Spots", "Painéis", "Fitas"],
    icon: "Lightbulb",
  },
] as const satisfies readonly {
  slug: string;
  titulo: string;
  area: AreaServico;
  resumo: string;
  tags: readonly string[];
  icon: string;
}[];

/*
  Icones Lucide reservados para os diferenciais (fase futura).
  Nao usar em servicos para nunca repetir icone entre secoes.
  MapPin, ShieldCheck, Clock, Hammer
*/

/*
  Galeria: abas por profissional e categorias. Sem filtro "Todos" (regra do briefing).

  COMO ADICIONAR AS FOTOS REAIS:
  1. Jogar os originais (JPEG/PNG) na pasta da categoria: public/galeria/<slug>/.
  2. Rodar `npm run galeria`: converte pra WebP e atualiza data/galeria.gerada.ts.
  3. Commitar os .webp e o manifesto (os originais ficam fora do git).
  As fotos NAO sao listadas aqui: vem do manifesto, pelo `slug` (= nome da pasta).

  `alt` e a descricao da categoria: vira o texto alternativo e a legenda das fotos.
  `color` e a cor do aviso "fotos em breve" enquanto a pasta esta vazia: paleta
  escura e terrosa derivada do navy e do brick, uma cor distinta por categoria.
*/
export type GalleryCategory = {
  label: string;
  slug: string;
  alt: string;
  color: string;
};

export type GalleryTab = {
  label: string;
  owner: keyof typeof contacts;
  categories: GalleryCategory[];
};

export const gallery: Record<"vidracaria" | "forros", GalleryTab> = {
  vidracaria: {
    label: "Joel · Vidraçaria",
    owner: "joel",
    categories: [
      { label: "Vidros", slug: "vidros", alt: "Vidro temperado instalado pela Vidrafe", color: "#2C3D5B" },
      { label: "Espelhos", slug: "espelhos", alt: "Espelho sob medida instalado pela Vidrafe", color: "#4A5363" },
      { label: "Box p/ Banheiro", slug: "box-banheiro", alt: "Box de banheiro em vidro instalado pela Vidrafe", color: "#2F4A4C" },
      { label: "Portas & Janelas", slug: "portas-janelas", alt: "Porta ou janela de vidro instalada pela Vidrafe", color: "#5C2B27" },
      { label: "Esquadrias", slug: "esquadrias", alt: "Esquadria de alumínio instalada pela Vidrafe", color: "#5A5A42" },
    ],
  },
  forros: {
    label: "Joel Júnior · Forros & Drywall",
    owner: "junior",
    categories: [
      { label: "Forro PVC Branco", slug: "forro-pvc-branco", alt: "Forro PVC branco instalado pela Vidrafe", color: "#6B6A63" },
      { label: "Forro Amadeirado", slug: "forro-pvc-amadeirado", alt: "Forro PVC amadeirado instalado pela Vidrafe", color: "#6A4630" },
      { label: "Forro Cerejeira", slug: "forro-pvc-cerejeira", alt: "Forro PVC cerejeira instalado pela Vidrafe", color: "#5E2F2A" },
      { label: "Forro Ripado", slug: "forro-ripado", alt: "Forro ripado instalado pela Vidrafe", color: "#7A5A36" },
      { label: "Divisórias em Drywall", slug: "drywall-divisorias", alt: "Divisória de drywall feita pela Vidrafe", color: "#46423F" },
      { label: "Forro de Drywall", slug: "drywall-forro", alt: "Forro e sanca de drywall feitos pela Vidrafe", color: "#3F4650" },
      { label: "Luminárias LED", slug: "luminarias-led", alt: "Iluminação em LED instalada pela Vidrafe", color: "#6E5F26" },
    ],
  },
};

/*
  Videos da galeria: itens MANUAIS (o npm run galeria so le imagens). Entram
  ANTES das fotos geradas da categoria, como abertura. Os arquivos saem do
  npm run videos (scripts/gerar-videos.mjs) em public/videos/.
  Sem autoplay: tem fala, entao so toca quando a pessoa da play no lightbox.
*/
export type VideoGaleria = {
  tipo: "video";
  mp4: string;
  webm: string;
  poster: string;
  width: number;
  height: number;
  /** Descricao do video: vira o rotulo acessivel e a legenda. */
  alt: string;
  etapa: string;
  /** Duracao mostrada no card, ex. "0:37". */
  duracao: string;
};

export type ItemGaleria = (FotoGaleria & { tipo?: undefined }) | VideoGaleria;

export const videosGaleria: Record<string, VideoGaleria[]> = {
  "forro-pvc-amadeirado": [
    {
      tipo: "video",
      mp4: "/videos/forro-amadeirado-espaco.mp4",
      webm: "/videos/forro-amadeirado-espaco.webm",
      poster: "/videos/forro-amadeirado-espaco-poster.webp",
      width: 720,
      height: 1280,
      alt: "Joel Júnior mostrando a área de lazer antes do forro amadeirado",
      etapa: "O espaço",
      duracao: "0:37",
    },
  ],
};

// Diferenciais. Usam os 4 icones reservados, que nao aparecem em servicos.
export const diferenciais = [
  {
    title: "Daqui de Santa Bárbara",
    text: "A loja fica no Setor Ana Alves e a gente atende a cidade e a região. Precisou de um ajuste depois, é só chamar.",
    icon: "MapPin",
  },
  {
    title: "Feito com capricho",
    text: "Cada peça é medida na sua obra e instalada por quem faz isso todo dia, com acabamento conferido antes de ir embora.",
    icon: "Hammer",
  },
  {
    title: "Conversa direta com o dono",
    text: "Você fala e acerta o preço direto com o Joel ou o Joel Júnior. Não tem vendedor nem atendente no meio do caminho.",
    icon: "ShieldCheck",
  },
  {
    title: "Orçamento pelo WhatsApp",
    text: "Manda a foto ou a medida do lugar pelo WhatsApp e recebe a resposta no mesmo dia.",
    icon: "Clock",
  },
] as const;

/*
  DEPOIMENTOS ILUSTRATIVOS: textos de exemplo, NAO sao de clientes reais.
  Servem so para montar o layout. Para trocar pelos verdadeiros:
  1. Pedir autorizacao do cliente para publicar o texto e o nome.
  2. Substituir `quote` pela fala real, `author` pelo nome
     (ex: "Maria, Residencial Tempo Novo") e `service` pelo servico feito.
  3. Se a avaliacao veio do Google, preencher `source: "Google"`,
     `sourceUrl` com o link da avaliacao e `rating` (1 a 5). O card passa a
     mostrar as estrelas e o link sozinho; sem esses campos, nada aparece.
  4. Quando todos forem reais, mudar `depoimentosIlustrativos` para false:
     o selo "Depoimento ilustrativo" some da secao automaticamente.
*/
export const depoimentosIlustrativos = true;

export type Depoimento = {
  quote: string;
  author: string;
  service: string;
  source: string;
  sourceUrl?: string;
  rating?: number;
};

export const depoimentos: Depoimento[] = [
  {
    quote: "Fizeram o box do banheiro e o espelho da sala. Mediram certinho, instalaram no dia combinado e deixaram tudo limpo.",
    author: "Cliente em Santa Bárbara de Goiás",
    service: "Box de banheiro e espelho",
    source: "Avaliação ilustrativa",
  },
  {
    quote: "Coloquei forro PVC amadeirado na casa toda com o Júnior. Ficou bonito demais e o preço foi o que ele passou no WhatsApp.",
    author: "Cliente da região",
    service: "Forro PVC amadeirado",
    source: "Avaliação ilustrativa",
  },
  {
    quote: "Precisava trocar as janelas da loja rápido. O Joel foi lá no mesmo dia, mediu e resolveu na semana.",
    author: "Comerciante em Santa Bárbara de Goiás",
    service: "Troca de janelas",
    source: "Avaliação ilustrativa",
  },
];

/*
  Perguntas frequentes. Fonte unica: alimenta a secao Faq e o JSON-LD FAQPage
  (app/page.tsx). Nada de prazo fixo, garantia, preco ou forma de pagamento
  que nao foi confirmado com o Joel e o Joel Júnior: nesses casos a resposta
  manda para o WhatsApp.
*/
export const faq = [
  {
    pergunta: "Vocês atendem quais cidades?",
    resposta:
      "A loja fica em Santa Bárbara de Goiás e a gente atende a cidade e a região. Se a sua obra é em outra cidade por perto, manda a localização no WhatsApp que a gente fala se dá pra atender.",
  },
  {
    pergunta: "Como funciona o orçamento?",
    resposta:
      "É só mandar a medida ou uma foto do lugar pelo WhatsApp, dizendo o que você quer fazer. A gente responde no mesmo dia, e pedir orçamento não te compromete com nada.",
  },
  {
    pergunta: "Vocês fazem a medição e a instalação?",
    resposta:
      "Fazemos. A gente vai até a sua casa ou comércio, mede no lugar e depois volta para instalar. Quem mede é quem instala. O dia da visita a gente combina pelo WhatsApp.",
  },
  {
    pergunta: "Trabalham com quais tipos de vidro?",
    resposta:
      "Vidro temperado, comum e laminado, além de espelho sob medida. Serve para box, porta, janela e armário de pia. Se ficou em dúvida sobre qual vidro usar, a gente explica a diferença no WhatsApp.",
  },
  {
    pergunta: "Vocês fazem forro e drywall também?",
    resposta:
      "Fazemos. Forro PVC branco ou amadeirado, drywall para divisória, sanca e rebaixamento, e a instalação das luminárias LED. Essa parte fica com o Joel Júnior, é só chamar ele no WhatsApp.",
  },
  {
    pergunta: "Em quanto tempo fica pronto?",
    resposta:
      "Depende do serviço e do tamanho da obra. Um espelho é diferente de um forro na casa toda. Depois da medição a gente combina o prazo certinho com você pelo WhatsApp.",
  },
] as const;
