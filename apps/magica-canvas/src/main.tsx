import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { change } from './change'
import {  Layout } from './layout'
import { getInitialState } from './state'
import { getStore, _setStore } from './store'
import './styles.css'
import { Canvas } from './canvas';

async function main() {
  _setStore(await getInitialState())
  render(
    <table>
      <tr>
        <td>
        <Canvas/>
        </td>
        <td>
        <Layout />
        </td>
      </tr>
    </table> 
  , document.getElementById('layout-container')!)
  await change(0, 0, [getStore().getState().inputFile])
}

main()
