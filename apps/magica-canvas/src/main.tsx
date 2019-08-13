import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { change } from './app/change'
import { getInitialState } from './app/state'
import { getStore, _setStore } from './app/store'
import { LayoutContainer } from './ui/layoutContainer'

async function main() {
  _setStore(await getInitialState())
  var container = document.createElement('div')
  document.body.append(container)
  render(<LayoutContainer />, container)
  await change(0, 0, [getStore().getState().inputFile])
}

main()

