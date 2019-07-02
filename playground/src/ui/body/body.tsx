import { asArray, notUndefined } from 'misc-utils-of-mine-generic'
import * as React from 'react'
import { Grid, Segment } from 'semantic-ui-react'
import { AbstractComponent } from '../component'
import { Command } from './command'
import { Output } from './output';

export class Body extends AbstractComponent {
  render() {
    return (
      <Segment basic className="appBody">
        <Grid>
          <Grid.Column floated='left' width={8}>          
         <Command/>
          </Grid.Column>
          <Grid.Column floated='right' width={8}>
          <Output/>
                asasdasds
          </Grid.Column>
        </Grid>
      </Segment>)
  }
}
