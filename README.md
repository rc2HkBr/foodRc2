# Monte & Peça

Demonstração independente em React, TypeScript e Vite, publicada no repositório foodRc2.

```powershell
git clone https://github.com/rc2HkBr/foodRc2.git
cd foodRc2
npm ci
npm run dev -- --port 5174
```

`npm run build` verifica TypeScript e gera `dist`. `npm test` valida preços, limites, regras de sushi, cópias independentes, substituição de itens e armazenamento. Com o servidor na porta 5174, `npm run test:browser` verifica o fluxo em desktop e celular via Playwright. Se necessário, instale o navegador com `npx playwright install chromium`.

Catálogo, preços em centavos, limites, categorias, tipos e regras ficam em `src/catalog.ts`. A identidade visual usa variáveis em `src/styles.css`; nome e logo ficam em `store`. A loja demonstrativa não possui autenticação, backend, pagamento ou envio de pedido. Futuras integrações devem usar um backend próprio, com credenciais apenas no servidor; os tipos Configuration e CartItem são o ponto de partida dos contratos.

Pizza, hambúrguer e sushi usam recortes fotorrealistas originais gerados com a ferramenta image_gen integrada. A massa original foi preservada em `public/pizza-base.png`. Os ingredientes ficam em `public/ingredients/`, como WebP com transparência. Pizza tem distribuição estável por ingrediente e uma camada própria de muçarela gratinada; hambúrguer usa recortes em vista lateral com altura dinâmica; sushi usa bases próprias de arroz e nori para hossomaki, uramaki e temaki, com recheios fotográficos. Guarnições pequenas e fios de molho usam detalhes vetoriais. As variações de pão usam o mesmo recorte com ajustes de cor.

Os prompts ficam em `docs/food-image-prompts.json`; o manifesto local de fontes está em `artifacts/food-assets.json`. `python scripts/prepare_food_assets.py` recorta margens transparentes e converte os originais para WebP, usando Pillow. Não é necessário Python para rodar ou compilar o site. Com o servidor ativo, `node tests/realism.cjs` verifica o carregamento dos recortes e salva capturas das montagens.

O temaki usa recheio picado em volume, preenchendo a abertura do cone. Com cream cheese, troca para um recorte próprio da mistura cremosa; cebolinha só aparece quando selecionada. As montagens de cada categoria permanecem enquanto a página estiver aberta. O carrinho persiste no navegador; falhas geram aviso. A conclusão mantém a sacola e informa que nada foi enviado ou cobrado.

Pizza: P de 25 cm, M de 30 cm e G de 35 cm, com escala visual proporcional. Depois dos ingredientes, é possível escolher inteira ou fatiada em 4, 6 ou 8 fatias. A preferência acompanha o item na sacola e na edição, sem taxa adicional. Catupiry e cheddar são aplicados como fios em trama, com animação de aplicação que respeita movimento reduzido. `node tests/pizza.cjs` verifica tamanhos, corte, cremes, edição e persistência no desktop e celular.

O hambúrguer tem pão brioche liso, carne alta e queijo derretido com dobras. Os recortes novos e os fios de queijo são originais gerados via image_gen, com prompts em `docs/burger-v2-image-prompts.json` e `docs/cheese-image-prompts.json`.

## Publicação

`vercel.json` configura o build Vite (`npm run build`) e a pasta estática `dist`. O projeto não precisa de variáveis de ambiente ou credenciais de serviços para funcionar.

Vercel Web Analytics está integrado pelo componente `Analytics` de `@vercel/analytics/react`, compatível com Vite. A coleta no ambiente publicado depende da disponibilidade do Web Analytics no projeto Vercel.

## Experiência mobile

No celular, a prévia do alimento acompanha as escolhas. Os ingredientes são organizados em grupos com contadores de seleção e a barra de preço e inclusão fica ao alcance do polegar. A sacola usa um painel próprio com rolagem interna, respeitando as áreas seguras do aparelho. `npm run test:mobile` percorre montagem, grupos, edição e conclusão com emulação de toque, além de conferir sete tamanhos de tela. Isso não substitui testes em aparelhos físicos.

## Checkout demonstrativo

A sacola leva a um checkout com nome, celular, entrega ou retirada, endereço, observações e escolha entre Pix ou pagamento na entrega/retirada (cartão ou dinheiro). O fluxo valida os dados, permite revisar e voltar para ajustes, e calcula a taxa demonstrativa de entrega em centavos. Retirada é gratuita. A taxa e a identificação da retirada ficam em `src/checkoutModel.ts`.

O Pix é apenas uma escolha de forma de pagamento: não há chave, QR Code, cobrança, confirmação de pagamento ou envio de pedido. Os dados do formulário permanecem somente na memória da página, sem persistência ou transmissão. A sacola continua persistindo apenas as montagens no localStorage.

`npm run test:checkout` verifica entrega, retirada, Pix, cartão/dinheiro, validação, revisão, totais e conclusão em desktop e celulares de 320 e 390 px. Para testar o ambiente publicado: `node tests/checkout.cjs https://foodmenu-rosy.vercel.app/`.

Há um roteiro curto e honesto de apresentação em `docs/roteiro-apresentacao.md`, com um percurso de demonstração e o que deve ser definido para a operação real.

## Cardápio de referência Valents Sushi

O catálogo inclui os 71 produtos das 11 categorias do cardápio público indicado pelo usuário. Há busca, filtros, personalização com os limites observados, composição dos combos, notas do item e edição na mesma sacola. O combo de dois temakis exige os tipos, sabores e bebida; os temakis avulsos e alguns rolinhos têm grupos próprios. Os combinados também oferecem uma área separada para trocar sabores de sushi dentro do mesmo tipo de peça, preservando a contagem e o preço base. Porções avulsas que não tinham escolhas no formulário de origem ganharam uma opção demonstrativa para trocar a composição; variações de ceviche ajustam o valor conforme a referência. Em bebidas, sabor e tipo selecionados atualizam a ilustração; Coca original e Zero têm visuais distintos. Essas novidades precisam ser confirmadas com a loja. Os adicionais usam os preços efetivamente mostrados na referência.

A montagem livre de pizza, hambúrguer e sushi permanece disponível. Itens do catálogo guardam um identificador e escolhas separadas, com preço calculado pelo catálogo em centavos; valores arbitrários não são aceitos no carrinho. As prévias usam recortes próprios para ceviche, sashimi, nigiri, joy, hot, temaki frito e sem arroz, além de ilustrações próprias para bebidas. Não foram copiadas as fotografias nem o logotipo do restaurante. Os prompts ficam em `docs/valents-image-prompts.json`.

É um catálogo demonstrativo de referência, sem vínculo de operação ou sincronização automática com o restaurante. Divergências de quantidade e cadastro foram documentadas em `docs/valents-menu-audit.md`, e são indicadas na seleção quando necessário. O checkout continua sem cobrança nem envio real.

`node tests/valents.cjs` percorre catálogo, escolhas obrigatórias, adicionais, edição, persistência e checkout em desktop e celular. Pode receber a URL publicada como argumento.
