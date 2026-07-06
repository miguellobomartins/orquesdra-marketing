import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Reembolsos · Orquesdra",
  description: "Condições de cancelamento e reembolso das subscrições da Orquesdra.",
  alternates: { canonical: "https://orquesdra.com/reembolsos" },
};

export default function ReembolsosPage() {
  return (
    <LegalLayout title="Política de Reembolsos" updated="6 de julho de 2026">
      <p>
        Esta Política descreve as condições de cancelamento e reembolso das subscrições pagas da
        Orquesdra. Complementa os nossos <a href="/termos">Termos de Serviço</a>.
      </p>

      <h2>1. Período experimental gratuito</h2>
      <p>
        O período experimental é gratuito e não implica qualquer pagamento. Só passa a existir
        faturação quando escolhe ativamente um plano pago. Por isso, não há reembolsos associados ao
        período experimental — pode simplesmente não subscrever.
      </p>

      <h2>2. Subscrições mensais</h2>
      <p>
        As subscrições são cobradas de forma recorrente, no início de cada ciclo de faturação
        mensal. Ao subscrever, autoriza a cobrança recorrente até ao cancelamento.
      </p>

      <h2>3. Cancelamento</h2>
      <p>
        Pode cancelar a subscrição a qualquer momento a partir das definições da sua conta. O
        cancelamento tem efeito no fim do ciclo de faturação em curso: mantém o acesso ao plano até
        essa data e não é cobrado o ciclo seguinte. Não fracionamos nem reembolsamos, por regra, os
        dias não utilizados do ciclo já pago.
      </p>

      <h2>4. Direito de livre resolução (consumidores na UE)</h2>
      <p>
        Se for consumidor na União Europeia, dispõe, em regra, de 14 dias para livre resolução de
        contratos de serviços digitais. Ao iniciar a utilização de um serviço digital durante esse
        período, pode ser-lhe solicitado o consentimento para o início imediato da prestação, com
        reconhecimento de que tal pode fazer cessar o direito de livre resolução na medida do
        serviço já prestado. Sempre que aplicável, respeitaremos os direitos que a lei de defesa do
        consumidor lhe confere.
      </p>

      <h2>5. Pedidos de reembolso e situações excecionais</h2>
      <p>
        Analisamos com boa-fé pedidos de reembolso em situações excecionais — por exemplo, cobrança
        duplicada, falha técnica que tenha impedido a utilização do Serviço, ou erro manifesto de
        faturação. Nesses casos, contacte-nos e resolveremos de forma justa.
      </p>

      <h2>6. Como pedir</h2>
      <p>
        Para cancelar, utilize as definições da conta. Para questões de faturação ou pedidos de
        reembolso, contacte <a href="mailto:info@orquesdra.com">info@orquesdra.com</a> com o email da
        conta e a descrição da situação. Os reembolsos aprovados são devolvidos pelo mesmo meio de
        pagamento, através da Stripe.
      </p>
    </LegalLayout>
  );
}
