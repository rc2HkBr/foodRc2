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

## Publicação

`vercel.json` configura o build Vite (`npm run build`) e a pasta estática `dist`. O projeto não precisa de variáveis de ambiente ou credenciais de serviços para funcionar.
