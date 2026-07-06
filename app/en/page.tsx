import type { Metadata } from "next";
import LangProvider from "@/components/LangProvider";
import Site from "@/components/Site";

const TITLE = "Orquesdra — Your brand on social, ready to post";
const DESCRIPTION =
  "Turn your photos into on-brand social media posts, from generating to publishing. Orquesdra creates posts that truly look like your brand.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/en",
    languages: { "pt-PT": "/", en: "/en", "x-default": "/" },
  },
  openGraph: {
    type: "website",
    url: "https://orquesdra.com/en",
    siteName: "Orquesdra",
    title: TITLE,
    description: DESCRIPTION,
    locale: "en_US",
    alternateLocale: ["pt_PT"],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// English homepage at "/en" — same UI, server-rendered in English so Google
// can index it as a distinct URL.
export default function HomeEn() {
  return (
    <LangProvider initialLang="en">
      <Site />
    </LangProvider>
  );
}
