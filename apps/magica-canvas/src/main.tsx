import 'babel-polyfill'
import * as React from 'react'
import {render} from 'react-dom'
import { File, loadHtmlCanvasElement, run } from 'magica'
import { Layout } from './layout';
import { state } from './state';
import { change } from './change';
import { commands } from './commands';

async function main() {
  state.command = commands[0]
  render(<Layout/>, document.getElementById('main')!)
  state.inputFile = await File.fromUrl('bluebells.png', {protected: true}) as File
  var c = document.querySelector<HTMLCanvasElement>('#canvas')!
  c.addEventListener('click', e=>change(e.layerX, e.layerY))
  state.ctx = c.getContext('2d')!
  await loadHtmlCanvasElement(  state.inputFile,  state.ctx)
  state.time = document.querySelector('#time')!
}

main()