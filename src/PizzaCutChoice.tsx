import {Circle, Pizza} from '@phosphor-icons/react';
import {pizzaSize,type Configuration} from './catalog';

export function PizzaCutChoice({config,onChange}:{config:Configuration;onChange:(config:Configuration)=>void}){
 const size=pizzaSize(config.option);
 return <fieldset className="cut-picker">
  <legend>03. Como prefere sua pizza?</legend>
  <p className="helper">Sua montagem está pronta. Agora escolha como servir.</p>
  <div className="cut-options">
   <button type="button" aria-pressed={Boolean(config.sliced)} onClick={()=>onChange({...config,sliced:true})}>
    <Pizza size={23}/><span><strong>Fatiada</strong><small>{size.slices} fatias, pronta para servir</small></span>
   </button>
   <button type="button" aria-pressed={!config.sliced} onClick={()=>onChange({...config,sliced:false})}>
    <Circle size={23}/><span><strong>Inteira</strong><small>Sem cortes, do seu jeito</small></span>
   </button>
  </div>
 </fieldset>;
}
