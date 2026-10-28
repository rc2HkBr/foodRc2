import { useEffect, useState } from 'react';
import type { Configuration } from './catalog';
import { catalog, pizzaSize, store } from './catalog';
import { toppingAsset, toppingCount, toppingPosition } from './pizzaToppings';
import { TemakiFilling } from './TemakiFilling';
import { PipedCheese } from './PipedCheese';

function useVisualCounts(counts:Record<string,number>){
 const [retained,setRetained]=useState(counts);
 useEffect(()=>{
  setRetained(previous=>Object.fromEntries([...new Set([...Object.keys(previous),...Object.keys(counts)])].map(id=>[id,Math.max(previous[id]||0,counts[id]||0)])));
  const timer=setTimeout(()=>setRetained(counts),160);
  return ()=>clearTimeout(timer);
 },[counts]);
 return Object.fromEntries([...new Set([...Object.keys(retained),...Object.keys(counts)])].map(id=>[id,Math.max(retained[id]||0,counts[id]||0)]));
}

export function PizzaVisual({config}:{config:Configuration}){
 const counts=useVisualCounts(config.ingredients);
 const size=pizzaSize(config.option);
 const scale=size.diameter/Math.max(...Object.values(store.options.pizza).map(option=>option.diameter));
 const order=['mozzarella','chicken','calabresa','pepperoni','bacon','onion','corn','olive','tomato','catupiry','cheddar','basil'];
 return <svg viewBox="0 0 500 500" role="img" aria-label={`Sua pizza de ${size.diameter} cm, ${config.sliced?`fatiada em ${size.slices} fatias`:'inteira, sem cortes'}`} className="food-svg pizza-art" data-pizza-size={config.option}>
  <defs><filter id="pizza-shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity=".18"/></filter></defs>
  <g className="pizza-size" transform={`translate(250 250) scale(${scale}) translate(-250 -250)`}>
  <image href="/pizza-base.png" x="26" y="26" width="448" height="448" filter="url(#pizza-shadow)"/>
  {order.map(id=><g key={id} className={`ingredient-layer ${config.ingredients[id]?'active':''}`} data-ingredient={id}>
   {id==='catupiry'||id==='cheddar'?<PipedCheese kind={id} quantity={counts[id]||0} visibleQuantity={config.ingredients[id]||0}/>:Array.from({length:toppingCount(id,counts[id]||0)},(_,n)=>{const {x,y,angle,size}=toppingPosition(id,n);return <g key={n} style={{opacity:n<toppingCount(id,config.ingredients[id]||0)?1:0,transition:'opacity .15s'}}>
    <g transform={`translate(${x} ${y}) rotate(${angle})`} className="topping"><g><image href={toppingAsset(id)} x={-size/2} y={-size/2} width={size} height={size} className="photo-topping" opacity={id==='mozzarella'&&config.ingredients[id]===1?.92:1}/></g></g>
   </g>})}
  </g>)}
  {config.sliced?<g className="pizza-cuts" data-pizza-cuts={size.slices} aria-hidden="true">
   {Array.from({length:size.slices},(_,index)=>{
    const angle=index*Math.PI*2/size.slices-Math.PI/2;
    const path=`M250 250L${250+Math.cos(angle)*204} ${250+Math.sin(angle)*204}`;
    return <g key={index}><path d={path} stroke="#663421" strokeWidth="1.3" strokeLinecap="round" opacity=".4"/><path d={path} stroke="#f2ce97" strokeWidth=".5" opacity=".35"/></g>;
   })}
  </g>:null}
  </g>
 </svg>;
}

const burgerOrder=['sauce','chicken','beef','cheese','cheddar','lettuce','tomato','redOnion','pickle','bacon','egg'];
const burgerLayerSize:Record<string,{x:number;width:number;height:number;y:number;rise:number}>={
 sauce:{x:91,width:318,height:72,y:210,rise:22},lettuce:{x:65,width:370,height:104,y:298,rise:26},
 tomato:{x:84,width:332,height:95,y:299,rise:22},redOnion:{x:84,width:332,height:87,y:291,rise:18},
 pickle:{x:89,width:322,height:62,y:298,rise:17},chicken:{x:88,width:324,height:99,y:265,rise:42},
 beef:{x:84,width:332,height:175,y:232,rise:62},cheese:{x:84,width:332,height:131,y:246,rise:36},
 cheddar:{x:84,width:332,height:86,y:262,rise:28},bacon:{x:88,width:324,height:105,y:204,rise:32},
 egg:{x:91,width:318,height:101,y:225,rise:32}
};
export function BurgerVisual({config}:{config:Configuration}){
 const counts=useVisualCounts(config.ingredients);
 const layers=[...catalog.burger].sort((a,b)=>burgerOrder.indexOf(a.id)-burgerOrder.indexOf(b.id)).flatMap(i=>Array.from({length:counts[i.id]||0},(_,n)=>({...i,key:i.id+n,leaving:n>=(config.ingredients[i.id]||0)})));
 const extraLayers=layers.filter((layer,index)=>layers.findIndex(candidate=>candidate.id===layer.id)!==index).length;
 const bunFilter=config.option==='australiano'?'sepia(.5) saturate(1.35) brightness(.58)':config.option==='tradicional'?'saturate(.65) brightness(1.12)':undefined;
 return <svg viewBox="0 0 500 500" role="img" aria-label="Seu hambúrguer em camadas" className="food-svg burger-photo">
  <defs><filter id="burger-shadow"><feDropShadow dx="0" dy="10" stdDeviation="8" floodColor="#49301b" floodOpacity=".2"/></filter><radialGradient id="burger-board" cx="48%" cy="34%"><stop stopColor="#d5a66d"/><stop offset=".72" stopColor="#b9804c"/><stop offset="1" stopColor="#8c5935"/></radialGradient></defs>
  <ellipse cx="250" cy="405" rx="211" ry="88" fill="url(#burger-board)" stroke="#875735" strokeWidth="8" filter="url(#burger-shadow)"/>
  <ellipse cx="250" cy="405" rx="197" ry="74" fill="none" stroke="#e2b77f" strokeWidth="2" opacity=".55"/>
  <path d="M57 399q71-22 131-7t116 0q63-18 137 4M81 430q69-17 119-5t104 0q59-14 117 2" fill="none" stroke="#774b2d" strokeWidth="2" opacity=".19"/>
  <ellipse cx="250" cy="435" rx="166" ry="15" fill="#51341f" opacity=".17"/>
  <image href="/ingredients/burger-bun-bottom-v2.webp" x="76" y="349" width="348" height="122" preserveAspectRatio="none" style={{filter:bunFilter}}/>
  <g filter="url(#burger-shadow)">
  {layers.map(i=>{const spec=burgerLayerSize[i.id],duplicate=Number(i.key.slice(i.id.length));const y=spec.y-duplicate*spec.rise;return <g key={i.key} className="burger-photo-layer" style={{opacity:i.leaving?0:1,transform:`translateY(${y}px)`}} data-ingredient={i.id}>
   <image href={`/ingredients/burger-${i.id}${['beef','cheese','sauce'].includes(i.id)?'-v2':''}.webp`} x={spec.x} y="0" width={spec.width} height={spec.height} preserveAspectRatio="none"/>
  </g>})}
  <g className="bun-top" style={{transform:`translateY(${Math.max(28,72-extraLayers*10)}px)`}}><image href="/ingredients/burger-bun-top-v2.webp" x="70" y="0" width="360" height="188" preserveAspectRatio="none" style={{filter:bunFilter}}/></g>
  </g>
 </svg>;
}

function SushiFilling({config,x,y,scale=1}:{config:Configuration;x:number;y:number;scale?:number}){
 const fillings=catalog.sushi.filter(i=>i.group==='Recheios'&&config.ingredients[i.id]);
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  {fillings.map((i,n)=><image key={i.id} className="sushi-filling" href={`/ingredients/sushi-${i.id}.webp`} x={fillings.length===1?-20:-29+n*23} y={-15+n*2} width={fillings.length===1?41:34} height="32"/>)}
  {config.ingredients.cream?<image href="/ingredients/sushi-cream.webp" x="-9" y="-1" width="20" height="18"/>:null}
  {config.ingredients.chive?<g fill="#3f6834">{Array.from({length:7},(_,n)=><rect key={n} x={-14+(n*7)%29} y={-12+(n*11)%24} width="4" height="2.5" rx=".7" transform={`rotate(${n*29})`}/>)}</g>:null}
 </g>;
}

function SushiGarnish({config,x,y,scale=1}:{config:Configuration;x:number;y:number;scale?:number}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  {config.ingredients.sesame?Array.from({length:19},(_,n)=><ellipse key={n} cx={Math.cos(n*2.4)*37} cy={Math.sin(n*2.4)*23} rx="1.8" ry=".8" transform={`rotate(${n*37} ${Math.cos(n*2.4)*37} ${Math.sin(n*2.4)*23})`} fill={n%3?'#d1ae71':'#5c4931'}/>):null}
  {config.ingredients.tare||config.ingredients.spicy?<g strokeLinecap="round" fill="none"><path d="M-35-6Q-13-16 5-5T35-4M-30 4Q-10-5 10 5T29 7" stroke={config.ingredients.tare?'#4d2517':'#e0a070'} strokeWidth={config.ingredients.tare?3:4.5}/><path d="M-32-7Q-13-16 4-6T32-5" stroke={config.ingredients.tare?'#a06b3e':'#f5c4a0'} strokeWidth=".7" opacity=".8"/></g>:null}
 </g>;
}

export function SushiVisual({config}:{config:Configuration}){
 const temaki=config.option==='temaki';
 return <svg viewBox="0 0 500 500" role="img" aria-label={temaki?'Seu temaki em perspectiva':'Suas oito peças de sushi em corte'} className="food-svg sushi-photo">
  <defs>
   <filter id="sushi-shadow"><feDropShadow dx="1" dy="6" stdDeviation="4" floodOpacity=".15"/></filter>
   <clipPath id="sushi-core"><ellipse cx="0" cy="-16" rx={config.option==='hossomaki'?13:23} ry={config.option==='hossomaki'?10:16}/></clipPath>
  </defs>
  {temaki?<ellipse cx="250" cy="390" rx="125" ry="13" fill="#75624a" opacity=".08"/>:null}
  {temaki?<g filter="url(#sushi-shadow)">
   <image href="/ingredients/sushi-temaki.webp" x="100" y="97" width="300" height="300"/>
   <TemakiFilling config={config}/>
   <SushiGarnish config={config} x={212} y={183} scale={2}/>
  </g>:Array.from({length:8},(_,n)=>{
   const x=93+(n%4)*101+(n>=4?12:0),y=190+Math.floor(n/4)*101;
   return <g key={n} transform={`translate(${x} ${y})`} filter="url(#sushi-shadow)">
    <image href={`/ingredients/sushi-${config.option}.webp`} x="-48" y="-44" width="96" height="100" preserveAspectRatio="none"/>
    <g clipPath="url(#sushi-core)"><SushiFilling config={config} x={0} y={-16}/></g>
    <SushiGarnish config={config} x={0} y={-14}/>
   </g>;
  })}
 </svg>;
}

export function FoodVisual({config}:{config:Configuration}){
 return config.category==='pizza'?<PizzaVisual config={config}/>:config.category==='burger'?<BurgerVisual config={config}/>:<SushiVisual config={config}/>;
}
