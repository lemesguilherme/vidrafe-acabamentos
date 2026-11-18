/*
  ARQUIVO GERADO por scripts/gerar-galeria.mjs (npm run galeria). Nao editar a mao:
  as fotos vem das pastas de public/galeria/<slug>/.
*/
export type FotoGaleria = {
  src: string;
  width: number;
  height: number;
  etapa?: "Antes" | "Durante" | "Depois";
};

export const fotosGaleria: Record<string, FotoGaleria[]> = {
  "box-banheiro": [],
  "drywall-divisorias": [],
  "drywall-forro": [],
  "espelhos": [],
  "esquadrias": [],
  "forro-pvc-amadeirado": [
    {
      "src": "/galeria/forro-pvc-amadeirado/forro-amadeirado-01.webp",
      "width": 1200,
      "height": 1600
    },
    {
      "src": "/galeria/forro-pvc-amadeirado/forro-amadeirado-02.webp",
      "width": 1200,
      "height": 1600
    },
    {
      "src": "/galeria/forro-pvc-amadeirado/forro-amadeirado-03.webp",
      "width": 1200,
      "height": 1600
    }
  ],
  "forro-pvc-branco": [
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-01-antes.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Antes"
    },
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-02-antes.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Antes"
    },
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-03-andamento.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Durante"
    },
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-04-andamento.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Durante"
    },
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-05-depois.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Depois"
    },
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-06-depois.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Depois"
    },
    {
      "src": "/galeria/forro-pvc-branco/forro-branco-07-depois.webp",
      "width": 1200,
      "height": 1600,
      "etapa": "Depois"
    }
  ],
  "forro-pvc-cerejeira": [],
  "luminarias-led": [],
  "portas-janelas": [],
  "vidros": []
};
