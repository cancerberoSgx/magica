import * as React from 'react'
import { Dropdown, Menu, Modal } from 'semantic-ui-react'
import { setExample } from '../app/dispatcher'
import { examples } from '../app/examples'
import { About } from './about'
import { AbstractComponent } from './common/component'
import { printMs } from './common/urlState'

export class Header extends AbstractComponent {
  render() {
    return <Menu>
      <Dropdown item icons="file code outline" text={`"${this.state.example.name}"`}  >
        <Dropdown.Menu>
          {examples.map(example => <Dropdown.Item onClick={e => setExample(example)}>{example.name}</Dropdown.Item>)}
        </Dropdown.Menu>
      </Dropdown>
      <Menu.Item className={this.state.working ? "working" : ""} >{this.state.working ? <div >WORKING</div> : 'IDLE'}</Menu.Item>
      <Menu.Item> <div>{this.state.result && this.state.result.times && printMs(this.state.result.times.total) || ''}</div></Menu.Item>
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

