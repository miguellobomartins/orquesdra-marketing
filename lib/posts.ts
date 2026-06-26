export type Post = { src: string; cap: string; brand: string };

// Imagens editoriais reais (geradas) + marca/legenda placeholder (a trocar por casos reais).
export const POSTS: Post[] = [
  { src: "/images/food1.webp", cap: "Thoughtful ingredients. Beautifully served.", brand: "FOURTH TABLE" },
  { src: "/images/food2.webp", cap: "A menu that changes with the season.", brand: "SAGE & STONE" },
  { src: "/images/skincare.webp", cap: "Radiant skin starts with expert care.", brand: "LUMIÈRE" },
  { src: "/images/coffee.webp", cap: "Good coffee. Better moments.", brand: "NORTHSIDE COFFEE" },
  { src: "/images/fashion.webp", cap: "Timeless pieces, endless ways to wear them.", brand: "ATELIER" },
  { src: "/images/rack.webp", cap: "Curated with care. Chosen for you.", brand: "THREAD + HOMESTORE" },
  { src: "/images/hotel.webp", cap: "Escape the ordinary.", brand: "TERRA HOTELS" },
  { src: "/images/wellness.webp", cap: "Stronger today. Healthier tomorrow.", brand: "SOLSTEAD WELLNESS" },
];

// 4 torres (2 por lado). Índices em POSTS; cada torre é duplicada para loop contínuo.
export const HERO_COLUMNS: number[][] = [
  [0, 3, 5, 7],
  [4, 2, 6, 1],
  [1, 6, 2, 4],
  [7, 5, 3, 0],
];
