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
    // return <label>
    //   {props.field.id}
    //   <input type="number" value={value} onChange={e => {
    //     const newValue = props.field.type === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value)
    //     setValue(newValue)
    //     props.onChange({ newValue })
    //   }} />
    // </label>

    return <div className="field">

<span className="icon-text">
  <span className="icon">
    <i className="fas fa-home"></i>
  </span>
  <label className="label">{props.field.id}</label>
</span>

      
      

      <div className="control has-icons-left has-icons-right">
        <input className="input" type="number" value={value} placeholder={value + ''}
          onChange={e => {
            const newValue = props.field.type === 'float' ? parseFloat(e.target.value) : parseInt(e.target.value)
            setValue(newValue)
            props.onChange({ newValue })
          }} />
        <span className="icon is-small is-left">
          <i className="fas fa-user"></i>
        </span>
        <span className="icon is-small is-right">
          <i className="fas fa-check"></i>
        </span>
      </div>
      <p className="help is-success">This username is available</p>
    </div>

  } else {
    return <label>
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
