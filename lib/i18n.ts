export type Lang = "pt" | "en";

export type Feature = { step: string; h: string; p: string; list: string[] };
export type Tier = { name: string; price: string; desc: string; feats: string[]; featured: boolean };
export type Qa = { q: string; a: string };

export type Dict = {
  nav: { links: { href: string; label: string }[]; cta: string };
  hero: { headlineLines: string[]; sub: string; ctaPrimary: string; ctaSecondary: string };
  problem: { eyebrow: string; headlinePre: string; headlineEm: string; headlinePost: string; alts: { n: string; h: string; p: string }[] };
  how: { eyebrow: string; h2: string; lead: string; features: Feature[] };
  diff: { eyebrow: string; h2: string; lead: string };
  motion: { eyebrow: string; h2: string; foot: string };
  competitor: { eyebrow: string; h2: string; p: string; list: string[]; mockLabel: string };
  gallery: { eyebrow: string; h2: string; lead: string; quote: string; author: string };
  pricing: { eyebrow: string; h2: string; lead: string; mostPopular: string; perMonth: string; startWith: string; contactSales: string; tiers: Tier[] };
  billing: { h2: string; lead: string; points: string[] };
  faq: { h2: string; items: Qa[] };
  finalCta: { h2: string; ctaPrimary: string; ctaSecondary: string };
  footer: { tagline: string; cols: { title: string; links: { label: string; href: string }[] }[]; legal: { label: string; href: string }[]; copyright: string; madeFor: string };
  mock: { brandKit: string; month: string; scheduled: string; approvedScheduled: string; publishingTo: string; livePublishing: string; onBrandPost: string };
};

const pt: Dict = {
  nav: { links: [{ href: "#how", label: "Produto" }, { href: "#pricing", label: "Preços" }, { href: "#gallery", label: "Galeria" }, { href: "#", label: "Blog" }], cta: "Começar" },
  hero: {
    headlineLines: ["A tua marca nas redes,", "pronta a publicar."],
    sub: "Transforma as tuas fotos em posts com a tua marca, de gerar a publicar.",
    ctaPrimary: "Começar",
    ctaSecondary: "Ver planos",
  },
  problem: {
    eyebrow: "O problema",
    headlinePre: "Bom conteúdo para redes não devia custar ",
    headlineEm: "tanto",
    headlinePost: ".",
    alts: [
      { n: "01", h: "Agências", p: "250 a 1500 EUR por mês, e ainda aprovas trabalho que não soa a ti." },
      { n: "02", h: "Ferramentas de design", p: "Uma tela em branco que não faz ideia de quem é a tua marca. O trabalho fica todo contigo." },
      { n: "03", h: "IA genérica", p: "Posts que podiam ser de qualquer um, porque nunca viram as tuas fotos nem o teu estilo." },
    ],
  },
  how: {
    eyebrow: "Como funciona",
    h2: "A tua marca entra. Sai um mês de posts.",
    lead: "Cinco passos das tuas fotos a posts inconfundivelmente teus, prontos a publicar.",
    features: [
      { step: "Marca", h: "Cola o teu site. Ele aprende a tua marca.", p: "A Orquesdra lê o teu website, tira o teu logótipo, puxa as tuas cores diretamente dele e deteta as tuas fontes. Um perfil de marca que todos os posts seguem.", list: ["Logótipo, cores e fontes, detetados por ti", "Sem manual de marca para carregar"] },
      { step: "Fotos", h: "Adiciona as tuas fotos. São elas as protagonistas.", p: "Põe os teus produtos, o teu espaço, as tuas pessoas. A Orquesdra constrói à volta das tuas fotos reais, por isso cada post é mesmo teu, nunca stock e nunca um modelo inventado.", list: ["Os teus produtos, espaços e pessoas", "Sem stock, sem imagens de IA genéricas"] },
      { step: "Gerar", h: "A tua foto entra. Sai um post acabado, com a tua marca.", p: "A tua foto passa a protagonista e a tua marca passa a sistema: cores, tipografia e composição editorial, num post pronto a publicar, não um modelo para preencher.", list: ["Composições editoriais, no tamanho de cada rede", "Prontas a editar, nunca a começar do zero"] },
      { step: "Planear", h: "Aprova uma vez. Enche o teu mês.", p: "Põe o mês num calendário, aprova cada post e vê as falhas a desaparecer. Rascunho, pendente, aprovado, publicado, tudo numa vista.", list: ["Calendário e fluxo de aprovação incluídos", "Vê o mês inteiro de relance"] },
      { step: "Publicar", h: "Uma aprovação. Todos os canais.", p: "Os posts aprovados saem para as tuas redes na hora marcada, por isso apareces todos os dias sem viver dentro de oito apps diferentes.", list: ["Instagram, Facebook, TikTok, X, LinkedIn e mais", "Agendados, depois publicados por ti"] },
    ],
  },
  diff: {
    eyebrow: "Feito para ti, literalmente",
    h2: "Se não parece a tua marca, não vai para o ar.",
    lead: "Cada post é construído a partir das tuas cores, da tua tipografia e das tuas fotos. Não é um modelo que preenches. Não é stock. Não é um modelo genérico que nunca viu a tua marca.",
  },
  motion: {
    eyebrow: "O resultado, em movimento",
    h2: "Design em movimento",
    foot: "Cada post gerado na Orquesdra, com a tua marca.",
  },
  competitor: {
    eyebrow: "Análise da concorrência",
    h2: "Vê o que eles publicam. Encontra as falhas.",
    p: "A Orquesdra sugere os concorrentes que importam para a tua marca e lê os feeds deles, para veres os temas, o ritmo e as aberturas que continuam a deixar escapar.",
    list: ["Concorrentes encontrados para a tua marca", "Temas, ritmo e falhas, lado a lado"],
    mockLabel: "Atividade de publicação, esta semana",
  },
  gallery: {
    eyebrow: "O resultado",
    h2: "Uma foto. Uma semana de posts.",
    lead: "Posts reais gerados na Orquesdra, cada um com a sua marca.",
    quote: "Passámos de publicar uma vez por semana para todos os dias, e continua a parecer nosso.",
    author: "Ana Reis, fundadora · Atlas Brand",
  },
  pricing: {
    eyebrow: "Preços",
    h2: "Preço por marca. Não por crédito.",
    lead: "Três planos com limites que se leem de relance. Cada plano começa com 10 gerações grátis, sem limite de tempo.",
    mostPopular: "Mais popular",
    perMonth: "/ mês",
    startWith: "Começar no",
    contactSales: "Falar connosco",
    tiers: [
      { name: "Solo", price: "99", desc: "Para a marca a solo", feats: ["1 marca", "2 lugares", "100 imagens / mês", "Publicação e análise da concorrência"], featured: false },
      { name: "Studio", price: "299", desc: "Para equipas pequenas", feats: ["Tudo no Solo, mais:", "5 marcas", "5 lugares", "500 imagens / mês"], featured: true },
      { name: "Agency", price: "899", desc: "Para agências", feats: ["Tudo no Studio, mais:", "25 marcas", "15 lugares", "2.500 imagens / mês"], featured: false },
    ],
  },
  billing: {
    h2: "Sem créditos. Sem surpresas.",
    lead: "Limites mensais claros, que se leem de relance. A tua marca e o teu conteúdo são teus, e podes cancelar quando quiseres.",
    points: ["Sem créditos", "Tudo é teu", "Cancela quando quiseres"],
  },
  faq: {
    h2: "Perguntas, respondidas antes de comprares.",
    items: [
      { q: "O que é a Orquesdra?", a: "A Orquesdra é a plataforma de IA que orquestra a tua marca nas redes sociais: pega na tua marca e numa foto e devolve posts, carrosséis e anúncios prontos a publicar, de gerar a agendar e publicar em Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest e Threads." },
      { q: "Os posts vão mesmo parecer da minha marca?", a: "Sim. A Orquesdra constrói cada post a partir das tuas fotos, nas tuas cores, na tua tipografia e na tua composição, por isso o resultado parece feito para ti, não genérico." },
      { q: "De onde vêm as fotos?", a: "De ti. Adicionas as tuas fotos de produto, espaço ou pessoas e elas continuam a ser o tema de cada post. Sem stock, sem imagens inventadas." },
      { q: "Em que redes posso publicar?", a: "Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest e Threads, através de uma ligação de publicação que associas à tua conta." },
      { q: "Preciso de saber design?", a: "Não. Adicionas uma marca e umas fotos, a Orquesdra constrói os posts, e editas só o que quiseres antes de aprovar." },
      { q: "Em que é diferente do Canva ou do Buffer?", a: "As ferramentas de design dão-te uma tela em branco e os agendadores só põem posts na fila. A Orquesdra gera o post na tua marca e leva-o até à publicação, num só sítio." },
      { q: "As minhas fotos e a minha marca são minhas?", a: "Sempre. As tuas fotos, a tua marca e o teu conteúdo continuam teus, em qualquer plano, e podes cancelar quando quiseres." },
    ],
  },
  finalCta: { h2: "Aparece todos os dias, com a tua cara.", ctaPrimary: "Começar", ctaSecondary: "Ver planos" },
  footer: {
    tagline: "Transforma as tuas fotos em posts com a tua marca, de gerar a publicar.",
    cols: [
      { title: "Produto", links: [{ label: "Como funciona", href: "#how" }, { label: "Exemplos", href: "#gallery" }, { label: "Preços", href: "#pricing" }, { label: "Começar", href: "https://app.orquesdra.com/signup" }] },
      { title: "Comparar", links: [{ label: "vs Canva", href: "#" }, { label: "vs Buffer", href: "#" }, { label: "vs Later", href: "#" }] },
      { title: "Empresa", links: [{ label: "Sobre", href: "#" }, { label: "Blog", href: "#" }, { label: "Contacto", href: "mailto:info@orquesdra.com" }] },
      { title: "Social", links: [{ label: "Instagram", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "TikTok", href: "#" }, { label: "X", href: "#" }] },
    ],
    legal: [{ label: "Privacidade", href: "/privacidade" }, { label: "Termos", href: "/termos" }, { label: "Reembolsos", href: "/reembolsos" }],
    copyright: "© 2026 Orquesdra",
    madeFor: "Feito para marcas em todo o lado",
  },
  mock: { brandKit: "Kit de marca", month: "Junho", scheduled: "12 agendados", approvedScheduled: "Aprovado e agendado", publishingTo: "A publicar em", livePublishing: "Ao vivo · a publicar em 8 redes", onBrandPost: "Post pronto" },
};

const en: Dict = {
  nav: { links: [{ href: "#how", label: "Product" }, { href: "#pricing", label: "Pricing" }, { href: "#gallery", label: "Gallery" }, { href: "#", label: "Blog" }], cta: "Get started" },
  hero: {
    headlineLines: ["Your brand on social,", "ready to post."],
    sub: "Turn your photos into on-brand posts, from generating to publishing.",
    ctaPrimary: "Get started",
    ctaSecondary: "See plans",
  },
  problem: {
    eyebrow: "The problem",
    headlinePre: "Good content for social shouldn’t cost ",
    headlineEm: "this much",
    headlinePost: ".",
    alts: [
      { n: "01", h: "Agencies", p: "250 to 1500 EUR a month, and you still approve work that doesn’t sound like you." },
      { n: "02", h: "Design tools", p: "A blank canvas that has no idea who your brand is. The work stays on your plate." },
      { n: "03", h: "Generic AI", p: "Posts that could belong to anyone, because it never saw your photos or your style." },
    ],
  },
  how: {
    eyebrow: "How it works",
    h2: "Your brand in. A month of posts out.",
    lead: "Five steps from your photos to posts that are unmistakably yours, ready to publish.",
    features: [
      { step: "Brand", h: "Paste your site. It learns your brand.", p: "Orquesdra reads your website, lifts your logo, pulls your colors straight from it and detects your fonts. One brand profile every post then follows.", list: ["Logo, colors and fonts, detected for you", "No brand guidelines to upload"] },
      { step: "Photos", h: "Add your photos. They stay the star.", p: "Drop in your products, your space, your people. Orquesdra builds around your real photos, so every post is genuinely yours, never stock and never an invented model.", list: ["Your products, spaces and people", "No stock, no generic AI imagery"] },
      { step: "Generate", h: "Your photo goes in. A finished, on-brand post comes out.", p: "Your photo becomes the hero and your brand becomes the system: colors, type and editorial layout, composed into a post that is ready to publish, not a template to fill in.", list: ["Editorial layouts, sized for every network", "Ready to edit, never starting from blank"] },
      { step: "Plan", h: "Approve once. Fill your month.", p: "Lay the month out on a calendar, approve each post, and watch the gaps disappear. Draft, pending, approved, published, all in one view.", list: ["Calendar and approval flow built in", "See the whole month at a glance"] },
      { step: "Publish", h: "One approval. Every channel.", p: "Approved posts go out to your networks on schedule, so you show up every day without living inside eight different apps.", list: ["Instagram, Facebook, TikTok, X, LinkedIn and more", "Scheduled, then published for you"] },
    ],
  },
  diff: {
    eyebrow: "Made for you, literally",
    h2: "If it doesn’t look like your brand, it doesn’t ship.",
    lead: "Every post is built from your colors, your type and your photos. Not a template you fill in. Not stock. Not a generic model that never saw your brand.",
  },
  motion: {
    eyebrow: "The output, in motion",
    h2: "Design in motion",
    foot: "Every post generated in Orquesdra, with your brand.",
  },
  competitor: {
    eyebrow: "Competitor insights",
    h2: "See what they post. Find the gaps.",
    p: "Orquesdra suggests the competitors that matter for your brand and reads their feeds, so you can spot the themes, the cadence and the openings they keep missing.",
    list: ["Competitors found for your brand", "Themes, cadence and gaps, side by side"],
    mockLabel: "Posting activity, this week",
  },
  gallery: {
    eyebrow: "The result",
    h2: "One photo. A week of posts.",
    lead: "Real posts generated in Orquesdra, each one carrying its own brand.",
    quote: "We went from posting once a week to every day, and it still looks like us.",
    author: "Ana Reis, owner · Atlas Brand",
  },
  pricing: {
    eyebrow: "Pricing",
    h2: "Priced per brand. Not per credit.",
    lead: "Three plans with limits you can read at a glance. Every plan starts with 10 free generations, no time limit.",
    mostPopular: "Most popular",
    perMonth: "/ month",
    startWith: "Start with",
    contactSales: "Talk to us",
    tiers: [
      { name: "Solo", price: "99", desc: "For the solo brand", feats: ["1 brand", "2 seats", "100 images / month", "Publishing and competitor insights"], featured: false },
      { name: "Studio", price: "299", desc: "For small teams", feats: ["Everything in Solo, plus:", "5 brands", "5 seats", "500 images / month"], featured: true },
      { name: "Agency", price: "899", desc: "For agencies", feats: ["Everything in Studio, plus:", "25 brands", "15 seats", "2,500 images / month"], featured: false },
    ],
  },
  billing: {
    h2: "No credits. No surprises.",
    lead: "Clear monthly limits you can read at a glance. Your brand and your content stay yours, and you can cancel anytime.",
    points: ["No credits", "You own everything", "Cancel anytime"],
  },
  faq: {
    h2: "Questions, answered before you buy.",
    items: [
      { q: "What is Orquesdra?", a: "Orquesdra is the AI platform that orchestrates your brand on social: it takes your brand and one photo and returns finished posts, carousels and ads, from generating to scheduling and publishing across Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest and Threads." },
      { q: "Will the posts really look like my brand?", a: "Yes. Orquesdra builds each post from your photos, in your colors, your type and your layout, so the output looks made for you, not generic." },
      { q: "Where do the photos come from?", a: "From you. You add your own product, space or people photos and they stay the subject of every post. No stock, no invented imagery." },
      { q: "Which networks can I publish to?", a: "Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest and Threads, through a publishing connection you link to your account." },
      { q: "Do I need design skills?", a: "No. You add a brand and a few photos, Orquesdra builds the posts, and you edit only what you want before approving." },
      { q: "How is this different from Canva or Buffer?", a: "Design tools give you a blank canvas and schedulers just queue posts. Orquesdra generates the post in your brand and carries it all the way to publishing, in one place." },
      { q: "Are my photos and brand mine?", a: "Always. Your photos, your brand and your content stay yours, on every plan, and you can cancel anytime." },
    ],
  },
  finalCta: { h2: "Show up every day, looking exactly like you.", ctaPrimary: "Get started", ctaSecondary: "See plans" },
  footer: {
    tagline: "Turn your photos into on-brand posts, from generating to publishing.",
    cols: [
      { title: "Product", links: [{ label: "How it works", href: "#how" }, { label: "Examples", href: "#gallery" }, { label: "Pricing", href: "#pricing" }, { label: "Get started", href: "https://app.orquesdra.com/signup" }] },
      { title: "Compare", links: [{ label: "vs Canva", href: "#" }, { label: "vs Buffer", href: "#" }, { label: "vs Later", href: "#" }] },
      { title: "Company", links: [{ label: "About", href: "#" }, { label: "Blog", href: "#" }, { label: "Contact", href: "mailto:info@orquesdra.com" }] },
      { title: "Social", links: [{ label: "Instagram", href: "#" }, { label: "LinkedIn", href: "#" }, { label: "TikTok", href: "#" }, { label: "X", href: "#" }] },
    ],
    legal: [{ label: "Privacy", href: "/privacidade" }, { label: "Terms", href: "/termos" }, { label: "Refunds", href: "/reembolsos" }],
    copyright: "© 2026 Orquesdra",
    madeFor: "Made for brands everywhere",
  },
  mock: { brandKit: "Brand kit", month: "June", scheduled: "12 scheduled", approvedScheduled: "Approved and scheduled", publishingTo: "Publishing to", livePublishing: "Live · publishing to 8 networks", onBrandPost: "On-brand post" },
};

export const STRINGS: Record<Lang, Dict> = { pt, en };
