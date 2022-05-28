// idea: we need an editor that allow user to indicate points in an image or even rectangles. 
// Examples: select a pixel color, select coordinate /region

import { examples } from 'magica-examples';
import * as React from 'react';
import { useState } from 'react';
import { IMAGE_URL1 } from '../magicaTest1';
import { relativeCoords } from '../util';

interface ImageFieldEditor {
  imageSource: string
  type?: 'point-coords'|'point-color'|'rectangle-coords' 
  onChange: (e: ImageEditorChangeEvent) => any
}

interface ImageEditorChangeEvent<T = {x: number, y: number}> {
  result: T
}

export const ImageEditor = (props: ImageFieldEditor) => {
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
          //TODO: support types point-color, etc - right now only point coords
          props.onChange({result: relativeCoords(e)})
          setActive(false)
        }}></img>
      </div>
      <button className="modal-close is-large" aria-label="close" onClick={e=>{
        setActive(false)
      }}></button>
    </div>

  </div>
}

export const ImageEditorTest = (props) => {
  const example = examples().find(e => e.name === 'Orton effect')
  return <div>
    <button onClick={e => {

    }}>Edit image</button>
    <ImageEditor imageSource={IMAGE_URL1} onChange={e => {
      console.log('change', e); 
    }} />
  </div>
}
