import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Termos de Serviço · Orquesdra",
  description: "Termos de Serviço da Orquesdra: condições de utilização, planos, pagamentos e responsabilidades.",
  alternates: { canonical: "https://orquesdra.com/termos" },
};

export default function TermosPage() {
  return (
    <LegalLayout title="Termos de Serviço" updated="6 de julho de 2026">
      <p>
        Estes Termos de Serviço (&quot;Termos&quot;) regulam o acesso e a utilização da Orquesdra
        (&quot;Serviço&quot;), uma plataforma de criação e planeamento de conteúdo assistido por
        inteligência artificial disponível em orquesdra.com e app.orquesdra.com. Ao criar uma
        conta ou utilizar o Serviço, aceita ficar vinculado a estes Termos. Se não concordar,
        não utilize o Serviço.
      </p>

      <h2>1. Quem somos</h2>
      <p>
        O Serviço é operado pela entidade responsável pela Orquesdra (&quot;Orquesdra&quot;,
        &quot;nós&quot;). Para qualquer contacto relativo a estes Termos, escreva para
        {" "}<a href="mailto:info@orquesdra.com">info@orquesdra.com</a>.
      </p>

      <h2>2. Conta e elegibilidade</h2>
      <p>
        Para utilizar o Serviço tem de ter pelo menos 18 anos e capacidade legal para celebrar
        contratos. É responsável por manter a confidencialidade das suas credenciais e por toda a
        atividade realizada na sua conta. Deve fornecer informação verdadeira e mantê-la
        atualizada. Pode encerrar a sua conta a qualquer momento.
      </p>

      <h2>3. Período experimental (trial)</h2>
      <p>
        O Serviço pode ser disponibilizado com um período experimental gratuito, limitado a um
        número máximo de imagens geradas por conta. O período experimental destina-se a avaliação
        genuína do Serviço; a criação de múltiplas contas para contornar esse limite não é
        permitida (ver secção 6). Reservamo-nos o direito de ajustar ou terminar o período
        experimental para novas contas.
      </p>

      <h2>4. Planos, preços e pagamentos</h2>
      <p>
        O acesso pago é disponibilizado por subscrição mensal, em euros, de acordo com o plano
        escolhido. Os pagamentos são processados por um prestador terceiro (Stripe); não
        armazenamos os dados completos do seu cartão. Os preços podem incluir IVA à taxa legal
        aplicável, recolhido no momento do pagamento. Podemos alterar os preços mediante aviso
        prévio razoável; as alterações não afetam o período de faturação já pago.
      </p>

      <h2>5. Conteúdo gerado e propriedade intelectual</h2>
      <p>
        Mantém a titularidade dos conteúdos que carrega e, na medida permitida por lei, dos
        conteúdos gerados através do Serviço a partir das suas instruções. Concede-nos uma licença
        limitada para processar esses conteúdos apenas com o objetivo de prestar o Serviço. É
        responsável por garantir que tem direitos sobre os materiais que carrega (marcas,
        fotografias, logótipos) e por assegurar que a utilização dos conteúdos gerados cumpre a lei
        aplicável. O software, a interface e as marcas da Orquesdra permanecem nossa propriedade.
      </p>

      <h2>6. Utilização aceitável</h2>
      <p>
        Compromete-se a não utilizar o Serviço para fins ilícitos, enganosos ou que violem direitos
        de terceiros; a não gerar conteúdo que infrinja propriedade intelectual, seja difamatório,
        ou viole a privacidade de terceiros; a não tentar contornar limites técnicos, de utilização
        ou anti-abuso; e a não criar múltiplas contas para obter vantagens indevidas dos períodos
        experimentais. Podemos suspender ou encerrar contas que violem estas regras.
      </p>

      <h2>7. Disponibilidade</h2>
      <p>
        Esforçamo-nos por manter o Serviço disponível, mas não garantimos funcionamento
        ininterrupto ou isento de erros. Podemos realizar manutenção, atualizar funcionalidades ou
        descontinuar partes do Serviço. Componentes de geração dependem de fornecedores terceiros
        de IA, cujo desempenho pode variar.
      </p>

      <h2>8. Limitação de responsabilidade</h2>
      <p>
        O Serviço é fornecido &quot;tal como está&quot;. Na medida máxima permitida por lei, não
        respondemos por danos indiretos, incidentais ou lucros cessantes decorrentes da utilização
        do Serviço. Nada nestes Termos exclui responsabilidades que não possam ser legalmente
        excluídas, nomeadamente perante consumidores.
      </p>

      <h2>9. Cessação</h2>
      <p>
        Pode cancelar a subscrição a qualquer momento; o acesso mantém-se até ao fim do período já
        pago (ver a <a href="/reembolsos">Política de Reembolsos</a>). Podemos suspender ou encerrar
        o acesso em caso de violação destes Termos ou de utilização abusiva.
      </p>

      <h2>10. Alterações a estes Termos</h2>
      <p>
        Podemos atualizar estes Termos. Comunicaremos alterações materiais por meios razoáveis. A
        continuação da utilização após a entrada em vigor das alterações constitui aceitação das
        mesmas.
      </p>

      <h2>11. Lei aplicável</h2>
      <p>
        Estes Termos regem-se pela lei portuguesa. Os litígios serão dirimidos pelos tribunais
        competentes em Portugal, sem prejuízo dos direitos que a lei confere aos consumidores.
        Consumidores podem recorrer às entidades de resolução alternativa de litígios de consumo.
      </p>

      <h2>12. Contacto</h2>
      <p>
        Dúvidas sobre estes Termos: <a href="mailto:info@orquesdra.com">info@orquesdra.com</a>.
      </p>
    </LegalLayout>
  );
}
