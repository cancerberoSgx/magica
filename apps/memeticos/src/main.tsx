import * as React from 'react'
import { render } from 'react-dom'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { setExample } from './app/dispatcher'
import { AppOptions, getInitialState } from './app/state'
import { getStore, _setStore, setState } from './app/store'
import './static/styles.css'
import { ForkRibbon } from './ui/common/forkRibbon'
import { createUrl, loadUrl, urlHasState } from './ui/common/urlState'
import { Header } from './ui/header'
import { Home } from './ui/page/home'
import { File as MagicaFile, magickLoaded, run } from 'magica'
import { compareL2, File, fromFile, ImageData, loadOpencv } from 'mirada'
import{MagicaCodec} from 'ojos'

export async function main(appOptions: AppOptions) {
  if (!document.querySelector('#main')) {
    var d = document.createElement('div')
    d.setAttribute('id', 'main')
    document.body.append(d)
  }
  var s = await getInitialState(appOptions)
  _setStore(s)
  render(
    <Container fluid textAlign="left">
      <Header />
      {/* <MyRoute is="home"> */}
        <Home/>
      {/* </MyRoute> */}
      {/* <Body /> */}
      <ForkRibbon />
    </Container>,
    document.getElementById('main'))
  if (urlHasState()) {
    await loadUrl()
  }
  else {
    await setExample(s.example)
  }
  getStore().add(() => {
    createUrl()
  })


  await magickLoaded
  const Magica = {
    fromArrayBuffer: MagicaFile.fromArrayBuffer,
    fromRGBAImageData: async (data: ImageData) => MagicaFile.fromRGBAImageData(data as any),
    run
  }
  await loadOpencv({ formatProxies: [() => new MagicaCodec(Magica)] })
  setState({librariesReady: true})
}

