import type { Metadata } from "next";
import { Hanken_Grotesk } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import LangProvider from "@/components/LangProvider";
import Loader from "@/components/Loader";

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://orquesdra.com"),
  title: {
    default: "Orquesdra — A tua marca nas redes, pronta a publicar",
    template: "%s | Orquesdra",
  },
  description:
    "Transforma as tuas fotos em posts com a tua marca, de gerar a publicar. A Orquesdra cria posts que parecem mesmo da tua marca.",
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
        <LangProvider>{children}</LangProvider>
        <Loader />
      </body>
    </html>
  );
}
