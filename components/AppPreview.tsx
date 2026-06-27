export default function AppPreview() {
  return (
    <section className="panel app">
      <div className="app-panel-inner">
        <div className="appframe">
          <div className="mac">
            <div className="mac-screen">
              <div className="mac-inner">
                <div className="mac-chrome">
                  <span className="mac-dot r" />
                  <span className="mac-dot y" />
                  <span className="mac-dot g" />
                  <span className="mac-url">app.orquesdra.com</span>
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/app-home.webp" alt="A app Orquesdra: a tua marca, geração de posts e calendário num só sítio" />
              </div>
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
