import {useId,type CSSProperties} from 'react';

export function PipedCheese({kind,quantity,visibleQuantity}:{kind:'catupiry'|'cheddar';quantity:number;visibleQuantity:number}){
 const id=useId().replace(/:/g,'');
 return <g data-piped-cheese={kind} transform={`rotate(${kind==='catupiry'?15:-15} 250 250)`}>
  {Array.from({length:quantity},(_,dose)=><g key={dose} style={{opacity:dose<visibleQuantity?1:0,transition:'opacity .15s'}}>
   {[0,90].map((rotation,axis)=><g key={rotation} transform={`rotate(${rotation} 250 250)`}>
    {Array.from({length:5},(_,row)=>{
     const y=130+row*60+dose*24;
     const half=Math.sqrt(165**2-(y-250)**2);
     const start=250-half,end=250+half;
     const mask=`${id}-${dose}-${axis}-${row}`;
     const delay=(axis*5+row)*.18;
     return <g key={row}>
      <defs><mask id={mask} maskUnits="userSpaceOnUse" x="0" y="0" width="500" height="500"><path d={`M${start} ${y}H${end}`} pathLength="1" stroke="white" strokeWidth="22" className="piping-reveal" style={{animationDelay:`${delay}s`}}/></mask></defs>
      <image href={`/ingredients/piped-${kind}.webp`} x={start} y={y-10} width={half*2} height="20" preserveAspectRatio="none" mask={`url(#${mask})`}/>
      <g className="piping-tip" style={{'--start':`${start}px`,'--end':`${end}px`,'--row':`${y}px`,animationDelay:`${delay}s`} as CSSProperties}>
       <path d="M-5-10L5-10L2 1H-2Z" fill="#c8c2b5" stroke="#918d82" strokeWidth=".6"/><path d="M-4-10L-9-26Q0-34 9-26L4-10Z" fill={kind==='catupiry'?'#fff5df':'#f4af34'}/><path d="M-2-9L-1-1" stroke="white" strokeWidth="1.2" opacity=".8"/>
      </g>
     </g>;
    })}
   </g>)}
  </g>)}
 </g>;
}
