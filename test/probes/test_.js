
function f(){
  var s  = '{return this.foo}'
  var f = eval(`(function(o){return (function()${s}).bind(o)() })`)
  var r = f({foo: 123}) 
  console.log(r);
}



function f2(){
 var m = require('../../dist/src/imageMagick/compiled/magica.umd') 
 console.log(Object.keys(m));
 
}

f2()
