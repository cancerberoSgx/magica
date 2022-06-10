import * as React from 'react';
import { useState } from 'react';
import { ExampleField, examples } from 'magica-examples'
import { capitalize } from '../util';
import { Tip } from '../ui/tip';
import { playgroundExamples } from '../examples/examples';

interface FieldEditorProps {
  field: ExampleField
  onChange: (e: FieldEditorChangeEvent) => any
}

interface FieldEditorChangeEvent<T = any> {
  newValue: T
}

export const FieldEditor = (props: FieldEditorProps) => {
  const [value, setValue] = useState(props.field.value)

  if (['integer', 'float'].includes(props.field.type)) {
    return <div className="field has-addons">
      <label className="label">{capitalize(props.field.id)}</label>
       :&nbsp;
      <div className="control">
        <input className="input is-small" type="number" value={value} placeholder={value + ''}
          onChange={e => {
            const newValue = props.field.type === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value)
            setValue(newValue)
            props.onChange({ newValue })
          }} />
      </div>
      <div className="control">
      <Tip className="is-right">Hello world</Tip>
      </div>
    </div>

  } else {
    return <div className="field has-addons">
      <label className="label">{capitalize(props.field.id)}</label>
       :&nbsp;
      <div className="control">
        <input className="input is-small" type="text" value={value} placeholder={value + ''}
         onChange={e => {
          setValue(e.target.value)
          props.onChange({ newValue: e.target.value })
        }} />
      </div>
      <div className="control">
        <Tip className="is-right">Hello world</Tip>
      </div>
    </div>

    // return <label>
    //   {props.field.id}
    //   <input type="text" value={value} onChange={e => {
    //     setValue(e.target.value)
    //     props.onChange({ newValue: e.target.value })
    //   }} />
    // </label>
  }
}

export const FieldEditorTest = (props) => {
  const example = playgroundExamples.find(e => e.name === 'Orton effect')
  return <div>
    Field editor
    <FieldEditor field={example.fields[0]} onChange={e => {
      console.log('change', e);
    }} />
  </div>
}
