import 'babel-polyfill'
import * as React from 'react'
import { render } from 'react-dom'
import { Canvas } from '../src/canvas';
import { File, protectFile, magickLoaded } from 'magica'

async function main() {
  var container = document.createElement('div')
  document.body.append(container)
  var inputFiles = [await File.fromUrl('bluebells.png')]

  var c2 = new Canvas({
    inputFiles,
    onMouseMoveScript: async o => `convert ${o.inputFiles[0].name} -matte -virtual-pixel transparent -distort Barrel ' 0.4 0.7 0.2 0.5 ${o.x} ${o.y}'`
  })

  render(<div>
    <Canvas inputFiles={inputFiles}
      onClickScript={async o => `convert ${o.inputFiles[0].name} -matte -virtual-pixel transparent -distort Barrel '-0.4 0.7 0.2 0.5 ${o.x} ${o.y}'`}
      onClickScriptResult={async r => {
        c2.setInputFiles(r.outputFiles as any)
      }}
    />
    {c2.render()} 
    </div>, container)
}

main()

