Big collection of miscellaneous utilities, compatible with browser and node.js

These should work on all es5 compatible environments, Browse and node.js and even others like rhino, etc, since are pure JavaScript.

## API

 [API](api/README.md)

## TODO
- [ ] string/boxes : drawBox({pos: Point, lines:String[], padding: {top,right,bottom,left}})
- [ ] test visitJson
  - [ ] impl findJson, filterJson 
- [x] test tree.ts
- [x] objectToArray
- [x] Deferred test



<!-- 
  ### ideas


// an operation OP is expensive and we want to print: `${OP(a) && OP(a).foo || '' }` - we need to create a variable in order to not call it twice
// solution : a function get which : `${get(OP(a), 'foo')||'' }`
// useful if nested: `${get(OP(a), 'foo', 'bar', 'name')||'' }`
// for particular falsy (we do want to print 0 and false): `${get(OP(a), 'foo', 'bar', v=>v===undefined?'':v)}` (will print empty string only for undefined not for all falsy)
 -->

<!-- 
// function prop<T,S>(o:T, p:keyof T, map: S|((k:keyof T)=>S)):S {
//   var v = o[p]
// }

// function valueOf<T, P extends keyof T, D>(t:T,p:P, def:D, pred?: (v: T[P])=>boolean):T[P]|D {
// return (pred?pred(t[p]) : true ) 
// }
// an operation OP is expensive and we want to print: `${OP(a) && OP(a).foo || '' }` - we need to create a variable in order to not call it twice
// solution : a function get which : `${get(OP(a), 'foo')||'' }`
// useful if nested: `${get(OP(a), 'foo', 'bar', 'name')||'' }`
// for particular falsy (we do want to print 0 and false): `${get(OP(a), 'foo', 'bar', v=>v===undefined?'':v)}` (will print empty string only for undefined not for all falsy)

// var a: {name:B}[]

// a.map(b=>b.name)   vs: a.map(P('name'))n 

// a.map(a=>a.name||'asd')  vs a.map(P('name', 'asd'))  -->