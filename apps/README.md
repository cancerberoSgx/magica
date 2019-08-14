ideas for apps

- [ ] ttf to bitmap - load a ttf file, choose colors, size, style and letters and download a zip with all letters as bitmaps (trans png) or a single bitmap with all the letters and .json about each letter size to easy crop them.
- [ ] Text editor: fonts, size, styles, shadows, blend with images, shades, 3d, animations, and those styles that cannot be impl without img processing tool
- [ ] 

- [x] performance in canvas - real time is possible ?with IM ? 

## ideas for development

- [ ] monaco editor for syntax highlight and autocompletion for IM commands - autocompletion per command  
- [ ] monaco editor for IM script language ? 



## old notes


- [ ] a tool to convert ttf, ect font files to bitmaps (user can choose font size style colors shadows, background , transparency and policy to divide the glyphs  - single image vs multiple images.) etc. similar to http://kvazars.com/littera/ 

# <Magick> react component

* apps/magica-react
* to show the result images of gicen input files and commands as react component. whyle the command is executed show a comrfigurable loading visual feedback. example: 
  * how to solve wewirker ? 
  * support input as urls, blobs, image elements, canvas els, or passing directly the File objects
  * how to feedback errors / stdout, ect
 ```jsx
// example code - not recommended

  var inputFiles = await Promise.all(this.props.imageUrls .map(async url=>await File.fromUrl(url))) 
  var C2 = ()=><M inputFiles={inputFiles}/>
...
class M extends Component {
  render(){
    return <div>
  Pictures: 
    <ul>
      { this.props.imageUrls.map(url=><li> 
        <Magick 
        inputFiles={this.props.inputFiles} 
          script={`
        convert <%= await inputAt(1) %> <%= await inputAt(1) %> 
          `}
        includeIndex={[1,3]}
          />
    </li>)}
    </ul>
  </div> 
  }
}
 ```

- [ ] react components or generic html widgets that acts viewers. COnfigurable to provide different experiences:
 * Shows just the output images resulting from commandsw 
 * shows a compilete playground experience where users can upload / select input images interactively, change the command, show / filter output image files. and these components layouts.
