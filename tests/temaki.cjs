const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv[2]||'http://localhost:5174');
 await page.getByRole('tab',{name:'Sushi',exact:true}).click();
 await page.locator('.option-picker').getByRole('button',{name:/Temaki/}).click();
 await page.getByRole('button',{name:'Remover Cream cheese',exact:true}).click();
 await page.getByRole('button',{name:'Remover Cebolinha',exact:true}).click();
 assert.equal(await page.locator('.temaki-filling image[href*="sushi-salmon"]').count(),20);
 assert.equal(await page.locator('image[href*="salmon-creamy"]').count(),0);
 await page.getByRole('button',{name:'Adicionar Cream cheese',exact:true}).click();
 await page.getByRole('button',{name:'Adicionar Cebolinha',exact:true}).click();
 assert.equal(await page.locator('image[href*="salmon-creamy"]').count(),1);
 assert.equal(await page.locator('[data-temaki-garnish="chive"]').count(),8);
 const sources=await page.locator('.food-svg image').evaluateAll(images=>images.map(i=>i.getAttribute('href')));
 for(const source of new Set(sources)){
  const response=await page.request.get(new URL(source,page.url()).href);
  assert.equal(response.status(),200,source);
  assert.match(response.headers()['content-type'],/image/);
 }
 await page.waitForTimeout(400);
 await page.locator('.visual-column').screenshot({path:'artifacts/temaki-recheio-cremoso.png'});
 await page.getByRole('button',{name:'Adicionar à sacola',exact:true}).click();
 await page.getByRole('button',{name:'Sua sacola',exact:false}).click();
 assert.match(await page.locator('.cart-item').last().textContent(),/Cream cheese/);
 await page.keyboard.press('Escape');
 await page.getByRole('button',{name:'Remover Cream cheese',exact:true}).click();
 await page.getByRole('button',{name:'Remover Cebolinha',exact:true}).click();
 assert.equal(await page.locator('image[href*="salmon-creamy"]').count(),0);
 assert.equal(await page.locator('[data-temaki-garnish="chive"]').count(),0);
 await page.setViewportSize({width:390,height:844});
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 assert.deepEqual(errors,[]);
 console.log('PASS: temaki farto, mistura cremosa e cebolinha condicionais, imagens carregadas, carrinho e celular.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
