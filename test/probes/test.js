

var s  = '{return this.foo}'
var f = eval(`(function(o){return (function()${s}).bind(o)() })`)
var r = f({foo: 123}) 
console.log(r);
