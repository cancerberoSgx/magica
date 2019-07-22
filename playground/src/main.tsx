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
    await setExample(s.example)
    render(<App />, document.getElementById('main'))
  }, 100)
}

main()
