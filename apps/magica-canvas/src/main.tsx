import 'babel-polyfill'
import './styles.css'
import * as React from 'react'
import {render} from 'react-dom'
import { File, loadHtmlCanvasElement, run } from 'magica'
import { Layout, Canvas } from './layout';
import { _setStore, getStore } from './store';
import { getInitialState } from './state';
import { change } from './change';

async function main() {
  render(<Canvas/>, document.getElementById('canvas-container')!)
  _setStore( await getInitialState())
  render(<Layout/>, document.getElementById('layout-container')!)
  await change(0,0, [getStore().getState().inputFile])
}

main()