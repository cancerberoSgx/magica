import { File, RunResult  } from 'magica'
import { Example, examples } from 'magica-examples';

export interface State {
  example: Example
  inputFiles: File[]
  examples: Example[];
  result: RunResult | undefined
  script: string
  working: boolean
  showAllResultsOutput: boolean
  fields: Field[]
  app: AppOptions
}

export interface AppOptions {
  projectAddress: string
}

export interface Field {
  id: string
  value: string
}

export interface ParserError {
  line: number
  column: number
  msg: string
  e: any
}

export async function getInitialState( app:AppOptions): Promise<State> {
  var example = examples()[0]
  return {
    example,
    inputFiles: [],
    examples: examples(),
    result: null as any,
    script: '',
    working: false,
    showAllResultsOutput: true,
    fields: [],
    app
  }
}
