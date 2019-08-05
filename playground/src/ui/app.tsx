import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { Body } from './body/body'
import { AbstractComponent } from './common/component'
import { ForkRibbon } from './common/forkRibbon'
import { loadUrl } from './common/urlState'
import { Header } from './header'
import './styles.css'

export class App extends AbstractComponent {

  render() {
    return <Container fluid textAlign="left">
      <Header />
      <Body />
      <ForkRibbon />
    </Container>
  }
}
