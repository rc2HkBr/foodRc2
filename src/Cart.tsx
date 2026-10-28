import {useEffect,useRef,useState} from 'react';
import {X,Minus,Plus,ShoppingBag,PencilSimple,Trash,ArrowRight,ShieldCheck} from '@phosphor-icons/react';
import {categoryNames,description,money,options,price,total,pizzaCutLabel,configurationName,configurationLabel,configurationCategory,type CartItem} from './catalog';
import {BurgerVisual} from './FoodVisual';
import {Checkout} from './Checkout';
import {MenuArt} from './ValentsVisual';
import {initialDetails} from './checkoutModel';

type Props={open:boolean;onClose:()=>void;items:CartItem[];onChange:(items:CartItem[])=>void;onEdit:(item:CartItem)=>void};
const thumbnails={pizza:'/pizza-base.png',burger:'/ingredients/burger-bun-top-v2.webp',sushi:'/ingredients/sushi-uramaki.webp'};
export function Cart({open,onClose,items,onChange,onEdit}:Props){
 const ref=useRef<HTMLDialogElement>(null);
 const [checkoutOpen,setCheckoutOpen]=useState(false);
 const [details,setDetails]=useState(initialDetails);
 useEffect(()=>{if(open){setCheckoutOpen(false);ref.current?.showModal()}else ref.current?.close()},[open]);
 return <dialog ref={ref} className={`cart-dialog ${checkoutOpen?'with-checkout':''}`} aria-labelledby="cart-title" onCancel={onClose} onClick={event=>{if(event.target===ref.current)onClose()}}>
  <div className="cart-inner"><header><div><span className="eyebrow">FEITO DO SEU JEITO</span><h2 id="cart-title">{checkoutOpen?'Seu checkout':'Sua sacola'}{!checkoutOpen&&<span> ({items.length})</span>}</h2></div><button className="icon-button" aria-label="Fechar sacola" onClick={onClose}><X size={24}/></button></header>
   {checkoutOpen&&items.length?<Checkout items={items} details={details} onChange={setDetails} onBack={()=>setCheckoutOpen(false)} onClose={onClose}/>:!items.length?<div className="empty-cart"><div className="empty-cart-symbol"><ShoppingBag size={48} weight="light"/></div><h3>Sua próxima favorita<br/>começa aqui.</h3><p>Sua sacola está vazia. Combine sabores e crie algo com a sua assinatura.</p><button className="primary" onClick={onClose}>Começar a montar <ArrowRight size={18}/></button></div>:<>
   <p className="cart-intro">Boas escolhas merecem uma última olhada.</p>
    <div className="cart-items">{items.map(item=><article className="cart-item" key={item.id}>
     <div className="cart-item-heading"><div className={`cart-food-thumb thumb-${item.config.category}`} aria-hidden="true">{item.config.menu?<MenuArt menu={item.config.menu} compact/>:item.config.category==='burger'?<BurgerVisual config={item.config}/>:<img src={thumbnails[item.config.category]} alt=""/>}</div><div className="cart-item-title"><span>{configurationCategory(item.config)}</span><h3>{item.config.name?.trim()?configurationName(item.config):item.config.menu?configurationName(item.config):configurationLabel(item.config)}</h3></div><button className="icon-button" aria-label={`Remover ${configurationName(item.config)} da sacola`} onClick={()=>onChange(items.filter(i=>i.id!==item.id))}><Trash size={18}/></button></div>
     <p>{description(item.config)}</p>{item.config.category==='pizza'&&<p className="cart-cut-label">{pizzaCutLabel(item.config)}</p>}{item.config.category==='sushi'&&!item.config.menu&&<p>{item.config.portions} {item.config.portions===1?'porção':'porções'} · {item.config.option==='temaki'?item.config.portions:item.config.portions*8} {item.config.option==='temaki'&&item.config.portions===1?'unidade':'unidades'}</p>}
     <div className="cart-item-bottom"><div className="stepper"><button aria-label="Diminuir quantidade do item" disabled={item.quantity===1} onClick={()=>onChange(items.map(i=>i.id===item.id?{...i,quantity:i.quantity-1}:i))}><Minus size={14}/></button><output>{item.quantity}</output><button aria-label="Aumentar quantidade do item" disabled={item.quantity===99} onClick={()=>onChange(items.map(i=>i.id===item.id?{...i,quantity:i.quantity+1}:i))}><Plus size={14}/></button></div><button className="text-button" onClick={()=>onEdit(item)}><PencilSimple/> Editar</button><strong>{money(price(item.config)*item.quantity)}</strong></div>
    </article>)}</div>
    <footer><div className="total"><span>Subtotal da sacola</span><strong>{money(total(items))}</strong></div><div className="cart-payment-hint"><span>Pix</span><i/>Pagamento na entrega<i/>Retirada na loja</div><button className="primary" onClick={()=>setCheckoutOpen(true)}>Continuar para o checkout <ArrowRight size={19}/></button><p className="cart-safe-note"><ShieldCheck size={14}/>Demonstração · Nenhuma cobrança real</p></footer>
   </>}
  </div>
 </dialog>;
}
