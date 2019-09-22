import { readFileSync } from 'fs'
import * as gui from 'gui'
import { File, mainSync } from 'magica'
import { StateComponent, CommonProps } from "./abstractComponent"
import { State } from './state' 
import { ImageHandler } from './imageHandler'
import { throttle } from 'misc-utils-of-mine-generic'
import { getImageSize } from './imageUtil'

type RP = 'currentBuffer'

export class Canvas extends StateComponent<CommonProps> {
  protected view: gui.Scroll = null as any
  relevantProperties: RP[] = ['currentBuffer']
  protected win: gui.Window = null as any
  protected image: gui.Image = null as any
  protected canvasContainer: gui.Container  = null as any
 protected handler : ImageHandler = null as any
 protected off: gui.Vector2dF = null as any
  protected drawing=false
  
  render() {
    this.handler = new ImageHandler(this.props.win)
    this.view = gui.Scroll.create()
    this.view.setStyle({ 
      flex: 1, 
      flexGrow: 1,
       width: '100%',
        height: '100%', 
        flexDirection: 'column' 
        })
        // this.view.se
    // this.view.setBackgroundColor('#ffffff')
    this.canvasContainer = gui.Container.create();
    // this.canvasContainer.setBackgroundColor('#ffffff');
   this.canvasContainer.onMouseUp = (self, event) => {
      this.handler.handleCommand(event)
    }
    this.canvasContainer.onMouseMove= (self, event) => {
      this.state.onMouseMove && this.handler.handleCommand(event)
    }
    this.view.setContentView(this.canvasContainer)
    this.drawImage(this.state.currentBuffer);
     this.canvasContainer.onDraw = (self: gui.Container, p: gui.Painter, dirty: gui.RectF) => {
      if(this.drawing ){
        return
      }
      this.drawing=true
      p.drawImageFromRect(this.image, dirty, dirty) 
      // p.drawImage(this.image, {x: 0, y: 0, ...this.state.imageSize}) 
      this.drawing=false
    }

    return this.view
  }

 protected  drawImage(p:  ArrayBufferView) { 
    this.image = gui.Image.createFromBuffer(p, this.state.scaleFactor) 
  //  console.log(this.state.imageSize, getImageSize(p),  this.image.getSize());
    this.view.setContentSize(this.state.imageSize)
    const off = this.canvasContainer.offsetFromView(this.view)
    let s: gui.RectF
    if(this.off && off.x===this.off.x&&off.y==this.off.y) {
    const bounds = this.view.getBounds()
     s = {x: -1*off.x, y: -1*off.y, width: Math.min(this.state.imageSize.width, bounds.width||Infinity), height: Math.min(this.state.imageSize.height, bounds.height||Infinity), }
    }else {
      s={x: 0, y: 0, ...this.state.imageSize}
      this.off = off
    }
    this.canvasContainer.schedulePaintRect(s)  
    this.canvasContainer.schedulePaint()
  }

  stateChanged(names: RP[], s: Partial<State>) {
    s.currentBuffer && this.drawImage(s.currentBuffer) 
  }
}
