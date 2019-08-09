import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.css'
import { setExample } from './app/dispatcher'
import { getInitialState } from './app/state'
import { getStore, _setStore } from './app/store'
import './styles.css'
import { App } from './ui/app'
import { createUrl, loadUrl, urlHasState } from './ui/common/urlState'

async function main() {
  var s = await getInitialState()
  _setStore(s)
  render(<App />, document.getElementById('main'))
  if (urlHasState()) {
    await loadUrl()
  }
  else {
    await setExample(s.example)
  }
  getStore().add(() => {
    createUrl()
  })
}

main()
