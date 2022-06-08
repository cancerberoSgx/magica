import { useAppState } from "./state";
import { File, run } from 'magica'
import { fileToDataUrl, getExampleFields } from "./util";
import { Example, ExampleFields } from "magica-examples";
import { callRun, RunConfig } from "./worker/workerAccess";

export async function setInputFiles(inputFiles: File[]) {
  const [state, setState] = useAppState()
  const inputFilesDataUrls = await Promise.all(inputFiles.map(f => fileToDataUrl(f)))
  setState({ ...state, inputFiles, inputFilesDataUrls })
}

export async function setSelectedExample(selectedExample: Example) {
  const [state, setState] = useAppState()
  const fields = getExampleFields(selectedExample)
  setState({ ...state, selectedExample, fields })
  await execute()
}

export async function setFields(fields: ExampleFields) {
  const [state, setState] = useAppState()
  setState({ ...state, fields })
  await execute()
}

export async function execute() {
  const [state, setState] = useAppState()
  const runConfig: RunConfig = {
    fields: state.fields,
    inputFiles: state.inputFiles,
    script: state.selectedExample.script
  }
  console.log('execute', runConfig);
  console.time('run')
  const r = await callRun(runConfig)
  console.timeEnd('run')

  console.error('empty outputFiles, stdout', r.stdout, ', stderr', r.stderr, ', error', r.error);

  discardOutputFiles()

  // const outputFiles = [await fileToDataUrl(r.outputFiles[0])];
  const outputFiles = [URL.createObjectURL(new Blob([r.outputFiles[0].content]))]

  setState({ ...state, outputFiles })
}

function discardOutputFiles() {
  const [state, setState] = useAppState()
  state.outputFiles.forEach(file => {
    URL.revokeObjectURL(file)
  })
}
