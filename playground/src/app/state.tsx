import { Example, examples } from "./examples"
import { Result, main } from 'magica';
import { toDataUrl } from '../ui/common/uiUtil';

export interface State {
    // outputDataUrl?: string
    example: Example
  // logs: string[];
  // error?: Error | ParserError | ParserError[] | undefined;
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
  const result =  await main({command: examples[0].command})
  // debugger
  return {
    example: examples[0],
    // outputDataUrl:toDataUrl(result.outputFiles[0]),
    examples,
    result
  }
}
