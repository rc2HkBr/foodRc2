import {test} from 'node:test';
import assert from 'node:assert/strict';
import {getMenuProduct,initialMenu,menuCategories,menuGroups,menuPrice,validateMenu,valentsProducts} from '../src/valentsMenu';
import {configurationName,defaults,loadCart,price,saveCart,snapshot,validate,type Configuration} from '../src/catalog';
test('71 produtos de 11 categorias, IDs únicos e preços em centavos',()=>{
 assert.equal(valentsProducts.length,71);assert.equal(menuCategories.length,11);assert.equal(new Set(valentsProducts.map(item=>item.id)).size,71);
 for(const item of valentsProducts){assert.ok(Number.isInteger(item.price)&&item.price>0);assert.ok(menuCategories.some(([id])=>item.category===id));for(const id of item.groups)assert.ok(menuGroups[id])}
 assert.equal(getMenuProduct('temaki-no-rice')!.price,4999);
});
test('todos os produtos podem ser configurados dentro das regras observadas',()=>{
 for(const item of valentsProducts){const menu=initialMenu(item.id);for(const id of item.groups){const group=menuGroups[id];if(group.min)menu.choices[id]={[group.options[0].id]:group.min}}assert.equal(validateMenu(menu),null,item.id)}
});
test('combo exige dois tipos, dois sabores e uma bebida',()=>{
 const menu=initialMenu('combo-two-temakis');assert.ok(validateMenu(menu));menu.choices={'two-types':{raw:2},'two-flavors':{salmon:2},'combo-cola':{zero:1}};assert.equal(validateMenu(menu),null);assert.equal(menuPrice(menu),4990);menu.choices['two-types'].raw=3;assert.ok(validateMenu(menu));
});
test('adicionais mudam preço; grupos e contagens inválidos são rejeitados',()=>{
 const menu=initialMenu('combo-osaka');menu.choices={'cola-extra':{original:2,zero:1}};assert.equal(menuPrice(menu),6487);assert.equal(validateMenu(menu),null);menu.choices['cola-extra'].original=-1;assert.ok(validateMenu(menu));menu.choices={'unknown':{fake:1}};assert.ok(validateMenu(menu));
});
test('soda segue limite do formulário e escolhas obrigatórias são respeitadas',()=>{
 const soda=initialMenu('italian-soda');assert.equal(validateMenu(soda),null);soda.choices={'soda-flavor':{passion:1,strawberry:1}};assert.ok(validateMenu(soda));assert.ok(validateMenu(initialMenu('temaki')));assert.ok(validateMenu(initialMenu('hosso-salmon')));assert.equal(validateMenu(initialMenu('hosso-kani')),null);
});
test('produtos de referência coexistem com montagens antigas e persistem de forma independente',()=>{
 const menu=initialMenu('temaki');menu.choices={'temaki-flavor':{'salmon-cream':1}};const config:Configuration={category:'sushi',option:'valents',ingredients:{},portions:1,menu};assert.equal(validate(config),null);assert.equal(price(config),2990);assert.equal(configurationName(config),'Temaki');
 const items=[{id:'menu',config:snapshot(config),quantity:2},{id:'pizza',config:defaults().pizza,quantity:1}];menu.notes='Mudou apenas o rascunho';assert.equal(items[0].config.menu!.notes,'');let value='';const storage={getItem:()=>value,setItem:(_key:string,v:string)=>{value=v}};saveCart(storage,items);assert.deepEqual(loadCart(storage),items);
});
