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
                  <div className="brandrow"><b />Orquesdra</div>
                  <div className="approw"><s />Home</div>
                  <div className="approw active"><s />Brand</div>
                  <div className="approw"><s />Generate</div>
                  <div className="approw"><s />Calendar</div>
                  <div className="approw"><s />Intelligence</div>
                </aside>
                <div className="appcanvas">
                  <div className="appnode" style={{ left: 44, top: 70, width: 158 }}>
                    <div style={{ aspectRatio: "1/1", borderRadius: 10, background: "#efe7dd", marginBottom: 9 }} />
                    <span className="lab">Photo</span>
                  </div>
                  <div className="appnode" style={{ left: 44, top: 286, width: 158 }}>
                    <div style={{ display: "flex", gap: 6, marginBottom: 9 }}>
                      <span style={{ width: 21, height: 21, borderRadius: "50%", background: "#5b5bd6" }} />
                      <span style={{ width: 21, height: 21, borderRadius: "50%", background: "#1f2024" }} />
                      <span style={{ width: 21, height: 21, borderRadius: "50%", background: "#e7ded4" }} />
                    </div>
                    <span className="lab">Brand</span>
                  </div>
                  <div className="appnode gen" style={{ left: 300, top: 190, width: 156 }}>
                    <span className="lab">Generate</span>
                    <div style={{ height: 8, borderRadius: 4, background: "rgba(255,255,255,.3)", marginTop: 10, overflow: "hidden" }}>
                      <div style={{ width: "72%", height: "100%", background: "#fff", borderRadius: 4 }} />
                    </div>
                  </div>
                  <div className="appout" style={{ right: 60, top: 88, width: 300, height: 376 }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="/images/fashion.webp" alt="On-brand post generated in Orquesdra" />
                  </div>
                  <div className="appgen-btn" style={{ fontSize: 15, padding: "13px 22px" }}>Generate</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
