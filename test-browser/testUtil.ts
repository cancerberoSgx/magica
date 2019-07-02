import { stringifyJSON } from 'misc-utils-of-mine-generic';

// export function assertEquals(a: any, b: any) {
//   log(''+a + b + ' '+(a===b)+'')
//   debugger
//   assert(a === b, 'Expected "' + a + '" to equals "' + b+'"');
// }

export function assertEquals(a: any, b: any) {
  const aS = stringifyJSON(a||'', 'JSON.stringify(a) thrown'), bS = stringifyJSON(b||'', 'JSON.stringify(b) thrown')
  assert(aS===bS, 'Expected "' + aS + '" to equals "' + bS+'"');
}

export function assertIncludes(a: string, b: string) {
  assert(a.includes(b), 'Expected "' + a + '" to includes "' + b+'"');
}

export function assert(t: boolean, msg: string) {
  if (!t) {
    document.getElementById('assert')!.innerHTML += msg;
  }
}

export function log(msg: string) {
  document.getElementById('logs')!.innerHTML += msg + '<br/>';
}
