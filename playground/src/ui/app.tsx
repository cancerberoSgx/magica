import * as React from 'react'
import 'semantic-ui-css/semantic.css'
import { Container } from 'semantic-ui-react'
import { Body } from './body/body'
import { ForkRibbon } from './common/forkRibbon'
import { loadUrl } from './common/uiUtil'
import { AbstractComponent } from './component'
import { Header } from './header/header'
import './styles.css'

export class App extends AbstractComponent {
  componentDidMount() {
    setTimeout(() => {
      loadUrl()
    }, 100)
  }

  render() {
    return <Container fluid textAlign="left">
      <Header />
      <Body />
      <ForkRibbon />
    </Container>
  }
}
