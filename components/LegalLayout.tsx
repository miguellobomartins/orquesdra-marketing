import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Layout simples e legível para as páginas legais (Termos / Privacidade /
 * Reembolsos). Sem a nav animada nem o motion do resto do site — é conteúdo
 * legal, quer-se sóbrio e rápido. Topo com marca->home + rodapé mínimo.
 *
 * NOTA: o conteúdo destas páginas é um RASCUNHO-BASE e deve ser revisto por um
 * jurista antes do lançamento comercial (a faixa no topo avisa disso).
 */
export default function LegalLayout({ title, updated, draft = true, children }: { title: string; updated?: string; draft?: boolean; children: ReactNode }) {
  return (
    <main style={{ minHeight: "100vh", background: "#fcfcfc", color: "#1f2024" }}>
      <header style={{ maxWidth: 760, margin: "0 auto", padding: "28px 24px 0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <Link href="/" style={{ fontWeight: 700, fontSize: 18, color: "#1f2024", textDecoration: "none", letterSpacing: "-0.01em" }}>Orquesdra</Link>
        <Link href="/" style={{ fontSize: 14, color: "#5d626f", textDecoration: "none" }}>Voltar ao site</Link>
      </header>

      <article style={{ maxWidth: 760, margin: "0 auto", padding: "32px 24px 96px", lineHeight: 1.7, fontSize: 16 }}>
        {draft && (
          <p style={{ background: "#fff7ed", border: "1px solid #fed7aa", color: "#9a3412", borderRadius: 10, padding: "10px 14px", fontSize: 13.5, margin: "0 0 28px" }}>
            Rascunho pendente de revisão jurídica antes do lançamento comercial. Não substitui aconselhamento legal.
          </p>
        )}
        <h1 style={{ fontSize: "clamp(1.8rem, 4vw, 2.4rem)", lineHeight: 1.15, margin: updated ? "0 0 6px" : "0 0 24px", letterSpacing: "-0.02em" }}>{title}</h1>
        {updated && <p style={{ color: "#5d626f", fontSize: 14, margin: "0 0 32px" }}>Última atualização: {updated}</p>}
        <div className="legal-body">{children}</div>
      </article>

      <style>{`
        .legal-body h2 { font-size: 1.15rem; font-weight: 650; letter-spacing: -0.01em; margin: 2.2em 0 0.5em; }
        .legal-body p { margin: 0 0 1.1em; }
        .legal-body ul { margin: 0 0 1.1em; padding-left: 1.25em; }
        .legal-body li { margin: 0 0 0.5em; }
        .legal-body a { color: #1f2024; text-decoration: underline; text-underline-offset: 2px; }
        .legal-body strong { font-weight: 650; }
      `}</style>

      <footer style={{ borderTop: "1px solid #e7e7ec", padding: "24px", textAlign: "center", color: "#5d626f", fontSize: 13.5 }}>
        <span>© 2026 Orquesdra</span>
        {"  ·  "}
        <Link href="/termos" style={{ color: "#5d626f" }}>Termos</Link>
        {"  ·  "}
        <Link href="/privacidade" style={{ color: "#5d626f" }}>Privacidade</Link>
        {"  ·  "}
        <Link href="/reembolsos" style={{ color: "#5d626f" }}>Reembolsos</Link>
      </footer>
    </main>
  );
}
