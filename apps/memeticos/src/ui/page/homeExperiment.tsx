import * as React from 'react'
import { Grid, Segment, Advertisement, HeaderContent, Image } from 'semantic-ui-react'
import { AbstractComponent } from '../common/component'
import { Header } from '../header'
import HeaderSubHeader from 'semantic-ui-react/dist/commonjs/elements/Header/HeaderSubheader'
import { State } from '../../app/state'
import { run, File, RunResult, loadHtmlImageElement } from 'magica'
import { notUndefined } from 'misc-utils-of-mine-typescript'
import { sleep } from 'misc-utils-of-mine-generic'

export class Home extends AbstractComponent {
  files: File[] = []
  img1?: HTMLImageElement | null
  logoUrl: string=null as any

  async componentDidMount(){
this.getLogoAnim()
  }

 async  getLogoAnim() {
if(this.logoUrl){
  return this.logoUrl
}
 let r3 = await  run({script: `
convert -font PoetsenOne-Regular.otf -background none \\
  -stroke black -strokewidth 2 \\
  -fill white -pointsize 85 'label:Meméticos' \\
  -trim ( +clone -background navy -shadow 120x5+5+4 ) +swap \\
  -background none -layers merge +repage -resize !800x200 label.png
`, inputFiles: [await File.fromUrl('PoetsenOne-Regular.otf'),]
})
// let f3 = r3.outputFiles[0]
// const b = 
// const u1 = URL.createObjectURL(new Blob([r3.outputFiles[0].content]))
// this.img1!.src=u1
    // loadHtmlImageElement (f3 as any, this.img1!)
// await sleep(300)

    this.files =(await Promise.all([ File.fromUrl('meme1.png'), File.fromUrl('meme2.png'), File.fromUrl('meme3.png')])).filter(notUndefined)
    let r = await  run({script: `
montage ${this.files.map(f=>f.name).join(' ')}  o1.miff
montage ${this.files.map(f=>f.name).reverse().join(' ')}   o2.miff
convert  o1.miff -virtual-pixel transparent -wave 12x12 o1.miff   o3.miff
convert o1.miff  -virtual-pixel transparent -distort Barrel '-0.4 0.7 0.2 0.5 20 20'   o4.miff
convert o2.miff  -virtual-pixel transparent -distort Barrel '0.4 0.7 0.2 0.5 200 20'   o5.miff
convert o3.miff  -virtual-pixel transparent -distort Barrel '-0.4 0.7 -0.2 0.5 100 20'  o6.miff
convert -virtual-pixel transparent -set delay 13 label.png o1.miff  o2.miff   o3.miff  o4.miff  o5.miff  o6.miff   -morph 10 -resize !800x200  o.gif
`, inputFiles: [r3.outputFiles[0] as any, ...this.files]})
  // debugger
    // loadHtmlImageElement (f1 as any, this.img1!)

//  -scale !800x200
// console.log(r.results.map(r=>r.outputFiles).flat().filter(notUndefined) );

await sleep(100)
// const f = r.results[r.results.length-2].outputFiles[0]
   let r2 = await  run({script: `
convert -set delay 11 label.png   -virtual-pixel edge \\
  ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )   \\
  ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )   \\
  ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )   \\
  ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )   \\
  ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )   \\
o3.miff   -virtual-pixel mirror   \\
  ( +clone -distort SRT -37 ) ( +clone -distort SRT -37 )  \\
  ( +clone -distort SRT -37 ) ( +clone -distort SRT -37 )  \\
  ( +clone -distort SRT -37 ) ( +clone -distort SRT -37 )  \\
  ( +clone -distort SRT -37 ) ( +clone -distort SRT -37 )  \\
  o6.miff \\
 ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )  \\
 ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )  \\
 ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )  \\
 ( +clone -distort SRT 37 ) ( +clone -distort SRT 37 )  label.png -morph 5 label.png o.gif label.png -resize !800x200   o2.gif 
`, inputFiles: r.results.map(r=>r.outputFiles).flat().filter(notUndefined) .concat(r3.outputFiles[0] as any)
})

// alert('end')

// let f2 = 
//    loadHtmlImageElement (f2 as any, this.img1!)
// await sleep(14000)
// let f1 = r.outputFiles[0]

// const b = new Blob([f1.content])
this.logoUrl = URL.createObjectURL(new Blob([r2.outputFiles[0].content]))
// const u3 = URL.createObjectURL(new Blob([f1.content]))
// delete f1.content
// delete f2.content
// delete f3.content
r2=undefined as any
r=undefined as any
r3=undefined as any
// f2=undefined as any
this.files = []
// f1=undefined as any
// f3=undefined as any
// URL.revokeObjectURL(u1)
// this.img1!.src = u2
// setInterval(async ()=>{
// await sleep(14000)
// this.img1!.src = u3
// await sleep(14000)

// this.logoUrl = u1
// this.img1!.src = this.logoUrl
// await sleep(4000)
// }, 42000)

// File.asFile(f1 as any).as
// delete r3.results
// delete r3.outputFiles
// delete r2.results
// delete r2.outputFiles
// delete r.results
// delete r.outputFiles

//   // debugger
    // loadHtmlImageElement (f2 as any, this.img1!)
// await sleep(100000)

// // setInterval(async ()=>{
//    loadHtmlImageElement (f2 as any, this.img1!)
// await sleep(14000)
//     loadHtmlImageElement (f1 as any, this.img1!)
// await sleep(14000)


// //   // debugger
//     loadHtmlImageElement (f3 as any, this.img1!)
// await sleep(15000)  
// // loadHtmlImageElement (f2 as any, this.img1!)
// // await sleep(4000)
// //     loadHtmlImageElement (f1 as any, this.img1!)
// // await sleep(4000)  
// // loadHtmlImageElement (f3 as any, this.img1!)
// // await sleep(4000)  
// //       loadHtmlImageElement (f1 as any, this.img1!)
// // await sleep(4000)  
// // loadHtmlImageElement (f2 as any, this.img1!)
// // await sleep(4000)
// //     loadHtmlImageElement (f1 as any, this.img1!)
// // await sleep(4000)  
// // loadHtmlImageElement (f3 as any, this.img1!)
// // await sleep(4000)  
// // } , 30000)
// return u2
  }
  shouldComponentUpdate(nextProps:any, nextState: State, nextContext: any){
  // this.dirty  =this.dirty || !this.state.librariesReady && nextState.librariesReady
  return true
       }
     
  render() {
    return (
      <Segment basic className="appHome" >
        <Grid>
          <Grid.Row height={8}>
<img ref={c=>this.img1=c }/>
              <Advertisement unit='leaderboard' test='Meméticos' content="the meme designer" centered/>
            {/* <Advertisement unit="large leaderboard"> */}
              {/* <HeaderContent> Meméticos</HeaderContent> */}

              {/* <HeaderSubHeader>the meme designer</HeaderSubHeader> */}
              {/* μιμητής (imitator, pretender)<br/> */}
              {/* </Advertisement> */}
{/* <Image src="meme.png"/> */}
          </Grid.Row>
          <Grid.Row  height={8}>
            <a href="">Get started</a>
          </Grid.Row>
        </Grid>
      </Segment>)
  }
}
