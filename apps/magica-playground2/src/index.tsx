import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BulmaTest } from './probes/bulmaTest'
import { initialState, initState, useAppState } from './state'
import { MagicaTest1 } from './probes/magicaTest1'
import { FieldEditorTest } from './editor/fieldEditor'
import { ExampleEditorTest } from './editor/exampleEditor'
import { ImageEditorTest } from './editor/imageEditor'
import { ExamplesSelectionTest } from './ui/exampleSelection'
import { File } from 'magica'
import { setInputFiles } from './handlers'
import { MainLayout } from './ui/mainLayout'

const Main: React.FC = () => {
  const [appState, setAppState] = React.useState(initialState)
  initState(appState, setAppState)
  return <Body />
}

const Body = () => {
  return <>
    <MainLayout/>
    {/* <ExamplesSelectionTest/>
    <ImageEditorTest />
    <MagicaTest1/>
    <FieldEditorTest/>
    <ExampleEditorTest/>
    <BulmaTest/> */}
  </>
}

ReactDOM.render(<Main />, document.getElementById('root'));

File.fromUrl('bluebells.png').then(file=>{
  setInputFiles([file])
})
