import { Result } from '../src'
export function filterResultStdErr(result: Result): string[] {
  return result.stderr.filter(s => !s.includes('UnableToOpenConfigureFile') && !s.includes('Calling stub instead of'))
}
