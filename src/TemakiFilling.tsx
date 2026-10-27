import type {Configuration} from './catalog';
import {catalog} from './catalog';

export function TemakiFilling({config}:{config:Configuration}){
 const fillings=catalog.sushi.filter(i=>i.group==='Recheios'&&config.ingredients[i.id]);
 const creamy=Boolean(config.ingredients.cream);
 return <g className="temaki-filling" aria-label={creamy?'Recheio farto misturado ao cream cheese':'Recheio farto de ingredientes picados'}>
  {fillings.map((item,index)=>creamy?
   <image key={item.id} data-temaki-filling={item.id} className="sushi-filling" href={`/ingredients/temaki-${item.id}-creamy.webp`} x={fillings.length===1?127:122+index*81} y={116+index*3} width={fillings.length===1?181:123} height={140-index*4} preserveAspectRatio="none"/>:
   <g key={item.id} data-temaki-filling={item.id}>
    {Array.from({length:fillings.length===1?20:13},(_,n)=>{
     const radius=Math.sqrt((n+.5)/(fillings.length===1?20:13));
     const angle=n*2.399963+index*1.4+item.id.length;
     const x=213+Math.cos(angle)*radius*68;
     const y=183+Math.sin(angle)*radius*43;
     return <image key={n} href={`/ingredients/sushi-${item.id}.webp`} x={x-19} y={y-16} width="39" height="33" transform={`rotate(${(n*31)%40-20} ${x} ${y})`} className="sushi-filling"/>;
    })}
   </g>
  )}
  {config.ingredients.chive?Array.from({length:8},(_,n)=>{
   const angle=n*2.399963;
   const x=212+Math.cos(angle)*Math.sqrt((n+.5)/8)*63;
   const y=181+Math.sin(angle)*Math.sqrt((n+.5)/8)*43;
   return <image key={n} data-temaki-garnish="chive" href="/ingredients/temaki-chive.webp" x={x-11} y={y-9} width="22" height="18" transform={`rotate(${n*47} ${x} ${y})`} className="sushi-filling"/>;
  }):null}
 </g>;
}
