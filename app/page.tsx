import LangProvider from "@/components/LangProvider";
import Site from "@/components/Site";

// Portuguese homepage at "/". Title/description/OG come from the root layout
// (PT defaults); hreflang alternates are declared there too.
export default function Home() {
  return (
    <LangProvider initialLang="pt">
      <Site />
    </LangProvider>
  );
}
