import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { getInitialState, State } from './app/state'
import { _setStore, getStore } from './app/store'
import { App } from './ui/app'
import { setExample } from './app/dispatcher';
async function main() {
  var s = await getInitialState()
  setTimeout(async () => {
    
    _setStore(s)
 await    setExample(s.example)
    // var script = s.example.script(s)
    // const result = await callRun({ 
    //   inputFiles: s.inputFiles, 
    //   script 
    // })
    // s  = {...s, script, result}
    // var state:State = {...s, script}
    // getStore().setState(s);
    // example.script(null as any)
  render(<App />, document.getElementById('main'))
  }, 100)
}

main()
