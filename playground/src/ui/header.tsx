import * as React from 'react'
import { Dropdown, Menu, Modal } from 'semantic-ui-react'
import { setExample } from '../app/dispatcher'
import { examples } from '../app/examples'
import { About } from './about'
import { AbstractComponent } from './common/component'

export class Header extends AbstractComponent {
  render() {
    return <Menu>
      <Dropdown item icons="file code outline" text={`"${this.state.example.name}"`}  >
        <Dropdown.Menu>
          {examples.map(example => <Dropdown.Item onClick={e => setExample(example)}>{example.name}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Menu position="right">
        <Modal trigger={<Menu.Item as='a' icon="help">About</Menu.Item>}>
          <Modal.Header>About</Modal.Header>
          <Modal.Content>
            <About />
          </Modal.Content>
        </Modal>
      </Menu.Menu>
    </Menu>
  }
}

