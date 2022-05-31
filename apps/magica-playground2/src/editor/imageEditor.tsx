// idea: we need an editor that allow user to indicate points in an image or even rectangles. 
// Examples: select a pixel color, select coordinate /region

import { examples } from 'magica-examples';
import * as React from 'react';
import { useState } from 'react';
import { IMAGE_URL1 } from '../probes/magicaTest1';
import { relativeCoords } from '../util';

interface ImageFieldEditor<T extends Point|Color = Point> {
  imageSource: string
  type?: 'point-coords'|'point-color'|'rectangle-coords' 
  onChange: (e: ImageEditorChangeEvent<T>) => any
}

interface Point {
  x: number
  y: number
}

type Color = string

interface ImageEditorChangeEvent<T extends Point|Color = Point> {
  result: T
}

export const ImageEditor = <T extends Point|Color = Point>(props: ImageFieldEditor<T>) => {
  const [active, setActive] = useState(false)

  return <div>
    <button disabled={active} onClick={e => {
      setActive(true)
    }}>select</button>

    <div className={`modal ${active ? 'is-active' : ''}`}>
      <div className="modal-background"></div>
      <div className="modal-content">
        <h2>Click the image to select a point</h2>
        <img src={props.imageSource} onClick={e=>{
          const imageCoords = relativeCoords(e)
          if(!props.type||props.type==='point-coords') {
            props.onChange({result: imageCoords as any})
          } else {
            throw new Error('not implemented')
          }
          setActive(false)
        }}></img>
        <p>TODO: Accept/cancel buttons. let user see what's selecting and then let them accept</p>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={e=>{
        setActive(false)
      }}></button>
    </div>


  </div>
}

export const ImageEditorTest = (props) => {
  return <div>
    <ImageEditor imageSource={IMAGE_URL1} onChange={e => {
      console.log('change', e); 
    }} />
  </div>
}
