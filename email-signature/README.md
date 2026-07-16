# Assinatura de email · Orquesdra

Sistema visual da app (off-white editorial, acento iris). Duas formas de usar.

## 1. Estúdio de assinatura (recomendado)
Página partilhável em **`orquesdra.com/assinatura`**. Cada pessoa preenche os dados, vê a
assinatura montar-se ao vivo (com o símbolo animado) e clica **Copiar assinatura**, pronta
para colar no email.

Inclui: Nome, Cargo, Email, Telefone e **redes sociais por escolha**: chips de LinkedIn,
Instagram, X, TikTok, YouTube e Facebook. Ativa as que quiseres, escreve o @ (ou URL) e a
assinatura mostra só o ícone da rede, com link (o @ serve para construir o URL). Validação ao vivo, guarda os dados no
browser (localStorage), botões para copiar, copiar em texto, ou descarregar `.html`.

Fonte: `public/assinatura/index.html`. É HTML autónomo (sem dependência do build do Next);
o Vercel serve-o no URL limpo `/assinatura`. Para o pôr no menu do site, basta um link.

## 2. Template manual
`orquesdra-signature.html`: tabela HTML com placeholders, para preencher à mão:
`{{NOME}}`, `{{CARGO}}`, `{{EMAIL}}`, `{{TELEFONE}}`, `{{LINKEDIN_URL}}`, `{{INSTAGRAM_URL}}`. `orquesdra.com` e o símbolo são fixos. Para mais
redes (X, TikTok, YouTube, Facebook), usa o Estúdio.

## Imagem do símbolo
- `public/brand/orquesdra-mark.gif`: **animado** ("orquestração": os nós acendem em
  sequência, loop calmo). Default da assinatura. Transparente, por isso fica bem em fundo
  claro e escuro. Funciona em Apple Mail, Gmail web e iOS; no Outlook desktop mostra o
  1.º frame (degrada bem).
- `public/brand/orquesdra-mark.png`: versão **estática** transparente. Para máxima
  compatibilidade, trocar no `<img src>` de `.gif` para `.png`.

Ícones das redes em `public/brand/icons/` (linkedin, instagram, x, tiktok, youtube, facebook),
PNGs iris transparentes usados pela assinatura de email.

URL público (depois do deploy): `https://orquesdra.com/brand/orquesdra-mark.gif`.

## Instalar no cliente de email
- **Gmail**: Definições → Ver todas as definições → Geral → Assinatura → criar nova → colar.
- **Apple Mail**: Mail → Definições → Assinaturas → colar; desligar "Usar sempre a fonte da minha mensagem".
- **Outlook**: Ficheiro → Opções → Mail → Assinaturas → colar.

> A imagem do símbolo só aparece depois do site estar publicado (o `src` aponta para `orquesdra.com`).

## Robustez
Tabela com estilos inline, `mso-table-lspace/rspace` e `mso-line-height-rule:exactly` para o
Outlook, fonte de sistema (`-apple-system`/Segoe UI) que não depende de web fonts, símbolo em
imagem transparente (sem caixa branca no modo escuro). Zero travessões em todo o conteúdo.
