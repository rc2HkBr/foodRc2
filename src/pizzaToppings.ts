// Generated photographic cutouts share an overhead camera and warm upper-left light.
export const pizzaToppings:Record<string,{size:number;count:number;asset:string}> = {
 mozzarella:{size:356,count:1,asset:'mozzarella'},
 calabresa:{size:53,count:14,asset:'calabresa'},
 pepperoni:{size:49,count:16,asset:'pepperoni'},
 bacon:{size:34,count:21,asset:'bacon'},
 chicken:{size:39,count:20,asset:'chicken'},
 catupiry:{size:42,count:13,asset:'catupiry'},
 cheddar:{size:45,count:15,asset:'cheddar'},
 corn:{size:13,count:44,asset:'corn'},
 olive:{size:20,count:20,asset:'olive'},
 onion:{size:51,count:12,asset:'onion'},
 tomato:{size:60,count:10,asset:'tomato'},
 basil:{size:43,count:7,asset:'basil'},
};
export const toppingCount=(id:string,quantity:number)=>id==='mozzarella'?(quantity>0?1:0):(pizzaToppings[id]?.count||0)*quantity;
export const toppingAsset=(id:string)=>`/ingredients/${pizzaToppings[id]?.asset||id}.webp`;
export function toppingPosition(id:string,index:number){
 const spec=pizzaToppings[id];
 if(id==='mozzarella')return {x:250,y:250,angle:0,size:spec.size};
 const seed=[...id].reduce((n,c)=>n+c.charCodeAt(0),0);
 const dose=Math.floor(index/spec.count),within=index%spec.count;
 // Each dose fills the whole sauce area. Extra ingredients never move existing ones.
 const radius=Math.sqrt((within+.5)/spec.count)*146;
 const angle=within*2.399963229728653+seed*.071+dose*.83;
 return {x:250+Math.cos(angle)*radius,y:250+Math.sin(angle)*radius,angle:(index*137.5+seed)%360,size:spec.size*(.88+((index*7)%9)/36)};
}
