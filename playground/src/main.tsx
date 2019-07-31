import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { setExample } from './app/dispatcher'
import { getInitialState } from './app/state'
import { _setStore } from './app/store'
import { App } from './ui/app'

async function main() {
  var s = await getInitialState()
  setTimeout(async () => {
    _setStore(s)
    await setExample(s.example)
    render(<App />, document.getElementById('main'))
  }, 100)
}

main()
