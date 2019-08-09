import * as React from 'react'
import { Container } from 'semantic-ui-react'
import { Body } from './body/body'
import { AbstractComponent } from './common/component'
import { ForkRibbon } from './common/forkRibbon'
import { Header } from './header'

export class App extends AbstractComponent {

  render() {
    return <Container fluid textAlign="left">
      <Header />
      <Body />
      <ForkRibbon />
    </Container>
  }
}
