import {test} from 'node:test';
import assert from 'node:assert/strict';
import {pizzaToppings,toppingCount,toppingPosition} from '../src/pizzaToppings';
test('duas doses mantêm peças dentro do molho e preservam posições',()=>{
 for(const id of Object.keys(pizzaToppings)){
  const first=Array.from({length:toppingCount(id,1)},(_,n)=>toppingPosition(id,n));
  const double=Array.from({length:toppingCount(id,2)},(_,n)=>toppingPosition(id,n));
  assert.deepEqual(double.slice(0,first.length),first);
  for(const point of double)assert.ok(Math.hypot(point.x-250,point.y-250)+point.size/2<=179);
 }
});
