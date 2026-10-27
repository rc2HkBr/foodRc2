import { useEffect, useState } from 'react';
import type { Configuration } from './catalog';
import { catalog } from './catalog';
import { toppingAsset, toppingCount, toppingPosition } from './pizzaToppings';
import { TemakiFilling } from './TemakiFilling';

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
 const order=['mozzarella','cheddar','chicken','calabresa','pepperoni','bacon','onion','corn','olive','tomato','catupiry','basil'];
 return <svg viewBox="0 0 500 500" role="img" aria-label="Sua pizza vista de cima" className="food-svg pizza-art">
  <defs><filter id="pizza-shadow"><feDropShadow dx="0" dy="12" stdDeviation="10" floodOpacity=".18"/></filter></defs>
  <image href="/pizza-base.png" x="26" y="26" width="448" height="448" filter="url(#pizza-shadow)"/>
  {order.map(id=><g key={id} className={`ingredient-layer ${config.ingredients[id]?'active':''}`} data-ingredient={id}>
   {Array.from({length:toppingCount(id,counts[id]||0)},(_,n)=>{const {x,y,angle,size}=toppingPosition(id,n);return <g key={n} style={{opacity:n<toppingCount(id,config.ingredients[id]||0)?1:0,transition:'opacity .15s'}}>
    <g transform={`translate(${x} ${y}) rotate(${angle})`} className="topping"><g><image href={toppingAsset(id)} x={-size/2} y={-size/2} width={size} height={size} className="photo-topping" opacity={id==='mozzarella'&&config.ingredients[id]===1?.92:1}/></g></g>
   </g>})}
  </g>)}
 </svg>;
}

const burgerOrder=['sauce','lettuce','tomato','redOnion','pickle','beef','chicken','cheddar','cheese','bacon','egg'];
const burgerHeight:Record<string,number>={sauce:7,lettuce:17,tomato:18,redOnion:10,pickle:11,beef:35,chicken:36,cheddar:14,cheese:13,bacon:18,egg:21};
export function BurgerVisual({config}:{config:Configuration}){
 const counts=useVisualCounts(config.ingredients);
 const layers=[...catalog.burger].sort((a,b)=>burgerOrder.indexOf(a.id)-burgerOrder.indexOf(b.id)).flatMap(i=>Array.from({length:counts[i.id]||0},(_,n)=>({...i,key:i.id+n,leaving:n>=(config.ingredients[i.id]||0)})));
 const stackHeight=layers.reduce((height,i)=>height+burgerHeight[i.id],0);
 const compression=Math.min(1,235/Math.max(stackHeight,1));
 let cursor=366;
 const bunFilter=config.option==='australiano'?'sepia(.5) saturate(1.35) brightness(.58)':config.option==='tradicional'?'saturate(.65) brightness(1.12)':undefined;
 return <svg viewBox="0 0 500 500" role="img" aria-label="Seu hambúrguer em camadas" className="food-svg burger-photo">
  <ellipse cx="250" cy="409" rx="164" ry="18" fill="#69503a" opacity=".12"/>
  <image href="/ingredients/burger-bun-bottom.webp" x="76" y="357" width="348" height="53" preserveAspectRatio="none" style={{filter:bunFilter}}/>
  {layers.map(i=>{const height=burgerHeight[i.id]*compression;cursor-=height;const y=cursor;return <g key={i.key} className="burger-photo-layer" style={{opacity:i.leaving?0:1,transform:`translateY(${y}px)`}} data-ingredient={i.id}>
   <image href={`/ingredients/burger-${i.id}.webp`} x={i.id==='lettuce'?65:78} y="-7" width={i.id==='lettuce'?370:344} height={height+17} preserveAspectRatio="none"/>
  </g>})}
  <g className="bun-top" style={{transform:`translateY(${366-stackHeight*compression-94}px)`}}><image href="/ingredients/burger-bun-top.webp" x="70" y="0" width="360" height="112" preserveAspectRatio="none" style={{filter:bunFilter}}/></g>
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
