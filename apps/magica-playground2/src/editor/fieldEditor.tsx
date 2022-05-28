import * as React from 'react';
import { useState } from 'react';
import { ExampleField, examples } from 'magica-examples'

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
    return <label>
      {props.field.id}
      <input type="number" value={value} onChange={e => {
        const newValue = props.field.type === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value)
        setValue(newValue)
        props.onChange({ newValue })
      }} />
    </label>
  } else {
    <label>
      {props.field.id}
      <input type="text" value={value} onChange={e => {
        setValue(e.target.value)
        props.onChange({ newValue: e.target.value })
      }} />
    </label>
  }
}

export const FieldEditorTest = (props) => {
  const example = examples().find(e => e.name === 'Orton effect')
  return <div>
    Field editor
    <FieldEditor field={example.fields[0]} onChange={e => {
      console.log('change', e);
    }} />
  </div>
}
