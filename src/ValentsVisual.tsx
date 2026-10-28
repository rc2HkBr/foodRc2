import {useId} from 'react';
import {TemakiFilling} from './TemakiFilling';
import {comboComponents,getMenuProduct,menuGroups,type MenuCustomization,type MenuKind} from './valentsMenu';
import type {Configuration} from './catalog';

function selected(menu:MenuCustomization){return Object.entries(menu.choices).flatMap(([groupId,choices])=>Object.entries(choices).filter(([,n])=>n>0).map(([id])=>id+' '+(menuGroups[groupId]?.options.find(option=>option.id===id)?.name||''))).join(' ').toLowerCase()}
function flavor(menu:MenuCustomization){const item=getMenuProduct(menu.id)!;return (selected(menu)||item.name).toLowerCase()}
function fishAsset(text:string){return text.includes('skin')?'menu-skin':text.includes('kani')&&!text.includes('salm')?'sushi-kani':text.includes('tilápia')||text.includes('tilapia')?'menu-tilapia':'sushi-salmon'}
function hasCream(text:string){return /cream|creme|philadelphia/.test(text)}

function Garnish({text,x=0,y=-15,scale=1}:{text:string;x?:number;y?:number;scale?:number}){
 return <g transform={`translate(${x} ${y}) scale(${scale})`}>
  {/cebol|chive|alho|leek/.test(text)&&<image href="/ingredients/temaki-chive.webp" x="-18" y="-10" width="30" height="20"/>}
  {/pimenta|pepper|spicy|biquinho/.test(text)&&<g fill="#bd3c27"><path d="M-9-3Q-20-18-6-22Q8-20 2-7Z"/><path d="M12 7Q3-8 17-10Q27-4 22 5Z"/></g>}
  {/maracu|passion|tropical/.test(text)&&<><ellipse cx="0" cy="-3" rx="20" ry="11" fill="#df9f29" opacity=".85"/>{[0,1,2,3,4].map(n=><ellipse key={n} cx={-12+n*6} cy={Math.sin(n*2)*6-3} rx="1.8" ry="1.3" fill="#594222"/>)}</>}
  {/doritos|crispy/.test(text)&&[0,1,2,3].map(n=><path key={n} d={`M${-20+n*11} -10l8 4-6 6Z`} fill={text.includes('doritos')?'#e3a13b':'#a46a35'}/>)}
 </g>;
}

function MenuTemaki({menu,kind}:{menu:MenuCustomization;kind:MenuKind}){
 const text=flavor(menu),skin=text.includes('skin');
 const ingredients:Record<string,number>={[text.includes('kani')&&!text.includes('salm')?'kani':'salmon']:1};
 if(hasCream(text))ingredients.cream=1;if(/cebol|chive/.test(text))ingredients.chive=1;
 const config:Configuration={category:'sushi',option:'temaki',ingredients,portions:1};
 const base=kind==='fried-temaki'?'menu-temaki-fried':kind==='no-rice-temaki'?'menu-temaki-no-rice':'sushi-temaki';
 return <g>
  <image href={`/ingredients/${base}.webp`} x="100" y="97" width="300" height="300"/>
  {!skin?<TemakiFilling config={config}/>:<g>{Array.from({length:14},(_,n)=>{const angle=n*2.399963,r=Math.sqrt((n+.5)/14);return <image key={n} href="/ingredients/menu-skin.webp" x={194+Math.cos(angle)*r*65} y={165+Math.sin(angle)*r*43} width="43" height="34"/>})}{hasCream(text)&&[0,1,2,3,4].map(n=><image key={n} href="/ingredients/sushi-cream.webp" x={168+n*16} y={161+Math.sin(n*2)*30} width="30" height="22"/>)}</g>}
  <Garnish text={text.replace(/cebol|chive/g,'')} x={213} y={179} scale={2}/>
 </g>;
}

function Piece({kind,text,x,y,scale=1,clipId}:{kind:MenuKind;text:string;x:number;y:number;scale?:number;clipId:string}){
 const base=kind==='sashimi'?'menu-sashimi':kind==='nigiri'?'menu-nigiri':kind==='joy'?'menu-joy':kind==='hot'?'menu-hot':kind==='hossomaki'?'sushi-hossomaki':'sushi-uramaki';
 const filled=['hot','hossomaki','uramaki','dragon'].includes(kind);
 return <g transform={`translate(${x} ${y}) scale(${scale})`} style={{filter:'drop-shadow(1px 5px 3px #49341d18)'}}>
  <image href={`/ingredients/${base}.webp`} x="-48" y="-44" width="96" height="100" preserveAspectRatio="none" style={{filter:/maçaricado|grelhado/.test(text)?'saturate(.72) sepia(.18) brightness(.95)':undefined}}/>
  {filled&&<g clipPath={`url(#${clipId})`}><image href={`/ingredients/${fishAsset(text)}.webp`} x="-26" y="-34" width="52" height="41"/>{hasCream(text)&&<image href="/ingredients/sushi-cream.webp" x="-4" y="-18" width="22" height="19"/>}</g>}
  {kind==='nigiri'&&text.includes('skin')&&<image href="/ingredients/menu-skin.webp" x="-41" y="-41" width="82" height="52"/>}
  {kind==='dragon'&&<image href="/ingredients/menu-sashimi.webp" x="-46" y="-44" width="92" height="51"/>}
  <Garnish text={text}/>
 </g>;
}

function Drink({menu,kind,id}:{menu:MenuCustomization;kind:MenuKind;id:string}){
 const item=getMenuProduct(menu.id)!,text=flavor(menu),name=item.name.toLowerCase(),zero=name.includes('zero'),water=item.id==='sparkling-water';
 const color=water?'#a5c9d4':kind==='beer'?'#cda547':kind==='soda'?text.includes('morango')?'#db756c':text.includes('maçã')?'#a6be69':text.includes('maracujá')?'#e3ac57':'#e3ac57':/coca/.test(name)?zero?'#302729':'#b74335':/sprite/.test(name)?zero?'#304239':'#63964b':/fanta/.test(name)?zero?'#83542d':'#de842d':/guarana/.test(name)?zero?'#293d31':'#40724a':'#b74335';
 const beverageName=kind==='soda'?'Soda italiana':item.name.replace(/\s*[·•].*$/,'').split(' ').slice(0,2).join(' ');
 return <g><defs><linearGradient id={id}><stop stopColor={color}/><stop offset=".4" stopColor={color}/><stop offset=".65" stopColor="#ffffff55"/><stop offset="1" stopColor={color}/></linearGradient></defs><ellipse cx="250" cy="407" rx="93" ry="15" fill="#7b6d5522"/>
  {kind==='beer'||water?<><path d="M222 80h56v103q32 29 32 62v140q0 19-20 19h-80q-20 0-20-19V245q0-33 32-62Z" fill={`url(#${id})`} stroke="#61714d" strokeWidth="2"/><rect x="220" y="75" width="60" height="17" rx="4" fill={kind==='beer'?'#c3b06c':'#dce8e7'}/><rect x="199" y="251" width="102" height="92" rx="5" fill="#fff7e5" opacity=".9"/></>:kind==='soda'?<><path d="M163 149h174l-24 245H187Z" fill={`url(#${id})`} stroke="#b8b9a2" strokeWidth="2" opacity=".9"/><ellipse cx="250" cy="149" rx="87" ry="15" fill="#f5e8cb" stroke="#b7b7a5" strokeWidth="2"/>{Array.from({length:6},(_,n)=><rect key={n} x={190+n*17%85} y={182+n*31%140} width="26" height="22" rx="5" fill="#fffbeb66" transform={`rotate(${n*17} 250 250)`}/>)}<path d="M296 98l-12 141" stroke="#e8d3aa" strokeWidth="7"/></>:<><rect x="172" y="117" width="156" height="278" rx="23" fill={`url(#${id})`} stroke="#b8a797" strokeWidth="2"/><ellipse cx="250" cy="123" rx="75" ry="16" fill={zero?'#c7c1b7':'#ddd5c9'} stroke="#a99c8c"/><ellipse cx="250" cy="121" rx="30" ry="8" fill="#a69c90"/><path d="M199 151v210" stroke="#ffffff2b" strokeWidth="9"/><rect x="184" y="245" width="132" height="82" rx="12" fill={zero?'#252123':'#a82d28'} opacity=".92"/></>}
  <text x="250" y={kind==='soda'?278:kind==='beer'||water?288:zero?274:284} textAnchor="middle" fill={kind==='beer'||water?'#3a4a35':'#fff8e9'} fontSize={zero?16:17} fontFamily="Georgia,serif">{kind==='soda'?text.replace(/soda italiana/i,'Soda italiana'):kind==='beer'||water?beverageName:beverageName}</text><text x="250" y={kind==='soda'?308:kind==='beer'||water?316:zero?299:310} textAnchor="middle" fill={kind==='beer'||water?'#5e654f':'#fff8e9'} fontSize="11">{kind==='soda'?item.portion:zero?'ZERO':item.portion}</text>
 </g>;
}

function ComboDrinks({menu}:{menu:MenuCustomization}){
 const choices=menu.choices['cola-extra']||{},drinks=(['original','zero'] as const).flatMap(type=>Array.from({length:Math.min(2,choices[type]||0)},(_,n)=>({type,n,count:choices[type]||0})));
 return <g>{drinks.map(({type,n,count},index)=><g key={`${type}-${n}`} transform={`translate(${326+index*38} 384) scale(.2)`}><Drink menu={{id:type==='zero'?'coca-zero':'coca',choices:{},notes:''}} kind="drink" id={`combo-extra-${menu.id}-${type}-${n}`}/>{count>2&&n===1&&<text x="245" y="430" textAnchor="middle" fontSize="42" fill="#302a24">+{count-2}</text>}</g>)}</g>;
}
function TwoTemakiCombo({menu,id}:{menu:MenuCustomization;id:string}){
 const flavors:string[]=Object.entries(menu.choices['two-flavors']||{}).flatMap(([flavor,count])=>Array.from({length:count},()=>flavor)),friedCount=menu.choices['two-types']?.fried||0;
 return <g>{[0,1].map(n=>{const chosen=flavors[n],preview:MenuCustomization={...menu,id:'temaki',choices:chosen?{'temaki-flavor':{[chosen]:1}}:{}};return <g key={n} transform={`translate(${n?180:-35} 70) scale(.65)`}><MenuTemaki menu={preview} kind={n<friedCount?'fried-temaki':'temaki'}/></g>})}<g transform="translate(287 183) scale(.34)"><Drink menu={{id:menu.choices['combo-cola']?.zero?'coca-zero':'coca',choices:{},notes:''}} kind="drink" id={`combo-drink-${id}`}/></g></g>;
}

function ComboPlate({menu,clipId}:{menu:MenuCustomization;clipId:string}){
 const pieces=comboComponents(menu),columns=pieces.length>6?4:3,hasDrink=Object.values(menu.choices['cola-extra']||{}).some(count=>count>0),rows=Math.ceil(pieces.length/columns),startY=112,endY=hasDrink?330:408,rowStep=rows>1?(endY-startY)/(rows-1):0,scale=Math.min(columns===3?.9:.7,(rowStep||90)/165);
 return <g><rect x="38" y="48" width="424" height="430" rx="24" fill="#d8c4a1" stroke="#c6ae87" strokeWidth="2"/><rect x="48" y="58" width="404" height="410" rx="19" fill="#e7d5b5"/>{pieces.map((component,n)=>{
  const lower=component.name.toLowerCase(),kind:MenuKind=lower.includes('sashimi')?'sashimi':lower.includes('joy')?'joy':lower.includes('niguiri')||lower.includes('nigiri')?'nigiri':lower.includes('hot')?'hot':lower.includes('hosso')?'hossomaki':lower.includes('dragon')?'dragon':'uramaki';
  const x=96+(n%columns)*(308/(columns-1)),y=startY+Math.floor(n/columns)*rowStep,count=Math.min(component.count,4),positions=count===1?[[0,0]]:count===2?[[-17,3],[17,-3]]:count===3?[[-22,7],[0,-7],[22,7]]:[[-17,-12],[17,-12],[-17,12],[17,12]];
  return <g key={`${component.name}-${n}`}>{positions.map(([dx,dy],piece)=><Piece key={piece} kind={kind} text={lower} x={x+dx} y={y+dy} scale={scale} clipId={clipId}/>)}<text x={x+28} y={y+36*scale} fontSize="12" fontWeight="600" fill="#5b503f">{component.count}{String.fromCharCode(215)}</text></g>
 })}<ComboDrinks menu={menu}/></g>;
}

export function MenuArt({menu,compact=false}:{menu:MenuCustomization;compact?:boolean}){
 const id=useId().replace(/:/g,''),item=getMenuProduct(menu.id);
 if(!item)return null;
 const text=flavor(menu),kind=item.kind,clipId=`menu-core-${id}`;
 const count=Math.min(8,Number(item.portion?.match(/^(\d+) unidades/)?.[1]||1));
 return <svg viewBox="0 0 500 500" role="img" aria-label={`Prévia ilustrativa de ${item.name}`} className={`food-svg menu-food-art ${compact?'compact':''}`}>
  <defs><clipPath id={clipId}><ellipse cx="0" cy="-16" rx="23" ry="16"/></clipPath></defs>
  {['temaki','fried-temaki','no-rice-temaki'].includes(kind)?<MenuTemaki menu={menu} kind={kind}/>:['drink','beer','soda'].includes(kind)?<Drink menu={menu} kind={kind} id={`drink-${id}`}/>:kind==='ceviche'?<g><image href="/ingredients/menu-ceviche-bowl.webp" x="60" y="125" width="380" height="300"/>{Array.from({length:24},(_,n)=>{const a=n*2.399963,r=Math.sqrt((n+.5)/24);return <image key={n} href={`/ingredients/${/tilapia e salmão|tilapia,? salmão|misto/.test(text)?(n%2?'sushi-salmon':'menu-tilapia'):/tilápia|tilapia/.test(text)?'menu-tilapia':'sushi-salmon'}.webp`} x={225+Math.cos(a)*r*112} y={220+Math.sin(a)*r*58} width="55" height="44"/>})}{[0,1,2,3,4,5].map(n=><Garnish key={n} text={text+' cebolinha'} x={172+n*30} y={230+Math.sin(n*2)*38}/>)}</g>:kind==='combo'?<g>{item.id==='combo-two-temakis'?<TwoTemakiCombo menu={menu} id={id}/>:<ComboPlate menu={menu} clipId={clipId}/>}</g>:kind==='sauce'||kind==='extra'?<g><ellipse cx="250" cy="318" rx="135" ry="70" fill="#c1b091" opacity=".2"/><path d="M134 235h232l-22 100q-94 62-188 0Z" fill="#d6bca0"/><ellipse cx="250" cy="235" rx="116" ry="55" fill={item.id==='tare-extra'?'#4a281a':'#382c23'} stroke="#e4d0b6" strokeWidth="9"/><ellipse cx="228" cy="220" rx="57" ry="19" fill="#a48260" opacity=".2"/></g>:Array.from({length:count},(_,n)=><Piece key={n} kind={kind} text={text} x={count===1?250:count<=4?130+(n%2)*205:100+(n%3)*150} y={count===1?245:count<=4?185+Math.floor(n/2)*150:175+Math.floor(n/3)*145} scale={count===1?(item.category==='big-large'?2.6:2):1.2} clipId={clipId}/>)}
 </svg>;
}
