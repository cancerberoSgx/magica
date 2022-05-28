import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { BulmaTest } from './bulmaTest'
import { PresetsSection } from './presets'
import { initialState, initState, useAppState } from './state'
import './styles.css'

const Main: React.FC = () => {
  const [appState, setAppState] = React.useState(initialState)
  initState(appState, setAppState)
  return <Body />
}

const Body = () => {
  const { state, setState } = useAppState()
  return <>
    <PresetsSection />
    <BulmaTest/>
  </>
}

ReactDOM.render(<Main />, document.getElementById('root'));
