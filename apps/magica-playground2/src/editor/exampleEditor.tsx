import * as React from 'react';
import { useState } from 'react';
import { Example, ExampleFields, examples } from 'magica-examples'
import { FieldEditor } from './fieldEditor';
import { getExamples } from '../examples/examples';

interface ExampleEditorProps {
  example: Example
  onChange: (e: ExampleEditorChangeEvent) => any
}


interface ExampleEditorChangeEvent {
  newValues: ExampleFields
}

export const ExampleEditor = (props: ExampleEditorProps) => {
  if(!props.example) {
    return <div></div>
  }
  props.example.fields = props.example.fields || []
  const initialValues = {};
  props.example.fields.forEach(f => {
    initialValues[f.id] = f.value
  })
  const [values, setValues] = useState(initialValues)

  return <div>
    {props.example.fields.map(field =>
      <div key={field.id} >
        <FieldEditor field={field} onChange={e => {
          const newValues = { ...values, [field.id]: e.newValue }
          setValues(newValues)
          props.onChange({ newValues })
        }} />
      </div>
    )}
  </div>
}

export const ExampleEditorTest = (props) => {
  const example = getExamples().find(e => e.name === 'Orton effect')
  return <div>
    Example editor
    <ExampleEditor example={example} onChange={e => {
      console.log('change', e.newValues);
    }} />
  </div>
}
