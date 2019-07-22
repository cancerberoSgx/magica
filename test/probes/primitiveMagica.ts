// performance TODO
// investigate the /tmpI.mpc cache files protecting them

import { writeFileSync } from 'fs'
import { unique } from 'misc-utils-of-mine-generic'
import { File, run } from '../../src'
import { runOne } from '../../src/main/run'
import {  IFile } from '../../src/types';

interface Options {
  input: IFile
  iterations?: number
  shapeCount?: number
  mutationCount?: number
  alpha?: number
  background?: string
}


const defaults: Required<Options> = {
  input: null as any,
  iterations: 20,
  shapeCount: 10,
  mutationCount: 10,
  background: 'skyblue',
  alpha: 128
}
interface Point {
  x: number, y: number
}
export async function f(o: Options = defaults) {
  // setOptions({ debug: true })
  const options = { ...defaults, ...o }
  const width = 400
  const height = 400 //TODO: extract from input image
  const canvas = await runOne(`convert -size ${width}x${height} xc:${options.background}  -fill white -stroke black target.im`)
  const rect = new Rectangle()
  const result = await rect.render({ file: canvas, location: { x: 10, y: 10 }, size: { x: 100, y: 80 }, fill: 'red', stroke: 'blue' })
  // const current = await blankImage(400,400,'black','canvas.im')
  //  const target = await runOne(`convert ${options.input.name} target.im`, options.input)
  //  const target2 = await runOne(`convert ${target.name} target2.jpg`, target)
  console.log(result.file.content)

  writeFileSync('tmp/target222.jpg', result.file.content)
}

interface Shape {
  svg(): string
  render(o: ShapeRenderOptions): Promise<ShapeRenderOutput>
}

interface ShapeRenderOptions {
  file: IFile
  location: Point
  size: Point
  fill: string
  stroke: string
}
interface ShapeRenderOutput {
  file: IFile
}
class Shape { }
class Rectangle extends Shape {
  svg() {
    return `TODO`
  }
  async  render(o: ShapeRenderOptions): Promise<ShapeRenderOutput> {
    const script = `convert ${o.file.name} \\
    -draw "rectangle ${o.location.x},${o.location.y} ${o.size.x},${o.size.y}" \\
    ${unique('rectandle_rendered')}.im`
    const result = await run({
      inputFiles: [o.file],
      script
    })
    //TODO: errors
    return {
      file: result.outputFiles[0]
    }
  }
}


(async () => {
  const r = await f({ input: await File.fromFile('test/assets/n.png') })
})()
