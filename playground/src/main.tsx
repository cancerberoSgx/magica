// import 'babel-polyfill'
import { File } from 'magica'
import * as React from 'react'
import { render } from 'react-dom'
import { setExample } from './app/dispatcher'
import { getInitialState } from './app/state'
import { _setStore, getStore } from './app/store'
import { App } from './ui/app'
import { sleep } from 'misc-utils-of-mine-generic';
import { sampleImages } from './app/examples';
import { urlHasState, loadUrl, createUrl } from './ui/common/urlState';

async function main() {
  var s = await getInitialState()
    _setStore(s)
    render(<App />, document.getElementById('main'))

    if(urlHasState()){
      await loadUrl()
    }
    else {
      await setExample(s.example)
    }

    getStore().add(()=>{
      createUrl()
    })
}

main()
