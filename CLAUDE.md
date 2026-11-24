# CLAUDE.md — Site DCL Aero Travel

Contexto para o Claude Code. Reconstruído em 24/11/2026, depois que o histórico da sessão anterior se perdeu na troca de máquina. **Este arquivo fica na raiz do repositório e é versionado**, para o contexto não se perder de novo.

- Repositório: https://github.com/davialexandreh/dcl-aero-travel
- Prévia: https://davialexandreh.github.io/dcl-aero-travel/
- Responsável: Davi Alexandre da Silva (dev). Produto e comercial são alinhados com o Claude no Cowork.

## 1. Cliente

- **DCL Aero Travel**, agência de viagens pequena. Dono: David Campos Luiz. Site atual: dclaerotravel.com.br (WordPress, a substituir).
- **Serviços (desde 24/11/2026):** passagens aéreas, pacotes, aluguel de carros, personalização de roteiros, seguro viagem e cruzeiros (portões A1–A6). A mentoria de viagens (treinamento ou gestão de milhas) saiu do site a pedido do cliente. O atendimento a empresas (B2B recorrente) é prioridade comercial.
- **Como vende:** compra bloqueios aéreos e pacotes de consolidadoras, divulga no grupo de WhatsApp e no Instagram (@dclaero_travel) e fecha a venda pelo WhatsApp.
- **CRM:** Volly. Não tem API pública nem webhook. Os leads entram pelo WhatsApp conectado ao Volly.

### Regras não negociáveis

1. **Atendimento humano.** Nada de venda automática no site. Todo CTA leva ao WhatsApp **(11) 94715-5818** (`wa.me/5511947155818`).
2. **Nunca expor fornecedor** (Orinter, Cativa, Azul Viagens, Hotel Do/Decolar). O card de promoção é montado com campos; o flyer pronto nunca vira imagem.
3. **Sem geolocalização** do visitante.
4. **Contas no nome da DCL** (GitHub, Cloudflare, Google Analytics, Search Console, Perfil da Empresa). O Davi entra como administrador ou colaborador.
5. **Volly: só leitura.** O cliente usa o dia todo. Nunca criar, alterar, mover ou excluir nada lá, nem ativar recursos para testar.
6. **Sem escassez inventada.** Status de promoção só a partir das datas.

## 2. Proposta comercial (v3) — o que foi prometido ao cliente

> Confirmar com o Davi se a proposta foi aceita e se o prazo ou o escopo mudaram depois de 27/10.

- **Preço:** R$ 2.300, entrega única. Duas rodadas de ajustes e 30 dias de garantia para bugs. A estimativa técnica era de 70–95h, então **nada fora do escopo**. Pedido novo é orçado à parte.
- **Prazo:** site no ar **até 26/11/2026** (Black Friday em 27/11), condicionado aos materiais do cliente.
- **Escopo prometido:**
  - Home nova, sem imagem genérica nem marca de companhia aérea.
  - Botão "Receba promoções" levando ao grupo do WhatsApp.
  - Os 4 serviços com botão de cotação. **Mudou em 24/11:** a pedido do cliente e com aprovação do Davi, agora são 6 (seguro viagem e cruzeiros entraram, e a mentoria virou personalização de roteiros). Falta definir com o Davi se isso conta como rodada de ajuste ou é orçado à parte.
  - Vitrine de promoções com painel. A promoção sai do site sozinha **5 dias antes da data de ida**, com publicação automática diária à meia-noite. Cada card traz o aviso "valores sujeitos a disponibilidade e alteração".
  - Vitrine de pacotes, separada das promoções, no mesmo painel.
  - 4 páginas de serviço e a página para empresas (empresas atendidas só com autorização delas).
  - **Formulário de cotação** (origem, destino, datas, passageiros) que abre o WhatsApp com tudo escrito e **não guarda dados**.
  - FAQ com **até 10** perguntas e **até 6** depoimentos, com dados pessoais ocultados.
  - Quem somos e rodapé completo (CNPJ, Cadastur, Instagram, grupo, WhatsApp).
  - LGPD: privacidade, termos e aviso de cookies.
  - SEO básico, sitemap, Search Console e prévia de link no WhatsApp (logo e título).
  - Perfil da Empresa no Google (criação e envio para verificação; a verificação não entra no prazo).
  - GA4: cliques no WhatsApp por serviço e por origem, mais a lista de links com UTM para a bio e o grupo.
  - Treinamento do painel (1 sessão de 1h e um guia curto).
  - Publicação sem derrubar o e-mail. Redirects das URLs antigas. Remoção do Tag Manager e do Pixel antigos. WordPress desligado.
- **Fora do escopo:** venda direta, flyers e posts, anúncios, fotos e vídeos, páginas por destino e blog, migração do e-mail, revisão jurídica.
- **Plano de acompanhamento (opcional):** R$ 90/mês, mínimo de 6 meses.
  - Inclui: 1h de ajustes, relatório mensal (Looker Studio com GA4 mais o Ranking de Tags do Volly), monitoramento dos builds e da expiração.
  - Avulso: R$ 120/h.
  - O cliente cria no Volly as etiquetas "Site", "Instagram" e "Grupo" e marca os leads pelo código `ref:`.

## 3. Decisões técnicas

- **Stack:** Astro 7 + Tailwind 4, site estático, `@astrojs/sitemap`, View Transitions (`ClientRouter`).
- **Painel:** Pages CMS (`.pages.yml`). O cliente entra por convite de e-mail, sem conta GitHub. O conteúdo fica em JSON em `src/content/*`.
- **Produção:** **Cloudflare Pages** (não Netlify: no plano grátis, 300 créditos ÷ 15 por deploy não aguentam o painel mais a publicação diária). Na Cloudflare: 500 builds/mês grátis, tráfego estático sem custo e `_redirects` suportado. **Hoje a prévia roda no GitHub Pages da conta pessoal.**
- **Expiração:** publicação diária às **00:05 America/Sao_Paulo** (03:05 UTC), que tira a promoção do HTML e do sitemap, mais filtro no navegador como garantia. Datas comparadas como dia civil em São Paulo (`src/lib/datas.ts`). Promoção **sem página própria**: card com botão de WhatsApp.
- **WhatsApp:** `linkWhatsApp(mensagem, ref)` em `src/lib/whatsapp.ts` acrescenta `(ref: site-<serviço>)`. Em `Base.astro`, a UTM (`instagram`/`ig` → `ig`, `grupo`/`whatsapp_grupo` → `grupo`) troca o prefixo, guardado em `sessionStorage`.
- **Medição:** GA4 via gtag direto, sem Tag Manager. Consent Mode básico: nada carrega antes do aceite. Evento `whatsapp_click` com `{ ref, origem }`, a marcar como evento-chave. O ID vem de `PUBLIC_GA_ID`; sem ID, o aviso de cookies nem aparece em produção.
- **Base path:** `SITE_URL` e `BASE_PATH` vêm do deploy do GitHub Pages; sem eles, vale `https://dclaerotravel.com.br` e `/`. Links internos sempre com `caminho()` (`src/lib/caminho.ts`).
- **Identidade visual:** tema de aeroporto (painel de partidas, portões A1–A4, balcão, chegadas). As animações respeitam `prefers-reduced-motion`.

## 4. Estado do repositório (até o commit `757dcb1`, 14/11/2026)

**Commits:**

- Site base.
- Animações (painéis acendem, portões, sanfona, relógio, abertura da home, rota do avião, troca de página).
- Textos: "passagens com milhas" → "passagens aéreas" e "mentoria/gestão de milhas" → "mentoria de viagens". Essa mudança de nome difere da proposta; confirmar com o Davi que foi decisão do cliente.
- Serviços (24/11, pedido do cliente): A4 "Mentoria de viagens" → "Personalização de roteiros" (`/personalizacao-de-roteiros`, `ref: roteiros`), e entraram A5 "Seguro viagem" (`/seguro-viagem`, `ref: seguro`) e A6 "Cruzeiros" (`/cruzeiros`, `ref: cruzeiros`). O texto de abertura da home cita seguro e cruzeiros. Menu, Quem somos, FAQ de pagamento e `.pages.yml` foram atualizados.

**Pronto:**

- Páginas: home, `[servico]` (4), empresas, dúvidas, quem somos, privacidade, termos e 404.
- Coleções e painel: promoções, pacotes, dúvidas e depoimentos.
- Medição por origem com UTM e evento GA4.
- Aviso de cookies com Consent Mode.
- `_redirects`, `robots.txt`, sitemap, canonical e OG básico.

### Lacunas encontradas na revisão de 24/11 (por prioridade)

1. **Falta o formulário de cotação.** Não há `<form>` no projeto, e ele está prometido.
2. **Não há publicação diária.** `deploy.yml` roda só em push e manual, então a promoção não expira sem rebuild. Criar o cron na produção (Cloudflare ou GitHub Actions `schedule: '5 3 * * *'`) e conferir se existe filtro por data no navegador (o filtro de `Partidas.astro` roda só no build).
3. **Hospedagem e propriedade.** Falta criar o projeto Cloudflare Pages na conta da DCL e transferir ou espelhar o repositório para o GitHub da DCL. O Pages CMS precisa apontar para o repositório definitivo. `_redirects` não funciona no GitHub Pages.
4. **Promoções de exemplo.** As 8 de `src/content/promocoes` são `exemplo: true` e precisam sair antes do lançamento, trocadas pelas reais da Black Friday.
5. **Grupo de promoções:** `site.grupoPromocoes` está vazio (PENDENTE). O botão "Receba promoções" não aparece.
6. **GA4:** `PUBLIC_GA_ID` não está configurado no build de produção.
7. **Prévia no WhatsApp:** `og:image` usa `apple-touch-icon.png`, que é pequeno. Criar uma imagem de 1200×630 com logo e título.
8. **Foto da promoção:** o campo `foto` existe no painel, mas não aparece no card. Usar a foto ou tirar o campo, para não confundir o cliente. A pasta de mídia `public/fotos` não existe.
9. **Pacotes:** a pasta `src/content/pacotes` não existe (coleção vazia). Conferir aviso no build e o comportamento do painel ao criar o primeiro pacote.
10. **FAQ:** 6 das 10 perguntas estão com `revisar: true` (cancelamento, seguro, melhor preço, pagamento, pet, remarcação). Dependem dos modelos de política do cliente.
11. **Privacidade e termos** estão marcados como RASCUNHO. A proposta recomenda revisão jurídica, e publicar ou não é decisão do Davi.
12. **Depoimentos (4):** confirmar autorização por escrito. O depoimento da Ruth (esposa do dono) não pode entrar.
13. **Página para empresas:** sem nomes ou logos de empresas atendidas, que dependem de autorização (Pátria, Copini e o escritório do Tarso).
14. **Aviso de preço:** conferir se cada card mostra "valores sujeitos a disponibilidade e alteração".
15. **Cadastur:** o número está igual ao CNPJ (59.352.256/0001-00). Conferir na consulta pública.
16. **Logo:** só existe em PNG ou WebP. Pedir o vetorial.
17. **Textos de A4–A6 em rascunho:** roteiros, seguro viagem e cruzeiros foram escritos sem afirmar nada além do básico (sem seguradora, cobertura, companhia marítima ou forma de pagamento). O cliente precisa aprovar. Nenhuma pergunta do FAQ aponta para seguro ou cruzeiros ainda.

## 5. Migração para o domínio (crítico: o e-mail não pode cair)

- **Situação hoje:** DNS em `ns1/ns2.brasil111-7590.com.br` (revenda de hospedagem, não o Registro.br). O MX aponta para o mesmo servidor do WordPress (IP 45.148.96.44). SPF, DKIM (`default._domainkey`) e DMARC também estão nesse servidor.
- **Passo a passo:**
  1. Baixar o TTL 48h antes.
  2. Criar a zona na Cloudflare e copiar **todos** os registros, conferindo um a um (MX, SPF, DKIM, DMARC, mail, webmail, autodiscover).
  3. Trocar os nameservers no Registro.br (precisa da senha e do código do cliente).
  4. Testar envio e recebimento de e-mail.
  5. Só depois apontar o domínio para o Cloudflare Pages.
- **Depois da troca:** desligar o WordPress (PHP 7.4, sem suporte). A hospedagem antiga **só é cancelada depois** que o cliente decidir o destino do e-mail e o e-mail estiver confirmado funcionando.

## 6. Pendências do cliente

- Acessos: Registro.br e painel da hospedagem atual.
- Call para criar as contas no e-mail da DCL.
- Link do grupo de promoções.
- Promoções reais da Black Friday.
- Modelos de política (cancelamento, remarcação, pet).
- Até 6 depoimentos autorizados.
- Autorização e logos das empresas.
- Aprovação dos textos de personalização de roteiros, seguro viagem e cruzeiros.
- Logo vetorial e fotos.
- Decisão sobre o e-mail.
- Etiquetas no Volly.

## 7. Como trabalhar

- Linguagem dos textos do site: simples, para cliente leigo, em PT-BR. Não prometer nada que dependa do Google ou do Volly.
- Comandos: `npm ci`, `npm run dev`, `npm run build` (Node conforme `.nvmrc`).
- Antes de mudar escopo, preço ou prazo: parar e perguntar ao Davi.
- Ao fechar uma etapa, atualizar a seção 4 deste arquivo no mesmo commit.
