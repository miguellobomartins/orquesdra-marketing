export default function AppPreview() {
  return (
    <section className="panel app">
      <div className="app-panel-inner">
        <div className="appframe">
          <div className="mac">
            <div className="mac-screen">
              <span className="mac-notch" aria-hidden="true" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/app-home.webp" alt="A app Orquesdra: a tua marca, geração de posts e calendário num só sítio" />
            </div>
            <div className="mac-base">
              <span className="mac-groove" aria-hidden="true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
