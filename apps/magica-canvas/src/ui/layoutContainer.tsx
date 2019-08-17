import interact from 'interactjs'
import * as React from 'react'
import { getState } from '../app/store'
import { attached } from '../main'
import { Canvas } from './canvas'
import { ForkRibbon } from './forkRibbon'
import { Layout } from './layout'

// heads up : we render the canvas outside any component so it's no updated when state change.
export const LayoutContainer = () => {
  attached.then(() => { // cannot await here!

    interact('.item').draggable({
      onmove: throttlee => {
        getState()
      }
    })
  })
  return <div className="rootContainer">
    <span className="canvasContainer"><Canvas /></span>
    <span className="layoutContainer">     <Layout /></span>

    <ForkRibbon />
  </div>
}
