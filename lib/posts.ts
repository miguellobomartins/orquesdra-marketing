export type Post = { src: string; cap: string; brand: string };

// Posts reais gerados na Orquesdra. ORDEM INTERCALADA POR MARCA de proposito: as
// marcas com varios posts (Orquesdra, Velto, imobiliario) ficam espalhadas para
// nenhuma aparecer agrupada no hero nem na galeria. Estes posts ja trazem texto e
// marca proprios, por isso a galeria mostra-os SEM sobreposicao de legenda; cap/brand
// servem so de metadados (ex. passo "Generate").
export const POSTS: Post[] = [
  { src: "/posts/orq-fotovarios.webp", cap: "Uma foto. Vários posts.", brand: "ORQUESDRA" },
  { src: "/posts/aurva.webp", cap: "24h à temperatura certa.", brand: "AURVA STEEL" },
  { src: "/posts/velto-hero.webp", cap: "O teu tempo, de volta.", brand: "VELTO" },
  { src: "/posts/imo-diavsnoite.webp", cap: "Dia vs. noite.", brand: "CASA NOVA" },
  { src: "/posts/orq-semesforco.webp", cap: "Tudo ao mesmo tempo, sem esforço.", brand: "ORQUESDRA" },
  { src: "/posts/brume.webp", cap: "O primeiro fôlego da manhã.", brand: "BRUME" },
  { src: "/posts/life-cafe.webp", cap: "Momentos que ficam.", brand: "AMARA" },
  { src: "/posts/velto-tempo1.webp", cap: "O tempo a trabalhar a teu favor.", brand: "VELTO" },
  { src: "/posts/orq-ritmo.webp", cap: "A tua marca, sempre no ritmo certo.", brand: "ORQUESDRA" },
  { src: "/posts/nero.webp", cap: "Nero origem.", brand: "NERO" },
  { src: "/posts/imo-espacos.webp", cap: "Espaços limpos vendem mais rápido.", brand: "CASA NOVA" },
  { src: "/posts/velto-tempo2.webp", cap: "O tempo que a automação te devolve.", brand: "VELTO" },
  { src: "/posts/orq-minutos.webp", cap: "Posts prontos em minutos.", brand: "ORQUESDRA" },
  { src: "/posts/luz.webp", cap: "Hidratação e luz, todos os dias.", brand: "LUZ" },
  { src: "/posts/life-fone.webp", cap: "Conteúdo que te representa.", brand: "AMARA" },
  { src: "/posts/velto-tempo3.webp", cap: "O tempo que automatizar te devolve.", brand: "VELTO" },
  { src: "/posts/orq-autentico.webp", cap: "Conteúdo autêntico, todos os dias.", brand: "ORQUESDRA" },
  { src: "/posts/portoes.webp", cap: "-20% no teu portão de correr.", brand: "PORTÃO FÁCIL" },
  { src: "/posts/orq-remocao.webp", cap: "Remoção de objetos com IA.", brand: "ORQUESDRA" },
  { src: "/posts/imo-antes.webp", cap: "Antes e depois.", brand: "CASA NOVA" },
];
