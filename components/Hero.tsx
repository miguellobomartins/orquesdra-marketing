import HeroGrid from "@/components/HeroGrid";

export default function Hero() {
  return (
    <section className="hero hero-grid">
      <HeroGrid />

      <div className="hero-foot">
        <div className="hero-actions">
          <a className="hero-btn hero-btn-glass magnetic" href="https://app.orquesdra.com">Get Started</a>
          <a className="hero-btn hero-btn-fill" href="#pricing">See Plans</a>
        </div>

        <div className="hero-bl">
          <h1 className="po-h1 hero-bl-h">
            <span className="h1line">
              <span className="word" style={{ ["--d" as string]: ".05s" }}><span>Your</span></span>{" "}
              <span className="word" style={{ ["--d" as string]: ".11s" }}><span>brand</span></span>{" "}
              <span className="word" style={{ ["--d" as string]: ".17s" }}><span>on</span></span>{" "}
              <span className="word" style={{ ["--d" as string]: ".23s" }}><span>social,</span></span>
            </span>
            <span className="h1line">
              <span className="word" style={{ ["--d" as string]: ".29s" }}><span>ready</span></span>{" "}
              <span className="word" style={{ ["--d" as string]: ".35s" }}><span>to</span></span>{" "}
              <span className="word" style={{ ["--d" as string]: ".41s" }}><span>post.</span></span>
            </span>
          </h1>
          <p className="hero-bl-sub">Turn your photos into on-brand posts, from generating to publishing.</p>
        </div>
      </div>
    </section>
  );
}
