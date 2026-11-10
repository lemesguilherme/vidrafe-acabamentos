/*
  Fonte unica de verdade dos dados do site (ver prd.md).
  Qualquer numero, servico ou categoria usado em mais de um lugar vive aqui,
  nunca espalhado pelos componentes.
*/

export const company = {
  name: "Vidrafe Acabamentos",
  shortName: "Vidrafe",
  city: "Santa Bárbara de Goiás",
  state: "GO",
  cep: "75398-000",
  address: "Av. Castelo Branco, Qd. 01 - Lt. 8, Residencial Tempo Novo",
  email: "vidrafe@hotmail.com",
  instagram: "@vidrafe",
  instagramUrl: "https://www.instagram.com/vidrafe",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2273.779682617698!2d-49.696796233557144!3d-16.575188325180473!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935e12ce174b21ab%3A0xdbb3a1d0319c1a19!2sVIDRAFE%20ACABAMENTOS!5e0!3m2!1spt-BR!2sus!4v1787018669826!5m2!1spt-BR!2sus",
  mapsDirections: "https://maps.app.goo.gl/RLknMNTMubvvJFM79",
  geo: { latitude: -16.575188, longitude: -49.696796 },
  hours: {
    weekdays: "Seg a Sex, 08:00 às 18:00",
    saturday: "Sáb, 08:00 às 12:00",
  },
} as const;

/*
  Dois profissionais, dois numeros. O destino de cada CTA depende do contexto —
  ver tabela de roteamento no prd.md. Padrao do site = Joel Júnior.
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

// Mensagens pre-preenchidas por contexto (obrigatorio — foi falha na v1).
export const waMessages = {
  default: "Olá! Vi o site da Vidrafe e gostaria de pedir um orçamento.",
  vidracaria:
    "Olá Joel! Vi o site da Vidrafe e quero um orçamento de vidraçaria.",
  forros:
    "Olá! Vi o site da Vidrafe e quero um orçamento de forro ou drywall.",
} as const;

export const navLinks = [
  { label: "Início", href: "#inicio" },
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Galeria", href: "#galeria" },
  { label: "Localização", href: "#localizacao" },
] as const;

// Servicos por profissional (ver prd.md).
export const services = {
  vidracaria: {
    title: "Vidraçaria & Esquadrias",
    owner: "joel" as const,
    items: [
      { label: "Vidros", detail: "temperados, comuns e laminados", icon: "Square" },
      { label: "Espelhos", detail: "sob medida", icon: "RectangleVertical" },
      { label: "Portas", detail: "pivotantes, de correr e de abrir", icon: "DoorOpen" },
      { label: "Janelas", detail: "residenciais e comerciais", icon: "AppWindow" },
      { label: "Box para banheiro", detail: "canto, frontal e especiais", icon: "ShowerHead" },
      { label: "Armário para pia", detail: "em vidro, sob medida", icon: "Container" },
      { label: "Esquadrias em alumínio", detail: "", icon: "Frame" },
      { label: "Cobertura em policarbonato", detail: "", icon: "Umbrella" },
    ],
  },
  forros: {
    title: "Forros & Drywall",
    owner: "junior" as const,
    items: [
      { label: "Forro PVC", detail: "branco e amadeirado", icon: "PanelTop" },
      { label: "Drywall", detail: "divisórias, sancas e rebaixamentos", icon: "BrickWall" },
      { label: "Luminárias LED", detail: "spots, painéis e fitas", icon: "Lightbulb" },
      { label: "Acabamentos em geral", detail: "", icon: "PaintRoller" },
    ],
  },
} as const;

/*
  Icones Lucide reservados para os diferenciais (fase futura).
  Nao usar em servicos para nunca repetir icone entre secoes.
  MapPin, ShieldCheck, Clock, Hammer
*/

// Abas e categorias da galeria. Sem filtro "Todos" (regra do briefing).
export const gallery = {
  vidracaria: {
    label: "Joel · Vidraçaria",
    owner: "joel" as const,
    categories: [
      "Vidros",
      "Espelhos",
      "Box p/ Banheiro",
      "Portas & Janelas",
      "Esquadrias",
    ],
  },
  forros: {
    label: "Joel Júnior · Forros & Drywall",
    owner: "junior" as const,
    categories: [
      "Forro PVC Branco",
      "Forro Amadeirado",
      "Drywall",
      "Luminárias LED",
    ],
  },
} as const;
