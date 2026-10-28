const {chromium}=require('playwright');
const assert=require('node:assert/strict');
(async()=>{
 const browser=await chromium.launch();
 const page=await browser.newPage({viewport:{width:1440,height:1100}});
 const errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.goto(process.argv[2]||'http://localhost:5174');
 const snapshots=[['Pizza','pizza-realista'],['Hambúrguer','hamburguer-realista'],['Sushi','sushi-realista']];
 for(const [category,file]of snapshots){
  await page.getByRole('tab',{name:category,exact:true}).click();
  if(category==='Pizza')await page.getByRole('button',{name:'Adicionar Pepperoni',exact:true}).click();
  if(category==='Hambúrguer')await page.getByRole('button',{name:'Adicionar Bacon',exact:true}).click();
  await page.waitForTimeout(350);
  await page.locator('.visual-column').screenshot({path:`artifacts/${file}.png`});
  const sources=await page.locator('.food-svg image').evaluateAll(images=>images.map(i=>i.getAttribute('href')));
  for(const source of new Set(sources)){const response=await page.request.get(new URL(source,page.url()).href);assert.equal(response.status(),200,source);assert.ok((await response.body()).length>1000,source)}
 }
 for(const type of ['Hossomaki','Temaki']){
  await page.getByRole('button',{name:new RegExp(type)}).click();
  await page.waitForTimeout(300);
  await page.locator('.visual-column').screenshot({path:`artifacts/${type.toLowerCase()}-realista.png`});
 }
 await page.setViewportSize({width:390,height:844});
 await page.getByRole('tab',{name:'Pizza',exact:true}).click();
 await page.waitForTimeout(300);
 assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),true);
 await page.locator('.visual-column').screenshot({path:'artifacts/pizza-realista-mobile.png'});
 assert.deepEqual(errors,[]);
 console.log('PASS: recortes carregados, montagens desktop, três tipos de sushi, celular sem overflow e sem erros JS.');
 await browser.close();
})().catch(e=>{console.error(e);process.exit(1)});
