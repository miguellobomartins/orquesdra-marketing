import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import AppPreview from "@/components/AppPreview";
import Statement from "@/components/Statement";
import Sections from "@/components/Sections";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <SmoothScroll>
      <div className="grain" aria-hidden="true" />
      <SiteNav />
      <main>
        <Hero />
        <AppPreview />
        <Statement />
        <div className="sheet">
          <Sections />
        </div>
      </main>
    </SmoothScroll>
  );
}
