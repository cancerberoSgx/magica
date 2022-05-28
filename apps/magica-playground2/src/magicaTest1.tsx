import * as React from 'react';
import { File, run } from 'magica';
import { useAppState } from './state';
import { callRun } from './worker/workerAccess';

export const MagicaTest1 = props => {
  const { state, setState } = useAppState();
  return <div>
    <div>Load or declare images from local file system and URLs here:</div><br />
    <input onChange={async (e) => {
      var inputFiles = [await File.fromUrl(e.currentTarget.value)];
      const r = await run({ inputFiles, command: `convert ${inputFiles[0].name} -rotate 90 output.png` });
      console.log(r);

      setState({ ...state, inputFiles });
    }} placeholder='https://i.imgur.com/FVKBIJ7.png' />
    <br /><br />
    <input type="file" placeholder='foo.jpg' onChange={async (e) => {
      var inputFiles = await File.fromHtmlFileInputElement(e.currentTarget);
      setState({ ...state, inputFiles: [...state.inputFiles, ...inputFiles.filter(f => !state.inputFiles.find(f2 => f2.name == f.name))].reverse() });

      const r = await callRun({ 
        inputFiles, 
        fields: {},
        script: `
      convert ${inputFiles[0].name} -rotate 90 output.png
      ` })

      // const r = await run({ inputFiles, script: `
      // convert ${inputFiles[0].name} -rotate 90 output.png
      // ` });
      
      console.log(r);
      const outputFiles = [await (await File.fromArrayBuffer(r.outputFiles[0].content.buffer)).asDataUrl()];
      setState({ ...state, inputFiles, outputFiles });
    }} />

    <img src={state.outputFiles[0]} alt="outputImage" />
  </div>;
};
