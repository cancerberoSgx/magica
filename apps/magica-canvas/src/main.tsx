import 'babel-polyfill'
import { Deferred, sleep } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { render } from 'react-dom'
import '../node_modules/bulma/bulma.sass'
import { change } from './app/change'
import { setInitialState } from './app/state'
import { getState } from './app/store'
import { LayoutContainer } from './ui/layoutContainer'
import './ui/styles.scss'

export const attached = new Deferred<void>()
async function main() {
  await setInitialState()
  var container = document.createElement('div')
  document.body.append(container)
  render(<LayoutContainer />, container)
  await sleep(10)
  attached.resolve()
  var s = getState()
  await change(s.imageBounds.x, s.imageBounds.y, [s.inputFile])
}

main()


