import { File } from 'magica'
import * as React from 'react'
import { change, ChangeResult, createInputFile, ScriptContext } from './change'
import { P } from './types'

/**
 * Renders input files and given script as fast as possible on a canvas that creates. Reacts to user events
 * and calls to show IM transformations like in real-time. Notice that some react calls (specialy on bit
 * images) could take more than 100ms which is considered the limit for "real time" It has the same dimentions
 * as the canvas so to move it on the doc the canvas must be moved/styled - independent of the image inside.
 * TODO: let the user specify the canvas el?
 *
 * TODO: let it be more an agnostic API and let this component use that API
 */
export class Canvas extends React.Component<P> {
  async setInputFiles(files: File[]) {

    var f = await createInputFile({ file: files[0], canvasWidth: this.props.width || 600, canvasHeight: this.props.height || 600 })
    debugger
    this.inputFiles = [f!]
    await this.onAction({ x: 0, y: 0 })
  }
  protected canvasEl: HTMLCanvasElement | null = null
  protected ctx: CanvasRenderingContext2D | null = null
  protected inputFiles: File[] = []
  protected async canvasElReady(c: HTMLCanvasElement) {
    this.canvasEl = c
    this.ctx = this.canvasEl!.getContext('2d')
    const o = {
      x: 0,
      y: 0,
      inputFiles: await File.resolve(this.props.inputFiles),
      script: this.handleChange,
      ctx: this.ctx!
    }
    await change(o)
    if (this.props.ref) {
      this.props.ref(c)
    }
  }
  private async  handleChange(o: ScriptContext) {
    return `convert ${o.inputFiles.length ? o.inputFiles[0].name : 'input.miff'} output.rgba`
  }
  render() {
    return <canvas
      ref={this.canvasElReady.bind(this)}
      width={this.props.width || 600}
      height={this.props.height || 600}
      onMouseMove={async e => {
        if (this.props.onMouseMoveScript || this.props.onMouseMoveScriptResult || this.props.onMouseMove) {
          await this.onAction({ x: e.nativeEvent.layerX, y: e.nativeEvent.layerY }, Action.mouseMove)
        }
      }}
      onClick={async e => {
        await this.onAction({ x: e.nativeEvent.layerX, y: e.nativeEvent.layerY }, Action.click)
      }} />
  }

  private async onAction(ev: Point, action?: Action) {
    if (!this.inputFiles.length) {
      this.inputFiles = await File.resolve(this.props.inputFiles)
    }
    var script = action === Action.mouseMove && this.props.onMouseMoveScript ? this.props.onMouseMoveScript : action === Action.click && this.props.onClickScript ? this.props.onClickScript : undefined
    let result: ChangeResult
    if (script || !action) {
      result = await change({ ...ev, script: script || this.handleChange, ctx: this.ctx!, inputFiles: this.inputFiles })
    }
    var resultFn = action === Action.mouseMove && this.props.onMouseMoveScriptResult ? this.props.onMouseMoveScriptResult : action === Action.click && this.props.onClickScriptResult ? this.props.onClickScriptResult : undefined
    if (resultFn) {
      await resultFn(result)
    }
    var userFn = action === Action.mouseMove && this.props.onMouseMove ? this.props.onMouseMove : action === Action.click && this.props.onClick ? this.props.onClick : undefined
    if (userFn) {
      userFn(ev)
    }
  }
}
