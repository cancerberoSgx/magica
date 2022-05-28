import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BulmaTest } from './bulmaTest/bulmaTest'
import { initialState, initState, useAppState } from './state'
import './styles.css'
import { MagicaTest1 } from './magicaTest1'
import { FieldEditorTest } from './editor/fieldEditor'
import { ExampleEditorTest } from './editor/exampleEditor'
import { ImageEditorTest } from './editor/imageEditor'

const Main: React.FC = () => {
  const [appState, setAppState] = React.useState(initialState)
  initState(appState, setAppState)
  return <Body />
}

const Body = () => {
  return <>
    <ImageEditorTest />
    <MagicaTest1/>
    <FieldEditorTest/>
    <ExampleEditorTest/>
    <BulmaTest/>
  </>
}

ReactDOM.render(<Main />, document.getElementById('root'));
