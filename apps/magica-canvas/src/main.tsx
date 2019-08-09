import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { change } from './change'
import { Canvas, Layout } from './layout'
import { getInitialState } from './state'
import { getStore, _setStore } from './store'
import './styles.css'

async function main() {
  render(<Canvas />, document.getElementById('canvas-container')!)
  _setStore(await getInitialState())
  render(<Layout />, document.getElementById('layout-container')!)
  await change(0, 0, [getStore().getState().inputFile])
}

main()
