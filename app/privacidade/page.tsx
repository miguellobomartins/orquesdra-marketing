import type { Metadata } from "next";
import LegalLayout from "@/components/LegalLayout";

export const metadata: Metadata = {
  title: "Política de Privacidade · Orquesdra",
  description: "Como a Orquesdra recolhe, utiliza e protege os seus dados pessoais, em conformidade com o RGPD.",
  alternates: { canonical: "https://orquesdra.com/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <LegalLayout title="Política de Privacidade" updated="6 de julho de 2026">
      <p>
        Esta Política explica como a Orquesdra (&quot;nós&quot;) recolhe, utiliza e protege os seus
        dados pessoais quando utiliza orquesdra.com e app.orquesdra.com (&quot;Serviço&quot;), em
        conformidade com o Regulamento Geral sobre a Proteção de Dados (RGPD) e a legislação
        portuguesa aplicável.
      </p>

      <h2>1. Responsável pelo tratamento</h2>
      <p>
        O responsável pelo tratamento dos dados é a entidade que opera a Orquesdra. Para exercer
        direitos ou esclarecer dúvidas sobre privacidade, contacte
        {" "}<a href="mailto:info@orquesdra.com">info@orquesdra.com</a>.
      </p>

      <h2>2. Que dados recolhemos</h2>
      <ul>
        <li><strong>Dados de conta:</strong> nome, endereço de email e credenciais de autenticação.</li>
        <li><strong>Dados da organização/marca:</strong> nome da empresa, website, e informação de marca que introduz ou que analisamos a partir do seu site.</li>
        <li><strong>Conteúdos:</strong> textos, imagens e ficheiros que carrega ou gera através do Serviço.</li>
        <li><strong>Dados de pagamento:</strong> processados pela Stripe; recebemos apenas informação limitada (por exemplo, os últimos dígitos do cartão e o estado da subscrição), nunca o número completo do cartão.</li>
        <li><strong>Dados de utilização e técnicos:</strong> registos de acesso, endereço IP, tipo de dispositivo e interações com o Serviço, para segurança e melhoria.</li>
      </ul>

      <h2>3. Finalidades e fundamentos legais</h2>
      <ul>
        <li><strong>Prestar o Serviço</strong> (execução do contrato): criar a conta, gerar e guardar conteúdos, gerir a subscrição.</li>
        <li><strong>Faturação e cumprimento legal</strong> (obrigação legal): emissão de faturas, retenção fiscal.</li>
        <li><strong>Segurança e prevenção de abuso</strong> (interesse legítimo): rate-limiting, deteção de contas fraudulentas, integridade do período experimental.</li>
        <li><strong>Comunicações transacionais</strong> (execução do contrato): verificação de email, avisos sobre a conta e a subscrição.</li>
        <li><strong>Comunicações de marketing</strong> (consentimento): apenas se optar por as receber; pode retirar o consentimento a qualquer momento.</li>
      </ul>

      <h2>4. Subcontratantes e partilha de dados</h2>
      <p>
        Recorremos a prestadores que tratam dados por nossa conta, sob acordos de tratamento de
        dados, nomeadamente: <strong>Stripe</strong> (pagamentos), <strong>Resend</strong> (envio de
        emails transacionais), fornecedores de <strong>inteligência artificial</strong> para geração
        de conteúdo (por exemplo, processamento de instruções e imagens), e o nosso fornecedor de
        <strong> alojamento e infraestrutura</strong>. Não vendemos os seus dados pessoais. Alguns
        destes prestadores podem tratar dados fora do Espaço Económico Europeu, caso em que
        asseguramos garantias adequadas (por exemplo, cláusulas contratuais-tipo).
      </p>

      <h2>5. Conservação</h2>
      <p>
        Conservamos os dados enquanto a conta estiver ativa e pelo período necessário às finalidades
        acima, incluindo obrigações legais (por exemplo, faturação). Após o encerramento da conta,
        eliminamos ou anonimizamos os dados dentro de um prazo razoável, salvo quando a lei exija
        conservação mais longa.
      </p>

      <h2>6. Os seus direitos</h2>
      <p>
        Nos termos do RGPD, tem direito a aceder, retificar, apagar, limitar ou opor-se ao
        tratamento dos seus dados, bem como à portabilidade e à retirada do consentimento a qualquer
        momento (sem afetar tratamentos anteriores). Para exercer estes direitos, contacte
        {" "}<a href="mailto:info@orquesdra.com">info@orquesdra.com</a>. Tem também o direito de
        apresentar reclamação à autoridade de controlo, em Portugal a Comissão Nacional de Proteção
        de Dados (CNPD).
      </p>

      <h2>7. Cookies</h2>
      <p>
        Utilizamos cookies e tecnologias equivalentes estritamente necessários ao funcionamento do
        Serviço (por exemplo, autenticação e segurança). Caso venhamos a utilizar cookies de
        analítica ou marketing, solicitaremos o seu consentimento prévio e disponibilizaremos meios
        para o gerir.
      </p>

      <h2>8. Segurança</h2>
      <p>
        Aplicamos medidas técnicas e organizativas para proteger os seus dados, incluindo cifragem
        em trânsito, controlo de acessos e limitação de tentativas de autenticação. Nenhum sistema é
        totalmente inviolável, mas comprometemo-nos a agir com diligência.
      </p>

      <h2>9. Alterações</h2>
      <p>
        Podemos atualizar esta Política. Alterações materiais serão comunicadas por meios razoáveis.
        A data no topo indica a última atualização.
      </p>

      <h2>10. Contacto</h2>
      <p>
        Questões sobre privacidade: <a href="mailto:info@orquesdra.com">info@orquesdra.com</a>.
      </p>
    </LegalLayout>
  );
}
