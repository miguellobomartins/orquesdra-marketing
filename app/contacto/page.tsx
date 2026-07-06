import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Contacto · Orquesdra",
  description: "Fala com a equipa da Orquesdra: suporte, questões comerciais e parcerias.",
  alternates: { canonical: "https://orquesdra.com/contacto" },
};

export default function ContactoPage() {
  return (
    <LegalLayout title="Fala connosco" draft={false}>
      <p>
        Tens uma dúvida, precisas de ajuda ou queres falar sobre o plano certo para a tua marca?
        Estamos a um email de distância e respondemos o mais rápido que conseguimos, normalmente no
        mesmo dia útil.
      </p>

      <h2>Email</h2>
      <p>
        Para suporte, questões comerciais ou parcerias, escreve para{" "}
        <a href="mailto:info@orquesdra.com">info@orquesdra.com</a>.
      </p>

      <h2>Plano Agency</h2>
      <p>
        Para agências e equipas maiores, tratamos de tudo contigo diretamente. Diz-nos o que precisas
        em <a href="mailto:info@orquesdra.com?subject=Plano%20Agency">info@orquesdra.com</a> e
        preparamos uma proposta à tua medida.
      </p>

      <h2>Já és cliente?</h2>
      <p>
        Entra na tua conta em <a href="https://app.orquesdra.com">app.orquesdra.com</a> e, se precisares,
        escreve-nos com o email da conta para resolvermos mais depressa.
      </p>
    </LegalLayout>
  );
}
