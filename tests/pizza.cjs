const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 for(const width of [1440,390]){
  const page=await browser.newPage({viewport:{width,height:width===390?844:1100}});
  const errors=[];page.on('pageerror',e=>errors.push(e.message));
  await page.goto(process.argv[2]||'http://localhost:5174');
  for(const [label,size,slices]of [['Pequena','P',4],['Média','M',6],['Grande','G',8]]){
   await page.locator('.option-picker button').filter({hasText:label}).click();
   assert.equal(await page.locator('.pizza-art').getAttribute('data-pizza-size'),size);
   await page.getByRole('button',{name:/^Fatiada/}).click();
   assert.equal(await page.locator('[data-pizza-cuts]').getAttribute('data-pizza-cuts'),String(slices));
   await page.waitForTimeout(250);
   await page.locator('.visual-column').screenshot({path:`artifacts/pizza-${size}-${width}.png`});
  }
  await page.getByRole('button',{name:'Adicionar Catupiry',exact:true}).click();
  assert.equal(await page.locator('[data-piped-cheese="catupiry"] image').count(),10);
  await page.waitForTimeout(1900);
  await page.getByRole('button',{name:'Adicionar Cheddar',exact:true}).click();
  await page.waitForTimeout(800);
  await page.locator('.visual-column').screenshot({path:`artifacts/pizza-aplicacao-${width}.png`});
  await page.waitForTimeout(1100);
  await page.locator('.visual-column').screenshot({path:`artifacts/pizza-cremes-${width}.png`});
  await page.getByRole('button',{name:'Adicionar à sacola',exact:true}).click();
  await page.getByRole('button',{name:'Sua sacola',exact:true}).click();
  assert.match(await page.locator('.cart-item').textContent(),/Fatiada em 8 fatias/);
  await page.keyboard.press('Escape');
  await page.getByRole('button',{name:/^Inteira/}).click();
  assert.equal(await page.locator('[data-pizza-cuts]').count(),0);
  await page.getByRole('button',{name:'Adicionar à sacola',exact:true}).click();
  await page.reload();
  await page.getByRole('button',{name:'Sua sacola',exact:true}).click();
  assert.equal(await page.locator('.cart-item').count(),2);
  assert.match(await page.locator('.cart-item').last().textContent(),/Inteira, sem cortes/);
  await page.getByRole('button',{name:'Editar',exact:true}).first().click();
  await page.getByRole('button',{name:/^Inteira/}).click();
  await page.getByRole('button',{name:'Salvar montagem',exact:true}).click();
  await page.emulateMedia({reducedMotion:'reduce'});
  assert.equal(await page.locator('.piping-reveal').first().evaluate(el=>getComputedStyle(el).animationName),'none');
  assert.deepEqual(errors,[]);
  await page.close();
 }
 console.log('PASS: P/M/G, cortes 4/6/8, inteira, cremes aplicados, persistência, edição e movimento reduzido em desktop/mobile.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
