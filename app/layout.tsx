import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LangProvider from "@/components/LangProvider";
import Loader from "@/components/Loader";
import StructuredData from "@/components/StructuredData";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const TITLE = "Orquesdra — A tua marca nas redes, pronta a publicar";
const DESCRIPTION =
  "Transforma as tuas fotos em posts com a tua marca, de gerar a publicar. A Orquesdra cria posts que parecem mesmo da tua marca.";

export const metadata: Metadata = {
  metadataBase: new URL("https://orquesdra.com"),
  title: {
    default: TITLE,
    template: "%s | Orquesdra",
  },
  description: DESCRIPTION,
  applicationName: "Orquesdra",
  keywords: [
    "Orquesdra",
    "geração de conteúdo com IA",
    "posts para redes sociais",
    "conteúdo de marca",
    "marketing de redes sociais",
    "criar posts Instagram",
    "carrosséis",
    "agendamento de posts",
    "publicação em redes sociais",
    "alternativa ao Canva",
    "alternativa ao Buffer",
    "IA para marcas",
  ],
  authors: [{ name: "Orquesdra", url: "https://orquesdra.com" }],
  creator: "Orquesdra",
  publisher: "Orquesdra",
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "pt-PT": "/",
      "en": "/",
    },
  },
  openGraph: {
    type: "website",
    url: "https://orquesdra.com",
    siteName: "Orquesdra",
    title: TITLE,
    description: DESCRIPTION,
    locale: "pt_PT",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b0c" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt" suppressHydrationWarning className={`${hanken.variable} h-full`}>
      <body className="min-h-full">
        <Script id="theme-init" strategy="beforeInteractive">
          {`(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t);}}catch(e){}})();`}
        </Script>
        <StructuredData />
        <LangProvider>{children}</LangProvider>
        <Loader />
      </body>
    </html>
  );
}
