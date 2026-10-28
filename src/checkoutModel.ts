import {total,type CartItem} from './catalog';
export const checkoutSettings={deliveryFee:690,restaurantAddress:'Retirada na loja demonstrativa',paymentMethods:['pix','delivery'] as const};
export type CheckoutDetails={name:string;phone:string;fulfillment:'delivery'|'pickup';postalCode:string;street:string;number:string;neighborhood:string;city:string;state:string;complement:string;payment:'pix'|'delivery';deliveryPayment:'card'|'cash';notes:string};
export const initialDetails=():CheckoutDetails=>({name:'',phone:'',fulfillment:'delivery',postalCode:'',street:'',number:'',neighborhood:'',city:'',state:'',complement:'',payment:'pix',deliveryPayment:'card',notes:''});
export const digits=(value:string)=>value.replace(/\D/g,'');
export const checkoutStates=['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'];
export function formatPhone(value:string){const number=digits(value).slice(0,11);if(number.length<3)return number;const prefix=`(${number.slice(0,2)}) `,local=number.slice(2);const split=local.length>8?5:4;return prefix+(local.length>split?`${local.slice(0,split)}-${local.slice(split)}`:local)}
export function formatPostalCode(value:string){const number=digits(value).slice(0,8);return number.length>5?`${number.slice(0,5)}-${number.slice(5)}`:number}
export function checkoutErrors(details:CheckoutDetails){
 const errors:Partial<Record<keyof CheckoutDetails,string>>={};
 if(details.name.trim().length<2)errors.name='Informe seu nome.';
 if(![10,11].includes(digits(details.phone).length))errors.phone='Informe um telefone com DDD.';
 if(details.fulfillment==='delivery'){
  if(digits(details.postalCode).length!==8)errors.postalCode='Informe um CEP com 8 dígitos.';
  for(const [key,label]of [['street','a rua'],['number','o número ou S/N'],['neighborhood','o bairro'],['city','a cidade']]as const)if(!details[key].trim())errors[key]=`Informe ${label}.`;
  if(!checkoutStates.includes(details.state))errors.state='Selecione a UF.';
 }
 return errors;
}
export const shipping=(details:CheckoutDetails)=>details.fulfillment==='delivery'?checkoutSettings.deliveryFee:0;
export const checkoutTotal=(items:CartItem[],details:CheckoutDetails)=>total(items)+shipping(details);
export const paymentLabel=(details:CheckoutDetails)=>details.payment==='pix'?'Pix':`${details.deliveryPayment==='card'?'Cartão':'Dinheiro'} ${details.fulfillment==='pickup'?'na retirada':'na entrega'}`;
