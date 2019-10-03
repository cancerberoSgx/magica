import * as React from 'react'
import { Grid, Segment, Advertisement, HeaderContent, Image, Header, HeaderSubheader, GridColumn } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'

export class Home extends AbstractComponent {
  render() {
    return (
      <Segment basic className="appHome" >
        <Grid centered columns="2">
          <Grid.Row height={8}>
            <Header as="h1">Meméticos</Header>
            <HeaderSubheader as="h4">the meme designer</HeaderSubheader>
{/* <img ref={c=>this.img1=c }/> */}
              {/* <Advertisement unit='leaderboard' test='Meméticos' content="the meme designer" centered/> */}
            {/* <Advertisement unit="large leaderboard"> */}
              {/* <HeaderContent> Meméticos</HeaderContent> */}

              {/* <HeaderSubHeader>the meme designer</HeaderSubHeader> */}
              {/* μιμητής (imitator, pretender)<br/> */}
              {/* </Advertisement> */}
{/* <Image src="meme.png"/> */}
          </Grid.Row>
          <Grid.Row  height={8}>
             <Grid centered columns="3">
                <Grid.Row  >
                  <GridColumn>Start with a template</GridColumn>
                  <GridColumn>Load an image</GridColumn>
                  <GridColumn>TODO</GridColumn>
                </Grid.Row>
             </Grid>
            <a href="">Get started</a>
          </Grid.Row>
        </Grid>
      </Segment>)
  }
}
