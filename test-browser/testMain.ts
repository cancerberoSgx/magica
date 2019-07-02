import { serial } from 'misc-utils-of-mine-generic';
import simpleConvert from './tests/simpleConvert';
import simpleIdentify from './tests/simpleIdentify';
import { assert } from './testUtil';

const all = [
  simpleIdentify, 
  simpleConvert
]
serial(all.map(test=>async ()=>{
  // await test()
   try {
  await test()
  // await sleep(50)   
 } catch ( ex){
   assert(false, ex.toString())
   console.error(ex);   
 }
}))
// all.forEach(async test=>{
//  try {
//   await test()
//   await sleep(500)   
//  } catch ( ex){
//    assert(false, ex.toString())
//  }
// })