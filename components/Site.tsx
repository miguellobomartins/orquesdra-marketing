import SiteNav from "@/components/SiteNav";
import IntroStage from "@/components/IntroStage";
import Statement from "@/components/Statement";
import Sections from "@/components/Sections";
import SmoothScroll from "@/components/SmoothScroll";

/** The full marketing page body, shared by the PT (/) and EN (/en) routes.
 *  Language comes from the surrounding <LangProvider initialLang=…>. */
export default function Site() {
  return (
    <SmoothScroll>
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main>
        <IntroStage />
        <Statement />
        <div className="sheet">
          <Sections />
        </div>
      </main>
    </SmoothScroll>
  );
}
