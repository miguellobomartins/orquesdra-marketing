// JSON-LD structured data — for Google rich results and AI answer engines (GEO).
// Static, controlled content rendered server-side as application/ld+json.

const SITE = "https://orquesdra.com";
const ORG = `${SITE}/#organization`;

const graph = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": ORG,
      name: "Orquesdra",
      alternateName: "Orquesdra AI",
      url: SITE,
      logo: `${SITE}/icon.svg`,
      description:
        "A Orquesdra é uma plataforma de IA que transforma a tua marca e uma foto em posts, carrosséis e anúncios prontos a publicar — de gerar a agendar e publicar em Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest e Threads.",
      foundingDate: "2026",
      email: "info@orquesdra.com",
      sameAs: [
        "https://www.instagram.com/orquesdra",
        "https://www.facebook.com/orquesdra",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE}/#website`,
      url: SITE,
      name: "Orquesdra",
      inLanguage: "pt-PT",
      publisher: { "@id": ORG },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${SITE}/#app`,
      name: "Orquesdra",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: SITE,
      inLanguage: "pt-PT",
      description:
        "Estúdio de marketing com IA que transforma a tua marca e uma foto em posts, carrosséis e anúncios prontos a publicar — de gerar a agendar e publicar, num só sítio.",
      offers: [
        {
          "@type": "Offer",
          name: "Solo",
          description: "1 marca, 2 lugares, 100 imagens por mês.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "99",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Studio",
          description: "5 marcas, 5 lugares, 500 imagens por mês.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "299",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
        },
        {
          "@type": "Offer",
          name: "Agency",
          description: "25 marcas, 15 lugares, 2.500 imagens por mês.",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: "899",
            priceCurrency: "EUR",
            unitText: "MONTH",
          },
        },
      ],
      publisher: { "@id": ORG },
    },
    {
      "@type": "FAQPage",
      "@id": `${SITE}/#faq`,
      inLanguage: "pt-PT",
      mainEntity: [
        {
          "@type": "Question",
          name: "O que é a Orquesdra?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A Orquesdra é a plataforma de IA que orquestra a tua marca nas redes sociais: pega na tua marca e numa foto e devolve posts, carrosséis e anúncios prontos a publicar, de gerar a agendar e publicar em Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest e Threads.",
          },
        },
        {
          "@type": "Question",
          name: "Os posts vão mesmo parecer da minha marca?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sim. A Orquesdra constrói cada post a partir das tuas fotos, nas tuas cores, na tua tipografia e na tua composição, por isso o resultado parece feito para ti, não genérico.",
          },
        },
        {
          "@type": "Question",
          name: "De onde vêm as fotos?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "De ti. Adicionas as tuas fotos de produto, espaço ou pessoas e elas continuam a ser o tema de cada post. Sem stock, sem imagens inventadas.",
          },
        },
        {
          "@type": "Question",
          name: "Em que redes posso publicar?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Instagram, Facebook, TikTok, X, LinkedIn, YouTube, Pinterest e Threads, através de uma ligação de publicação que associas à tua conta.",
          },
        },
        {
          "@type": "Question",
          name: "Preciso de saber design?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Não. Adicionas uma marca e umas fotos, a Orquesdra constrói os posts, e editas só o que quiseres antes de aprovar.",
          },
        },
        {
          "@type": "Question",
          name: "Em que é diferente do Canva ou do Buffer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "As ferramentas de design dão-te uma tela em branco e os agendadores só põem posts na fila. A Orquesdra gera o post na tua marca e leva-o até à publicação, num só sítio.",
          },
        },
        {
          "@type": "Question",
          name: "As minhas fotos e a minha marca são minhas?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Sempre. As tuas fotos, a tua marca e o teu conteúdo continuam teus, em qualquer plano, e podes cancelar quando quiseres.",
          },
        },
      ],
    },
  ],
};

export default function StructuredData() {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
    >
      {JSON.stringify(graph)}
    </script>
  );
}
