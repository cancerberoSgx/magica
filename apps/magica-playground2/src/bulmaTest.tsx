import * as React from 'react'
import { DropDown } from './DropDown'
import { NavBar } from './NavBar'
import {File, main} from 'magica'
import { useAppState } from './state'

export const BulmaTest = props => {
  const {state, setState} = useAppState()

  return <section className="section">
    <NavBar/>
    <div className="container">
      <h1 className="title">
        Hello World
      </h1>
      <p className="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>

      <div>Load or declare images from local file system and URLs here:</div><br />
      <input onChange={async e => {
        var inputFiles = [await File.fromUrl(e.currentTarget.value)]
        const r = await main({inputFiles, command: `convert ${inputFiles[0].name} -rotate 90 output.png`})
        console.log(r);
        
        setState({ ...state, inputFiles })
        }} placeholder='https://i.imgur.com/FVKBIJ7.png' />
        <br /><br />
      <input type="file" placeholder='foo.jpg' onChange={async e => {
        var inputFiles = await File.fromHtmlFileInputElement(e.currentTarget)
        const r = await main({inputFiles, command: `convert ${inputFiles[0].name} -rotate 90 output.png`})
        // console.log(r);
        const outputFiles = [await (await File.fromArrayBuffer(r.outputFiles[0].content.buffer)).asDataUrl()]
        
        inputFiles = [...state.inputFiles, ...inputFiles.filter(f => !state.inputFiles.find(f2 => f2.name == f.name))].reverse()
        
        setState({ ...state, inputFiles, outputFiles })
      }} />

      <img src={state.outputFiles[0]} alt="outputImage"/>

      <DropDown/>

    </div>
  </section>
  }