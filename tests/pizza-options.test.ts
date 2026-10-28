import {test} from 'node:test';
import assert from 'node:assert/strict';
import {defaults,pizzaSize,pizzaCutLabel,price,validate,snapshot,loadCart,saveCart} from '../src/catalog';
test('tamanhos têm diâmetros e quantidade de fatias configurados',()=>{
 assert.deepEqual(['P','M','G'].map(size=>pizzaSize(size).diameter),[25,30,35]);
 const config=defaults().pizza;
 for(const [option,slices]of [['P',4],['M',6],['G',8]]as const){config.option=option;config.sliced=true;assert.equal(pizzaCutLabel(config),`Fatiada em ${slices} fatias`)}
});
test('corte não altera preço e aceita carrinhos antigos',()=>{
 const config=defaults().pizza,previous=price(config);config.sliced=true;
 assert.equal(price(config),previous);assert.equal(validate(config),null);
 config.sliced=false;assert.equal(pizzaCutLabel(config),'Inteira, sem cortes');
 delete config.sliced;assert.equal(validate(config),null);
 assert.ok(validate({...config,sliced:'yes' as unknown as boolean}));
});
test('corte persiste na configuração independente da sacola',()=>{
 const config=defaults().pizza;config.sliced=true;
 const item={id:'pizza',config:snapshot(config),quantity:1};config.sliced=false;
 let value='';const storage={getItem:()=>value,setItem:(_key:string,v:string)=>{value=v}};
 assert.equal(saveCart(storage,[item]),true);assert.equal(loadCart(storage)[0].config.sliced,true);
});
