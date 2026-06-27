import SiteNav from "@/components/SiteNav";
import IntroStage from "@/components/IntroStage";
import Statement from "@/components/Statement";
import Sections from "@/components/Sections";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
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
