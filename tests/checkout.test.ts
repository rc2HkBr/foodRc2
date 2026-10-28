import {test} from 'node:test';
import assert from 'node:assert/strict';
import {checkoutErrors,checkoutTotal,initialDetails,paymentLabel,shipping,type CheckoutDetails} from '../src/checkoutModel';
import {defaults,total} from '../src/catalog';
test('contato e endereço são obrigatórios para entrega',()=>{
 const details=initialDetails();assert.ok(checkoutErrors(details).name);assert.ok(checkoutErrors(details).postalCode);
 Object.assign(details,{name:'Maria',phone:'(11) 99999-9999',postalCode:'01001-000',street:'Praça da Sé',number:'S/N',neighborhood:'Sé',city:'São Paulo',state:'SP'});
 assert.deepEqual(checkoutErrors(details),{});
 details.phone='123';assert.ok(checkoutErrors(details).phone);
});
test('retirada dispensa endereço e remove taxa de entrega',()=>{
 const details:CheckoutDetails={...initialDetails(),name:'Maria',phone:'11999999999',fulfillment:'pickup'};
 assert.deepEqual(checkoutErrors(details),{});assert.equal(shipping(details),0);
 const items=[{id:'p',config:defaults().pizza,quantity:2}];
 assert.equal(checkoutTotal(items,details),total(items));
 details.fulfillment='delivery';assert.equal(checkoutTotal(items,details),total(items)+690);
});
test('formas de pagamento descrevem a preferência sem processar cobrança',()=>{
 const details=initialDetails();assert.equal(paymentLabel(details),'Pix');
 details.payment='delivery';details.deliveryPayment='cash';assert.equal(paymentLabel(details),'Dinheiro na entrega');
 details.fulfillment='pickup';details.deliveryPayment='card';assert.equal(paymentLabel(details),'Cartão na retirada');
});
