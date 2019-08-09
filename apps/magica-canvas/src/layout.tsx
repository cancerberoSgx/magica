import * as React from 'react'
import { commands } from './commands';
import { state } from './state';
import { change } from './change';

export const Layout = () => <>
  <p>Select one command example and click the image. See how fast ImageMagick can be...</p>
  <select onChange={e => { state.command = commands.find(c => c.name === e.currentTarget.value)! }}>
    {commands.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
  </select>
  <span id="time"></span>
  <canvas id="canvas" width="600" height="600" onAuxClick={(e: any) => change(e.layerX, e.layerY)}></canvas>
</>

