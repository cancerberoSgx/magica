import { File, main, Result } from 'magica'
import { Example, examples } from "./examples"

export interface State {
  example: Example
  inputFiles: File[]
  examples: Example[];
  result: Result
}

export interface ParserError {
  line: number
  column: number
  msg: string
  e: any
}

export async function getInitialState(): Promise<State> {
  const result = await main({ command: examples[0].command })
  return {
    example: examples[0],
    inputFiles: [],
    examples,
    result
  }
}
