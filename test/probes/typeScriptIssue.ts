// // TS Type inference, Ignoring previous call expressions to functions that could change the type of variables

// // Following snippets and comments reproduce and describe the issue
// // I made it thinking on async functions but I think its also an issue with normal functions
// // Basically TS is omitting statements evaluated before current expression that could change 
// // the type of a variable. Like in other use cases, here TypeScript should assume the 
// // "worst case scenario", that is, the type of variables accessible by functions called before 
// // current expression changed.


// async function h(f: () => Promise<void>) {
//   return await f()
// }

// interface C {
//   m(): string
// }

// function g(): C {
//   return {
//     m() { return 'hello' }
//   }
// }

// async function j() {
//   let c: C | null = null              // (1)
//   await h(async () => { c = g() })    // (2) 
//   if (c) {                            // (3)
//     console.log(c.m());               // (4)
//   }
// }

// // EXPECTATION: in (3) I expect c: C | null as declared but it's c: null which ignores previous 
// // call expressions to function that might changed its type

// // This is a common use case and I would say an injection. 
// // (2) IMO TS is omitting this line's assignment and it shouldn't because of the await/async
// // (3) since the assignment was not considered according to TS now c : never
// // (4) compile error "Property 'm' does not exist on type 'never'."
// // (1) BTW In some manner, here, TypeScript "forced me" to assign c to null.


// // same example with inner function:
// async function l() {
//   let c: C | null = null
//   async function inner() {
//     c = g()        // (1)
//   }
//   await inner()  // (2) the next if() statement won't never be evaluated before c is reassigned in (1).
//   if (c) {
//     console.log(c.m())
//   }
// }

// // In the context of this issue the following example is equivalent, but here, since 
// // there's no function call in the middle, TS does consider the assignment  as expected
// async function k() {
//   let c: C | null = null
//   c = await (async () => g())()
//   if (c) {
//     console.log(c.m());
//   }
// }




// https://github.com/opencv/opencv/pull/15240/files

// let r: Buffer | undefined = undefined
// if(r && !['Q16 x86_64', 'HDRI'].find(s=> r.toString().trim().includes(s))){}
// if(r){
//   let a = r
// }
