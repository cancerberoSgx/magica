import { readFileSync } from 'fs'
import * as gui from 'gui'
import { File, mainSync } from 'magica'
import { StateComponent } from "./abstractComponent"
import { State } from './state'
import {Fn} from 'misc-utils-of-mine-generic'

interface CP {
  win: gui.Window
}

type RP = 'currentBuffer'

export class Canvas extends StateComponent<CP> {
  protected view: gui.Scroll = null as any
  protected relevantProperties: RP[] = ['currentBuffer']
  protected win: gui.Window = null as any
  protected canvas: gui.Canvas = null as any
  protected image: gui.Image = null as any
  protected canvasContainer: gui.Container  = null as any

  render() {
    this.view = gui.Scroll.create()
    this.view.setStyle({ flex: 1, flexGrow: 1, width: '100%', height: '100%', flexDirection: 'column' })
    this.view.setBackgroundColor('#ffffff')
    this.canvasContainer = gui.Container.create()
    this.canvasContainer.setBackgroundColor('#ffffff');
    // this.canvasContainer.onMouseUp
    // (this.canvasContainer.onMouseUp as gui.Signal<(self: gui.Container, event: gui.MouseEvent)=> void>).connect( (self, event) => {
    (this.canvasContainer.onMouseMove as gui.Signal<(self: gui.Container, event: gui.MouseEvent)=> void>).connect( (self, event) => {
      console.log('handleOnMouseMove2', this.state.options.onMouseMove);
      if (!this.state.options.onMouseMove) {
        return
      }
      const command = `convert output.miff -matte -virtual-pixel white -distort Barrel '-0.4 0.7 0.2 0.5 ${event.positionInView.x} ${event.positionInView.y}' output.jpg`
      const result = mainSync({
        command,
        inputFiles: [new File('output.miff', this.state.magicaBuffer)],
      })
      this.setState({
        currentBuffer: result.outputFiles[0].content,
        working: undefined,
        time: result.times ? result.times.total : 0
      })
    });
    this.view.setContentView(this.canvasContainer)
    this.drawImage(readFileSync(this.state.image));
    (this.canvasContainer.onDraw as gui.Signal<(self: gui.Container, painter: gui.Painter, dirty: gui.RectF)=>void>).connect((self: gui.Container, painter: gui.Painter, dirty: gui.RectF) => {
      painter.drawCanvasFromRect(this.canvas, dirty, dirty)
      // painter.drawImageFromRect(this.image, dirty, dirty)
    })
    return this.view
  }

  drawImage(p: ArrayBuffer | ArrayBufferView) {
    if(!p){
      return 
    }
    this.image = gui.Image.createFromBuffer(p, 1)
    const size = this.image.getSize()
    this.view.setContentSize(size)
    this.canvas = gui.Canvas.create(size, 1)
    this.canvas.getPainter().drawImage(this.image, { x: 0, y: 0, ...size })
    this.canvasContainer.schedulePaint() // TODO: scheduleRectPaint - only scroll viewport
  }

  protected stateChanged(names: RP[], s: Partial<State>) {
    this.drawImage(s.currentBuffer!) 
  }
}
