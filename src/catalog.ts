import {getMenuProduct,menuCategories,menuDescription,menuPrice,validateMenu,type MenuCustomization} from './valentsMenu';
export type Category = 'pizza' | 'burger' | 'sushi';
export type Ingredient = { id: string; name: string; price: number; max: number; color: string; group: string };
const ingredient = (id:string,name:string,price:number,color:string,group:string,max=2):Ingredient => ({id,name,price,color,group,max});
export const catalog: Record<Category, Ingredient[]> = {
 pizza: [ingredient('mozzarella','Muçarela',400,'#f4d785','Queijos'),ingredient('catupiry','Catupiry',500,'#fff4d3','Queijos'),ingredient('cheddar','Cheddar',400,'#efab37','Queijos'),ingredient('calabresa','Calabresa',500,'#a8432d','Carnes'),ingredient('pepperoni','Pepperoni',600,'#b32d23','Carnes'),ingredient('bacon','Bacon',600,'#af513b','Carnes'),ingredient('chicken','Frango',500,'#d9b97d','Carnes'),ingredient('corn','Milho',250,'#f3c23a','Vegetais'),ingredient('olive','Azeitona',250,'#3c4530','Vegetais'),ingredient('onion','Cebola',200,'#d5aad0','Vegetais'),ingredient('tomato','Tomate',250,'#d64b34','Vegetais'),ingredient('basil','Manjericão',200,'#467846','Finalizações')],
 burger: [ingredient('beef','Hambúrguer bovino',900,'#68402b','Proteínas',3),ingredient('chicken','Frango',800,'#b77937','Proteínas',2),ingredient('cheddar','Cheddar',300,'#f2ad32','Queijos'),ingredient('cheese','Queijo',300,'#f4d888','Queijos'),ingredient('bacon','Bacon',450,'#a84c32','Extras'),ingredient('egg','Ovo',350,'#fff1d0','Extras',1),ingredient('lettuce','Alface',150,'#63813b','Vegetais'),ingredient('tomato','Tomate',200,'#d8523e','Vegetais'),ingredient('redOnion','Cebola roxa',150,'#a86898','Vegetais'),ingredient('pickle','Picles',200,'#7b8a45','Vegetais'),ingredient('sauce','Molho da casa',200,'#e2ad70','Molhos')],
 sushi: [ingredient('salmon','Salmão',700,'#ef9277','Recheios',1),ingredient('tuna','Atum',800,'#bb5558','Recheios',1),ingredient('kani','Kani',500,'#e99b91','Recheios',1),ingredient('cucumber','Pepino',300,'#7b9c55','Recheios',1),ingredient('cream','Cream cheese',250,'#faf0d9','Complementos',1),ingredient('chive','Cebolinha',100,'#4e7d3d','Complementos',1),ingredient('sesame','Gergelim',100,'#c4a06c','Complementos',1),ingredient('tare','Tarê',150,'#593824','Molhos',1),ingredient('spicy','Maionese picante',200,'#e58d5b','Molhos',1)]
};
export const store = { name:'Monte & Peça', logo:'M&P', colors:{accent:'#a63e29',background:'#f7f3eb'}, categories:['pizza','burger','sushi'] as Category[], available:{pizza:true,burger:true,sushi:true}, options:{pizza:{P:{label:'Pequena · 25 cm',price:2400,diameter:25,slices:4},M:{label:'Média · 30 cm',price:3200,diameter:30,slices:6},G:{label:'Grande · 35 cm',price:4000,diameter:35,slices:8}},burger:{brioche:{label:'Brioche',price:600},australiano:{label:'Australiano',price:700},tradicional:{label:'Tradicional',price:500}},sushi:{hossomaki:{label:'Hossomaki',price:1200},uramaki:{label:'Uramaki',price:1600},temaki:{label:'Temaki',price:1400}}}, sushiRules:{hossomaki:{fillings:1,complements:['chive'],sauces:0},uramaki:{fillings:2,complements:['cream','chive','sesame'],sauces:1},temaki:{fillings:2,complements:['cream','chive','sesame'],sauces:1}} };
export const categoryNames:Record<Category,string>={pizza:'Pizza',burger:'Hambúrguer',sushi:'Sushi'};
export type Configuration={category:Category; option:string; ingredients:Record<string,number>; portions:number; sliced?:boolean; menu?:MenuCustomization; name?:string};
export type CartItem={id:string;config:Configuration;quantity:number};
export const defaults = ():Record<Category,Configuration> => ({pizza:{category:'pizza',option:'M',ingredients:{mozzarella:1,basil:1},portions:1,sliced:false},burger:{category:'burger',option:'brioche',ingredients:{beef:1,cheese:1,bacon:1,sauce:1},portions:1},sushi:{category:'sushi',option:'uramaki',ingredients:{salmon:1,cream:1,sesame:1},portions:1}});
export const money=(cents:number)=>new Intl.NumberFormat('pt-BR',{style:'currency',currency:'BRL'}).format(cents/100);
export function options(c:Category):Record<string,{label:string;price:number}>{return store.options[c]}
export function unitPrice(c:Configuration){if(c.menu)return menuPrice(c.menu);return options(c.category)[c.option].price + catalog[c.category].reduce((sum,i)=>sum+i.price*(c.ingredients[i.id]||0),0)}
export function price(c:Configuration){return unitPrice(c)*c.portions}
export function description(c:Configuration){if(c.menu)return menuDescription(c.menu);return catalog[c.category].filter(i=>c.ingredients[i.id]).map(i=>`${c.ingredients[i.id]>1?`${c.ingredients[i.id]}× `:''}${i.name}`).join(', ') || 'Sem ingredientes adicionais'}
export function allowed(c:Configuration,i:Ingredient){if(c.category!=='sushi')return true;const rule=store.sushiRules[c.option as keyof typeof store.sushiRules];if(i.group==='Complementos')return (rule.complements as readonly string[]).includes(i.id);return i.group!=='Molhos'||rule.sauces>0}
export function validate(c:Configuration):string|null {
 if(!c || !store.categories.includes(c.category) || !store.available[c.category])return 'Produto indisponível.';
 if(c.name!==undefined&&(typeof c.name!=='string'||c.name.length>32))return 'O nome da criação deve ter até 32 caracteres.';
 if(c.menu){if(c.category!=='sushi'||c.option!=='valents'||c.portions!==1||!c.ingredients||typeof c.ingredients!=='object'||Array.isArray(c.ingredients)||Object.keys(c.ingredients).length||c.sliced!==undefined)return 'Configuração do cardápio inválida.';return validateMenu(c.menu)}
 if(!options(c.category)[c.option])return 'Produto indisponível.';
 if(!Number.isInteger(c.portions)||c.portions<1||c.portions>10|| (c.category!=='sushi'&&c.portions!==1))return 'Quantidade inválida.';
 if(c.sliced!==undefined&&(c.category!=='pizza'||typeof c.sliced!=='boolean'))return 'Preferência de corte inválida.';
 if(!c.ingredients||typeof c.ingredients!=='object'||Array.isArray(c.ingredients))return 'Ingredientes inválidos.';
 for(const [id,q] of Object.entries(c.ingredients)){const i=catalog[c.category].find(i=>i.id===id);if(!i||!Number.isInteger(q)||q<0||q>i.max||(q>0&&!allowed(c,i)))return 'Seleção de ingredientes inválida.'}
 if(c.category==='burger'&&Object.values(c.ingredients).reduce((sum,q)=>sum+q,0)>12)return 'Escolha até 12 camadas para seu hambúrguer.';
 if(c.category==='burger'&&!(c.ingredients.beef||c.ingredients.chicken))return 'Escolha pelo menos uma proteína.';
 if(c.category==='sushi'){const rule=store.sushiRules[c.option as keyof typeof store.sushiRules];const count=(group:string)=>catalog.sushi.filter(i=>i.group===group).reduce((n,i)=>n+(c.ingredients[i.id]||0),0);if(count('Recheios')<1||count('Recheios')>rule.fillings)return `Escolha de 1 a ${rule.fillings} recheio(s).`;if(count('Molhos')>rule.sauces)return 'Escolha apenas um molho.';}
 return null;
}
export const STORAGE_KEY='monte-e-peca.cart.v1';
export function loadCart(storage:Pick<Storage,'getItem'>):CartItem[]{try{const raw=JSON.parse(storage.getItem(STORAGE_KEY)||'[]');if(!Array.isArray(raw))return [];const ids=new Set<string>();return raw.filter((i:any)=>{try{if(!i||typeof i.id!=='string'||ids.has(i.id)||!Number.isInteger(i.quantity)||i.quantity<1||i.quantity>99||validate(i.config)!==null)return false;ids.add(i.id);return true}catch{return false}})}catch{return []}}
export function saveCart(storage:Pick<Storage,'setItem'>,items:CartItem[]){try{storage.setItem(STORAGE_KEY,JSON.stringify(items));return true}catch{return false}}
export const snapshot=(c:Configuration):Configuration=>structuredClone(c);
export const total=(items:CartItem[])=>items.reduce((sum,i)=>sum+price(i.config)*i.quantity,0);

export function pizzaSize(option:string){return store.options.pizza[option as keyof typeof store.options.pizza]||store.options.pizza.M}
export function pizzaCutLabel(config:Configuration){return config.sliced?`Fatiada em ${pizzaSize(config.option).slices} fatias`:'Inteira, sem cortes'}

export function configurationName(c:Configuration){return c.name?.trim()||(c.menu?getMenuProduct(c.menu.id)?.name||'Produto':categoryNames[c.category])}
export function configurationLabel(c:Configuration){return c.menu?getMenuProduct(c.menu.id)?.portion||'Cardápio Valent’s':options(c.category)[c.option].label}
export function configurationCategory(c:Configuration){return c.menu?menuCategories.find(([id])=>id===getMenuProduct(c.menu!.id)?.category)?.[1]||'Cardápio':categoryNames[c.category]}
