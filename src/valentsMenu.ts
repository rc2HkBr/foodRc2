export type MenuKind='combo'|'temaki'|'fried-temaki'|'no-rice-temaki'|'ceviche'|'hot'|'sashimi'|'nigiri'|'joy'|'hossomaki'|'uramaki'|'dragon'|'drink'|'beer'|'soda'|'sauce'|'extra';
export type MenuProduct={id:string;category:string;name:string;price:number;kind:MenuKind;portion?:string;components?:{name:string;count:number}[];groups:string[];note?:string};
export type MenuCustomization={id:string;choices:Record<string,Record<string,number>>;notes:string};
export type MenuGroup={id:string;name:string;min:number;max:number;options:{id:string;name:string;price:number}[];componentIndex?:number;portionStyle?:boolean;originalOption?:string};
export const menuSource={name:'Valent’s Sushi',url:'https://menu.brendi.com.br/valents-sushi-centro',reviewed:'2026-10-27',automaticSync:false};
export const menuCategories=[['promos','Combos promocionais'],['combos','Combos incríveis'],['ceviche','Ceviche'],['temaki','Temaki'],['big-small','Bigs Hots · Pequeno'],['big-large','Bigs Hots · Grande'],['portions','Porções'],['soft-drinks','Refrigerantes'],['beer','Cervejas'],['water','Soda italiana e águas'],['sauces','Molhos extra']]as const;
const option=(id:string,name:string,price=0)=>({id,name,price});
export const temakiFlavors=[option('grilled-cream-chive','Salmão grelhado, cream cheese e cebolinha'),option('skin-cream','Creme skin'),option('grilled','Salmão grelhado'),option('salmon-cream-chive','Salmão, cream cheese e cebolinha'),option('salmon-cream','Salmão com cream cheese'),option('salmon','Salmão'),option('salmon-cream-leek','Salmão, cream cheese e alho-poró'),option('spicy-salmon','Salmão picante'),option('salmon-cream-kani','Salmão, cream cheese e kani'),option('grilled-chive','Salmão grelhado com cebolinha')];
export const menuGroups:Record<string,MenuGroup>={
 'temaki-flavor':{id:'temaki-flavor',name:'Sabor do temaki',min:1,max:1,options:temakiFlavors},
 'two-types':{id:'two-types',name:'Escolha os 2 tipos de temaki',min:2,max:2,options:[option('raw','Temaki cru'),option('fried','Temaki frito')]},
 'two-flavors':{id:'two-flavors',name:'Escolha os 2 sabores',min:2,max:2,options:temakiFlavors},
 'combo-cola':{id:'combo-cola',name:'Escolha sua Coca-Cola',min:1,max:1,options:[option('zero','Coca-Cola Zero'),option('original','Coca-Cola com açúcar')]},
 'cola-extra':{id:'cola-extra',name:'Leve também',min:0,max:999,options:[option('original','Coca-Cola original · 310 ml',499),option('zero','Coca-Cola Zero · 310 ml',499)]},
 'salmon-roll':{id:'salmon-roll',name:'Sabor dos rolinhos',min:1,max:1,options:[option('salmon-cream-chive','Salmão, cream cheese e cebolinha'),option('skin-cream','Creme skin'),option('salmon-cream-leek','Salmão, cream cheese e alho-poró'),option('salmon-cream-crispy','Salmão, cream cheese e cebola crispy'),option('salmon','Salmão sem cream cheese'),option('salmon-cream-doritos','Salmão, cream cheese e Doritos'),option('salmon-cream-passion','Salmão, cream cheese e maracujá')]},
 'kani-roll':{id:'kani-roll',name:'Sabor de kani',min:0,max:1,options:[option('kani-cream','Kani com cream cheese'),option('kani-cream-leek','Kani, cream cheese e alho-poró'),option('kani-cream-crispy','Kani, cream cheese e cebola crispy'),option('kani-cream-chive','Kani, cream cheese e cebolinha'),option('kani-cream-doritos','Kani, cream cheese e Doritos')]},
 'soda-flavor':{id:'soda-flavor',name:'Sabor da soda',min:0,max:1,options:[option('passion','Maracujá'),option('strawberry','Morango'),option('green-apple','Maçã-verde')]}
};
const component=(count:number,name:string)=>({count,name});
const comboAlternatives:Record<string,string[]>={
 uramaki:['Uramaki de salmão','Uramaki de kani','Uramaki de kani com maracujá','Uramaki de kani com alho-poró','Uramaki de kani com cebola crispy','Uramaki de skin','Uramaki de skin com alho-poró','Uramaki de skin com cebolinha','Uramaki de skin com cebola crispy','Uramaki de skin com maracujá','Uramaki de skin com Doritos','Uramaki de tilápia','Uramaki de salmão com alho-poró'],
 hossomaki:['Hossomaki de salmão','Hossomaki de salmão com cream cheese','Hossomaki de tilápia','Hossomaki de tilápia com cream cheese','Hossomaki skin','Hossomaki skin com geleia de maracujá','Hossomaki de kani'],
 hot:['Hot Philadelphia','Hot Philadelphia com geleia de pimenta','Hot skin','Hot banana','Hot banana com chocolate','Hot banana com creme de avelã'],
 joy:['Joy de salmão com cream cheese','Joy de salmão, cream cheese e alho-poró','Joy de salmão com cream cheese e pimenta-biquinho','Joy de salmão, cream cheese e maracujá','Joy tradicional com cream cheese'],
 niguiri:['Niguiri de salmão','Niguiri skin com limão e cream cheese'],
 dragon:['Dragon de kani','Dragon de skin'],
 sashimi:['Sashimi de salmão','Sashimi de salmão maçaricado','Sashimi de salmão com lemon pepper']
};
const portionAlternatives:Partial<Record<MenuKind,string[]>>={
 ceviche:['Ceviche Tilápia','Ceviche Tilápia e Salmão','Ceviche Salmão com Pimenta Biquinho','Ceviche Salmão'],
 hot:['Hot Philadelphia','Hot Philadelphia com Geleia de Pimenta','Hot Skin','Hot de Banana com Chocolate','Hot de Banana com Creme de Avelã'],
 sashimi:['Sashimis de Salmão','Sashimis de Salmão Maçaricado','Sashimis de Salmão com Lemon Pepper'],
 nigiri:['Nigiris Salmão','Nigiris Salmão Maçaricado','Nigiris Skin com Limão, Cream Cheese'],
 joy:['Joys Salmão com Cream Cheese','Joys Salmão com Cream Cheese e Pimenta Biquinho','Joys Salmão Tropical','Joys Salmão Macerado com Cream Cheese e Geleia de Pimenta'],
 hossomaki:['Hossomakis Salmão','Hossomakis Kani','Hossomakis Skin'],
 uramaki:['Uramakis Salmão','Uramakis Kani','Uramakis Skin'],
 dragon:['Dragons Kani, Cream Cheese e Salmão','Dragons Skin, Cream Cheese e Salmão']
};
const bigHotChoices={
 'big-small':['Big hot Salmão, Cream Cheese e Gotas de Pimenta Chinesa (pequeno)','Big hot Salmão, Cream Cheese e Cebolinha (pequeno)','Big hot Salmão, Cream Cheese e Skin (pequeno)','Big hot Salmão com Geleia de Pimenta (pequeno)'],
 'big-large':['Big hot Salmão, Cream Cheese e Cebolinha','Big hot Salmão, Cream Cheese e Gotas de Pimenta Chinesa','Big hot Salmão com Geleia de Pimenta','Big hot Salmão, Cream Cheese e Skin','Big hot Salmão Grelhado Picante']
} as const;
const cevichePrices:Record<string,number>={'Ceviche Tilápia':3790,'Ceviche Tilápia e Salmão':4990,'Ceviche Salmão com Pimenta Biquinho':5990,'Ceviche Salmão':5990};
function comboPieceType(name:string){const text=name.toLowerCase();return (['uramaki','hossomaki','hot','joy','niguiri','dragon','sashimi'] as const).find(type=>text.includes(type))}
function comboGroupId(id:string,index:number){return `combo-piece-${id}-${index}`}
const product=(id:string,category:string,name:string,price:number,kind:MenuKind,portion?:string,groups:string[]=[],components?:MenuProduct['components'],note?:string):MenuProduct=>{
 const menuGroupsForProduct=[...groups];
 if(kind==='combo'&&id!=='combo-two-temakis'&&components)components.forEach((piece,index)=>{
  const type=comboPieceType(piece.name);if(!type)return;
  const groupId=comboGroupId(id,index),otherChoices=comboAlternatives[type].filter(choice=>choice.toLowerCase()!==piece.name.toLowerCase());
  menuGroups[groupId]={id:groupId,name:`Escolha o sabor das ${piece.count} peças de ${type[0].toUpperCase()+type.slice(1)}`,min:piece.count,max:piece.count,componentIndex:index,originalOption:'as-listed',options:[option('as-listed',piece.name),...otherChoices.map((choice,n)=>option(`choice-${n}`,choice))]};
  menuGroupsForProduct.push(groupId);
 });
 const portionChoices=category==='big-small'?bigHotChoices['big-small']:category==='big-large'?bigHotChoices['big-large']:groups.length===0?portionAlternatives[kind]:undefined;
 if(portionChoices?.length){const groupId=`portion-flavor-${id}`,choices=portionChoices.filter(choice=>choice.toLowerCase()!==name.toLowerCase());menuGroups[groupId]={id:groupId,name:'Mude os ingredientes desta porção',min:1,max:1,portionStyle:true,originalOption:'as-listed',options:[option('as-listed',name),...choices.map((choice,n)=>option(`choice-${n}`,choice,kind==='ceviche'?cevichePrices[choice]-price:0))]};menuGroupsForProduct.push(groupId)}
 return {id,category,name,price,kind,portion,groups:menuGroupsForProduct,components,note};
};
export const valentsProducts:MenuProduct[]=[
 product('combo-individual','promos','Combo Individual',3990,'combo',undefined,[],[component(4,'Uramaki de salmão'),component(4,'Uramaki de skin com alho-poró'),component(2,'Uramaki de tilápia'),component(3,'Dragon'),component(3,'Sashimi'),component(2,'Joy com pimenta-biquinho'),component(3,'Hot Philadelphia')],'A referência informa uma medida inconsistente. Quantidade a confirmar.'),
 product('combo-individual-especial','promos','Combo Individual Especial',3290,'combo','22 unidades',['cola-extra'],[component(4,'Uramaki de salmão'),component(4,'Uramaki de kani com maracujá'),component(4,'Uramaki de kani com alho-poró'),component(5,'Hot skin'),component(5,'Hot banana com creme de avelã')]),
 product('combo-hana','promos','Combo Hana',4990,'combo','33 unidades anunciadas',[],[component(4,'Hossomaki skin'),component(4,'Hossomaki skin com geleia de maracujá'),component(4,'Uramaki skin'),component(4,'Uramaki skin com alho-poró'),component(6,'Dragon'),component(5,'Hot skin'),component(5,'Hot banana com creme de avelã'),component(5,'Niguiri skin')],'A composição publicada soma 37 peças; confirmar a quantidade anunciada.'),
 product('combo-osaka','promos','Combo Osaka',4990,'combo','39 unidades',['cola-extra'],[component(4,'Uramaki de salmão'),component(4,'Uramaki de kani com cebola crispy'),component(4,'Uramaki de kani com maracujá'),component(4,'Uramaki de skin com cebolinha'),component(4,'Uramaki de skin com alho-poró'),component(4,'Dragon'),component(5,'Hot skin'),component(10,'Hot banana com chocolate')]),
 product('combo-sakura','promos','Combo Sakura',6990,'combo','52 unidades',['cola-extra'],[component(4,'Hossomaki de salmão'),component(4,'Dragon'),component(8,'Hossomaki skin'),component(4,'Uramaki de kani com maracujá'),component(4,'Uramaki de skin com cebolinha'),component(4,'Uramaki de skin com Doritos'),component(4,'Niguiri skin'),component(10,'Hot skin'),component(10,'Hot banana com creme de avelã')]),
 product('combo-toquio','promos','Combo Tóquio',7990,'combo','58 unidades',['cola-extra'],[component(3,'Sashimi de salmão'),component(4,'Niguiri de salmão'),component(3,'Joy de pimenta-biquinho'),component(4,'Uramaki de salmão'),component(4,'Uramaki de kani com alho-poró'),component(8,'Uramaki de skin com cebola crispy'),component(8,'Uramaki de skin com maracujá'),component(4,'Dragon'),component(10,'Hot skin'),component(10,'Hot banana')]),
 product('combo-fuji','promos','Combo Fuji',9990,'combo','38 unidades',[],[component(10,'Sashimi de salmão'),component(10,'Niguiri de salmão'),component(8,'Uramaki de salmão com alho-poró'),component(5,'Joy de maracujá'),component(5,'Joy de pimenta-biquinho')]),
 product('combo-hiroshima','promos','Combo Hiroshima',15990,'combo','83 unidades anunciadas',['cola-extra'],[component(10,'Sashimi de salmão'),component(10,'Niguiri de salmão'),component(3,'Joy de pimenta-biquinho'),component(3,'Joy de geleia de maracujá'),component(3,'Joy tradicional com cream cheese'),component(10,'Hot Philadelphia'),component(8,'Hossomaki de salmão'),component(4,'Uramaki de tilápia com cebola crispy'),component(8,'Uramaki de kani com geleia de maracujá'),component(8,'Uramaki de skin com Doritos')],'A composição publicada soma 67 peças; confirmar a quantidade anunciada.'),
 product('combo-two-temakis','promos','Combo 2 Temakis + Coca-Cola',4990,'combo','2 temakis + Coca-Cola · 310 ml',['two-types','two-flavors','combo-cola'],[component(2,'Temaki com 90 g de salmão'),component(1,'Coca-Cola · 310 ml')]),
 product('combo-1','combos','Combo 1 (21 unidades)',2990,'combo','21 unidades',[],[component(4,'Hossomaki salmão'),component(4,'Hossomaki skin'),component(4,'Niguiri salmão'),component(4,'Uramaki de tilápia'),component(5,'Hot banana')]),
 product('combo-3','combos','Combo 3',2990,'combo','22 unidades',[],[component(5,'Hot Philadelphia'),component(4,'Hossomaki de tilápia com cream cheese'),component(5,'Hot banana'),component(4,'Hossomaki de salmão'),component(4,'Uramaki de kani')]),
 product('combo-4','combos','Combo 4',2990,'combo','22 unidades',[],[component(5,'Hot banana'),component(5,'Hot skin'),component(4,'Uramaki de kani'),component(4,'Hossomaki de salmão, cream cheese e pimenta-biquinho'),component(4,'Hossomaki de tilápia')]),
 product('combo-5','combos','Combo 5 (20 unidades)',6490,'combo','20 unidades',[],[component(5,'Joy de salmão com cream cheese'),component(5,'Joy de salmão, cream cheese e alho-poró'),component(5,'Joy de salmão, cream cheese e geleia de maracujá'),component(5,'Joy de salmão, cream cheese e pimenta-biquinho')]),
 product('combo-6','combos','Combo 6 (30 unidades)',4490,'combo','30 unidades',[],[component(5,'Hot skin'),component(10,'Hot Philadelphia'),component(10,'Hot banana com chocolate'),component(5,'Hot Philadelphia')]),
 product('combo-7','combos','Combo 7 (40 unidades)',6990,'combo','40 unidades',[],[component(10,'Hot skin'),component(10,'Hot Philadelphia'),component(10,'Hot banana com chocolate'),component(10,'Hot Philadelphia')]),
 product('ceviche-tilapia','ceviche','Ceviche Tilápia',3790,'ceviche','250 g'),product('ceviche-mixed','ceviche','Ceviche Tilápia e Salmão',4990,'ceviche','250 g'),product('ceviche-biquinho','ceviche','Ceviche Salmão com Pimenta Biquinho',5990,'ceviche','250 g'),product('ceviche-salmon','ceviche','Ceviche Salmão',5990,'ceviche','250 g'),
 product('temaki','temaki','Temaki',2990,'temaki','170 g',['temaki-flavor']),product('temaki-fried','temaki','Temaki Frito',3290,'fried-temaki','190 g',['temaki-flavor']),product('temaki-no-rice','temaki','Temaki Sem Arroz',4999,'no-rice-temaki',undefined,['temaki-flavor']),
 ...[['pepper','Gotas de Pimenta Chinesa'],['chive','Cebolinha'],['skin','Skin'],['jelly','Geleia de Pimenta']].map(([id,name])=>product(`big-small-${id}`,'big-small',id==='jelly'?'Big hot Salmão com Geleia de Pimenta (pequeno)':`Big hot Salmão, Cream Cheese e ${name} (pequeno)`,1990,'hot','40 g')),
 ...[['chive','Cebolinha'],['pepper','Gotas de Pimenta Chinesa'],['jelly','Geleia de Pimenta'],['skin','Skin'],['grilled','Grelhado Picante']].map(([id,name])=>product(`big-large-${id}`,'big-large',id==='jelly'?'Big hot Salmão com Geleia de Pimenta':id==='grilled'?'Big hot Salmão Grelhado Picante':`Big hot Salmão, Cream Cheese e ${name}`,3990,'hot','80 g')),
 product('sashimi','portions','Sashimis de Salmão',1990,'sashimi','5 unidades'),product('sashimi-seared','portions','Sashimis de Salmão Maçaricado',2490,'sashimi','5 unidades'),product('sashimi-lemon','portions','Sashimis de Salmão com Lemon Pepper',1990,'sashimi','5 unidades'),
 product('joy-cream','portions','Joys Salmão com Cream Cheese',1490,'joy','5 unidades'),product('joy-biquinho','portions','Joys Salmão com Cream Cheese e Pimenta Biquinho',1490,'joy','5 unidades'),product('joy-pepper','portions','Joys Salmão Macerado com Cream Cheese e Geleia de Pimenta',1490,'joy','5 unidades'),product('joy-tropical','portions','Joys Salmão Tropical',1490,'joy','5 unidades'),product('joy-rice','portions','Joys Salmão com Arroz',1490,'joy','5 unidades'),
 product('nigiri','portions','Nigiris Salmão',1590,'nigiri','5 unidades'),product('nigiri-seared','portions','Nigiris Salmão Maçaricado',1590,'nigiri','5 unidades'),product('nigiri-skin','portions','Nigiris Skin com Limão, Cream Cheese',1590,'nigiri','5 unidades'),
 product('hosso-salmon','portions','Hossomakis Salmão com Cream Cheese',1090,'hossomaki','4 unidades',['salmon-roll']),product('hosso-kani','portions','Hossomakis Kani',1090,'hossomaki','4 unidades',['kani-roll']),product('hosso-skin','portions','Hossomakis Skin',1090,'hossomaki','4 unidades'),
 product('ura-salmon','portions','Uramakis Salmão',1090,'uramaki',undefined,['salmon-roll']),product('ura-kani','portions','Uramakis Kani',1090,'uramaki','4 unidades',['kani-roll']),product('ura-skin','portions','Uramakis Skin',1090,'uramaki','4 unidades'),
 product('dragon-kani','portions','Dragons Kani, Cream Cheese e Salmão',1890,'dragon','4 unidades'),product('dragon-skin','portions','Dragons Skin, Cream Cheese e Salmão',1890,'dragon','4 unidades'),product('hot-philadelphia','portions','Hot Philadelphia',1090,'hot'),product('hot-philadelphia-jelly','portions','Hot Philadelphia com Geleia de Pimenta',1590,'hot','5 unidades'),product('hot-skin','portions','Hot Skin',1090,'hot'),product('hot-banana','portions','Hot de Banana com Chocolate',1090,'hot'),
 ...[['coca','Coca Cola','310 ml'],['coca-zero','Coca Cola Zero','310 ml'],['sprite','Sprite','310 ml'],['sprite-zero','Sprite Zero','310 ml'],['fanta','Fanta Laranja','310 ml'],['fanta-zero','Fanta Laranja Zero','310 ml'],['guarana','Guaraná Antártica','350 ml'],['guarana-zero','Guaraná Antartica Zero','350 ml']].map(([id,name,portion])=>product(id,'soft-drinks',name,700,'drink',portion)),
 ...[['heineken','Heineken'],['corona','Corona'],['corona-zero','Corona Zero'],['stella','Stella Artois Sem Glúten']].map(([id,name])=>product(id,'beer',name,1200,'beer','330 ml')),
 product('sparkling-water','water','Água c/ Gás',400,'drink','500 ml'),product('italian-soda','water','Soda Italiana',1500,'soda','750 ml',['soda-flavor']),
 product('tare-extra','sauces','Molho Tarê (Teriaky)',200,'sauce','1 unidade'),product('shoyu-extra','sauces','Molho Shoyu',200,'sauce','1 unidade'),product('additional','sauces','ADICIONAL',100,'extra',undefined,[],undefined,'Adicional sem descrição na referência.')
];
export function getMenuProduct(id:string){return valentsProducts.find(product=>product.id===id)}
export const initialMenu=(id:string):MenuCustomization=>{
 const item=getMenuProduct(id);if(!item)return {id,choices:{},notes:''};
 const choices:MenuCustomization['choices']={};
 for(const groupId of item.groups){const group=menuGroups[groupId];if(group.originalOption){const count=group.componentIndex!==undefined?item.components?.[group.componentIndex]?.count||0:1;choices[groupId]={[group.originalOption]:count}}}
 return {id,choices,notes:''};
};
export function comboComponents(menu:MenuCustomization){
 const item=getMenuProduct(menu.id);if(!item?.components)return [];
 return item.components.flatMap((piece,index)=>{
  const groupId=comboGroupId(item.id,index),group=menuGroups[groupId];if(!group)return [piece];
  const choices=group.options.filter(choice=>(menu.choices[groupId]?.[choice.id]||0)>0).map(choice=>({name:choice.name,count:menu.choices[groupId][choice.id]}));
  return choices.length?choices:[piece];
 });
}
export function validateMenu(menu:MenuCustomization):string|null{
 if(!menu||typeof menu!=='object'||typeof menu.id!=='string')return 'Produto inválido.';
 const item=getMenuProduct(menu.id);if(!item)return 'Produto não encontrado.';
 if(typeof menu.notes!=='string'||menu.notes.length>500||!menu.choices||typeof menu.choices!=='object'||Array.isArray(menu.choices))return 'Configuração inválida.';
 for(const [groupId,choices]of Object.entries(menu.choices)){
  if(!item.groups.includes(groupId)||!choices||typeof choices!=='object'||Array.isArray(choices))return 'Grupo inválido.';
  for(const [optionId,count]of Object.entries(choices))if(!menuGroups[groupId].options.some(option=>option.id===optionId)||!Number.isInteger(count)||count<0||count>menuGroups[groupId].max)return 'Seleção inválida.';
 }
 for(const id of item.groups){const group=menuGroups[id];const count=Object.values(menu.choices[id]||{}).reduce((sum,n)=>sum+n,0);if(count<group.min||count>group.max)return `${group.name}: escolha ${group.min===group.max?group.min:`até ${group.max}`} opção(ões).`}
 return null;
}
export function menuPrice(menu:MenuCustomization){const item=getMenuProduct(menu.id)!;return item.price+item.groups.reduce((sum,id)=>sum+menuGroups[id].options.reduce((subtotal,option)=>subtotal+option.price*(menu.choices[id]?.[option.id]||0),0),0)}
export function menuDescription(menu:MenuCustomization){const item=getMenuProduct(menu.id)!;const selected=item.groups.filter(id=>menuGroups[id].componentIndex===undefined).flatMap(id=>menuGroups[id].options.filter(option=>menu.choices[id]?.[option.id]).map(option=>`${menu.choices[id][option.id]>1?`${menu.choices[id][option.id]}× `:''}${option.name}`));const composition=comboComponents(menu).map(piece=>`${piece.count}× ${piece.name}`);return [item.portion,...(item.kind==='combo'?composition:[]),...selected,menu.notes?`Obs.: ${menu.notes}`:''].filter(Boolean).join(' · ')||item.name}
export function menuIngredientText(item:MenuProduct){return item.components?item.components.map(component=>`${component.count}× ${component.name}`).join(' · '):item.name}
