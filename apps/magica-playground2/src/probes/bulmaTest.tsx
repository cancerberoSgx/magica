import * as React from 'react'
import { DropDown } from './DropDown'
import { NavBar } from './NavBar'

export const BulmaTest = props => {

  return <section className="section">
    <NavBar/>
    <div className="container">
      <h1 className="title">
        Hello World
      </h1>
      <p className="subtitle">
        My first website with <strong>Bulma</strong>!
      </p>
      

      <DropDown/>

    </div>
  </section>
  }

