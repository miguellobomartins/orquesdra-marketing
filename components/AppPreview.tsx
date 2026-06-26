export default function AppPreview() {
  return (
    <section className="panel app">
      <div className="app-panel-inner">
        <div className="appframe-wrap">
          <div className="appframe">
            <div className="appscreen">
              <div className="appbar">
                <span className="dot" />
                <span className="dot" />
                <span className="dot" />
                <span className="url">app.orquesdra.com</span>
              </div>
              <div className="appshell">
                <aside className="apprail">
                  <div className="rail-top">
                    <div className="brandrow"><b />orquesdra</div>
                    <span className="rail-bell" aria-hidden />
                  </div>
                  <div className="rail-brand">
                    <span className="rail-brand-ic" />
                    <span className="rail-brand-name">Velto</span>
                    <span className="rail-chev" />
                  </div>
                  <p className="rail-sec">Criar</p>
                  <div className="approw active"><s />Início</div>
                  <div className="approw"><s />Gerar</div>
                  <div className="approw"><s />Fluxos</div>
                  <div className="approw"><s />Modelos</div>
                  <div className="approw"><s />Ativos</div>
                  <div className="approw"><s />Calendário</div>
                  <p className="rail-sec">Gerir</p>
                  <div className="approw"><s />Marca</div>
                  <div className="approw"><s />Inteligência</div>
                  <div className="approw"><s />Analytics</div>
                  <div className="rail-user">
                    <span className="rail-ava">M</span>
                    <span className="rail-user-meta"><b>Miguel Martins</b><i>Conta</i></span>
                  </div>
                </aside>
                <div className="apphome">
                  <h3 className="apphome-h">Olá de novo, Miguel Martins</h3>
                  <p className="apphome-sub">A gerir: Velto</p>
                  <div className="apphome-cards">
                    <div className="ahcard ahcard-active">
                      <span className="ahcard-ic ic-spark" />
                      <b>Gerar conteúdo</b>
                      <i>Posts e carrosséis com IA</i>
                    </div>
                    <div className="ahcard">
                      <span className="ahcard-ic ic-cal" />
                      <b>Calendário</b>
                      <i>Vê e agenda os teus posts</i>
                    </div>
                    <div className="ahcard">
                      <span className="ahcard-ic ic-img" />
                      <b>A tua marca</b>
                      <i>Identidade, cores e voz</i>
                    </div>
                  </div>
                  <div className="apphome-usage">
                    <span>Uso este mês</span>
                    <b>105 imagens</b>
                    <em>·</em><span>8 marcas</span>
                    <em>·</em><span>2 lugares</span>
                    <span className="ah-badge">Agência</span>
                  </div>
                  <div className="apphome-block">
                    <div className="ah-blockhead">
                      <span>Próximos posts</span>
                      <i>Abrir calendário →</i>
                    </div>
                    <div className="ah-empty">
                      <span className="ah-empty-ic" />
                      <b>Nada agendado</b>
                      <i>Não tens posts nos próximos 14 dias.</i>
                      <span className="ah-empty-btn">Abrir calendário</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
