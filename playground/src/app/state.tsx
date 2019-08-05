import { File, RunResult } from 'magica'
import { Example, examples } from "./examples"

export interface State {
  example: Example
  inputFiles: File[]
  examples: Example[];
  result: RunResult | undefined
  script: string
  working: boolean
  showAllResultsOutput: boolean
  fields:Field[]
}

export interface Field{
  // getValue():string
  id:string
  value: string
}

export interface ParserError {
  line: number
  column: number
  msg: string
  e: any
}

export async function getInitialState(): Promise<State> {
  var example = examples[0]
  return {
    example,
    inputFiles: [],
    examples,
    result: null as any,
    script: '',
    working: false,
    showAllResultsOutput: true,
    fields: []
  }
}
