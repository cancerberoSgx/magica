ideas for react component

### MagickEditor
 * <MagickEditor inputFiles={[...]}, script="convert a b" afterRun={fn}} showEditor allowInputFileChange allowOutputFileDownload allowScriptEdit layout="2-1-2" >... component specialized in representing a transformation. It can be minimal showing only output/1 output file and can be expressive, showing output and input files, letting user add more input files, modify & run scripts. 

### MagicView
 * <MagicView inputFiles={[...]}, script="convert a b"/>  : using something similar as canvas app, I would like a button with an image or similar that barrels when user mouse over and explode when user click it. objective - represent a fixed script that load a fixed amount of input files and perform transformation as fast as possible in a canvas
  
```jsx
<MagicView 
inputFiles={[verdana1, bg33]} 
image={`convert <%=inputFiles.find(f=>f.name.includes('bg33')) %>`} 
onMouseMoveScript={({f,x,y})=>`convert ${f} -matte -virtual-pixel transparent -distort Barrel '-0.4 0.7 0.2 0.5 ${x} ${y}'`}
onClickScript={({f,x,y})=>`js:!{puffAnimation(f,x,y)}'`}
onClick={e=>theRealAction()}
/>
```
