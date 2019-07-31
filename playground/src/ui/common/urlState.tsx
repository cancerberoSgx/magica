export function createUrl() {
  const s = {
    // code: getCodeEditorText(),
  }
  const b = btoa(JSON.stringify(s))
  window.location.hash = '#state=' + b
}

export function loadUrl() {
  if (window.location.hash.includes('state=')) {
    const d = window.location.hash.split('state=')[1]
    const state = JSON.parse(atob(d))
    // setCodeEditorText(state.code)
  } else {

  }
}

export function printMs(  ms: number) {
  return (ms/1000)+''.padEnd(4, ' ')+' seconds'
}
