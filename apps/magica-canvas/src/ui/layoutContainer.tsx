import * as React from 'react'
import { Canvas } from './canvas'
import { ForkRibbon } from './forkRibbon'
import { Layout } from './layout'

// heads up : we render the canvas outside any component so it's no updated when state change.
export const LayoutContainer = () => <>
  <table>
    <tr>
      <td>
        <Canvas />
      </td>
      <td>
        <Layout />
      </td>
    </tr>
  </table>
  <ForkRibbon />
</>
