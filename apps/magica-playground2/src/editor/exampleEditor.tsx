import * as React from 'react';
import { useState } from 'react';
import { Example, ExampleField, examples } from 'magica-examples'
import { FieldEditor } from './fieldEditor';

interface ExampleEditorProps {
  example: Example
  onChange: (e: ExampleEditorChangeEvent) => any
}

export type ExampleFields = { [k: string]: string | number | undefined }

interface ExampleEditorChangeEvent {
  newValues: ExampleFields
}

export const ExampleEditor = (props: ExampleEditorProps) => {
  props.example.fields = props.example.fields || []
  const initialValues = {};
  props.example.fields.forEach(f => {
    initialValues[f.id] = f.value
  })
  const [values, setValues] = useState(initialValues)

  return <div>
    {props.example.fields.map(field =>
      <FieldEditor key={field.id} field={field} onChange={e => {
        const newValues = { ...values, [field.id]: e.newValue }
        setValues(newValues)
        props.onChange({ newValues })
      }} />
    )}
  </div>
}

export const ExampleEditorTest = (props) => {
  const example = examples().find(e => e.name === 'Orton effect')
  return <div>
    Example editor
    <ExampleEditor example={example} onChange={e => {
      console.log('change', e.newValues);
    }} />
  </div>
}
