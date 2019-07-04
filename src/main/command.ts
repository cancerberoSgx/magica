import { notUndefined, flat } from 'misc-utils-of-mine-generic';

// export function processCommand(command: string | string[]) {
//   if (typeof command !== 'string') {
//     return command
//   }
//   return command.split(/\s+/g) // TODO: support quoted args
// }

export type Command = string[]

// export interface ExecuteConfig {
//   inputFiles?: MagickInputFile[]
//   /**
//    */
//   commands: ExecuteCommand
// }

/**
 *
 * Commands could have the following syntaxes:
 *  * array form like `[['convert', 'foo.png', 'bar.gif'], ['identify', 'bar.gif']]`
 *  * just one array: `['convert', 'foo.png', 'bar.gif']`
 *  * command line strings: `['convert foo.png bar.gif', 'idenfity bar.gif']`
 *  * just one string: `'convert foo.png bar.gif'`
 *
 * Also, for command line strings, multiple commands can be specified in the same string separating with new lines:
 *
 * ```js
 * const result = await execute(`
 *   convert rose: -sharpen 0x1 reconstruct.jpg
 *   compare rose: reconstruct.jpg difference.png
 *   compare -compose src rose: reconstruct.jpg difference.png
 * `)
 * ```
 *
 * Also, command line strings support breaking the same command in multiple lines by using `\` like in:
 *
 * ```js
 * const result = await execute(`
 *   convert -size 250x100 xc: +noise Random -channel R -threshold .4% \\
 *     -negate -channel RG -separate +channel \\
 *     \( +clone \) -compose multiply -flatten \\
 *     -virtual-pixel Tile -background Black \\
 *     -blur 0x.6 -motion-blur 0x15-90 -normalize \\
 *     +distort Polar 0 +repage 'star inward.gif'
 * `)
 * ```
 *
 * If you need to escape arguments like file names with spaces, use single quotes `'`, like the output file in the previous example `'star inward.gif'`
 */
export type ExecuteCommand = Command[] | Command | string



function isArrayOfStrings(a: any): a is string[] {
  return Array.isArray(a) && (a.length === 0 || typeof a[0] === 'string')
}

function isArrayOfArrays(a: any): a is any[][] {
  return Array.isArray(a) && (a.length === 0 || Array.isArray(a[0]))
}

function isArrayOfArrayOfStrings(a: any): a is any[][] {
  return isArrayOfArrays(a) && (a[0][0].length === 0 || typeof a[0][0] === 'string')
}

export function processCommand(command: string | string[]) {
  if (typeof command !== 'string') {
    return command
  }
  return command.split(/\s+/g) // TODO: support quoted args
}

// export function combinations<T>(arr: T[], fn: (a: T, b: T) => Promise<any>): Promise<any> {
//   const promises:Promise<any>[] = []
//   arr.forEach(f1 => {
//     arr.
//       filter((f2, i, subarr) => i > subarr.indexOf(f1))
//       .forEach(f2 => promises.push(fn(f1, f2)))
//   })
//   return Promise.all(promises)
// }


// import { Command } from '..'
// import { ExecuteCommand } from '../execute'
// import { flat, isArrayOfStrings, isArrayOfArrayOfStrings } from './misc'

/**
 * Generates a valid command line command from given `string[]` command. Works with a single command.
 */
function arrayToCliOne(command: Command): string {
  return command
    .map(c => c + '')

    // if it contain spaces
    .map(c => (c.trim().match(/\s/)) ? `'${c}'` : c)

    // escape parenthesis
    .map(c => c.trim() === '(' ? '\\(' : c.trim() === ')' ? '\\)' : c)

    .join(' ')
}

/**
 * Generates a valid command line string from given `string[]` that is compatible with  {@link call}. Works with multiple
 * commands by separating  them with new lines and support comand splitting in new lines using `\`.
 * See {@link ExecuteCommand} for more information.
 */
export function arrayToCli(command: Command | Command[]): string {
  const cmd = typeof command[0] === 'string' ? [command as Command] : command as Command[]
  return cmd.map(arrayToCliOne).join('\n')
}

/**
 * Generates a command in the form of array of strings, compatible with {@link call} from given command line string . The string must contain only one command (no newlines).
 */
export function cliToArrayOne(cliCommand: string): Command|undefined {
  if (cliCommand.trim().startsWith('#')) {
    return undefined
  }
  let inString = false
  const spaceIndexes = [0]
  for (let index = 0; index < cliCommand.length; index++) {
    const c = cliCommand[index]
    if (c.match(/[ ]/im) && !inString) {
      spaceIndexes.push(index)
    }
    if (c === `'`) {
      inString = !inString
    }
  }
  spaceIndexes.push(cliCommand.length)
  const command = spaceIndexes
    // .map((spaceIndex, i) => cliCommand.substring(i === 0 ? 0 : spaceIndexes[i - 1], spaceIndexes[i]).trim())
    .map((spaceIndex, i) => cliCommand.substring(i === 0 ? 0 : spaceIndexes[i - 1], spaceIndexes[i]).replace(/^[ ]+/, '').replace(/[ ]+$/, ''))
    .filter(s => !!s)

    // remove quotes
    .map(s => s.startsWith(`'`) ? s.substring(1, s.length) : s)
    .map(s => s.endsWith(`'`) ? s.substring(0, s.length - 1) : s)

    //  unescape parenthesis
    .map(s => s === `\\(` ? `(` : s === `\\)` ? `)` : s)

    .map(s=>s.replace(/\\n/g, '\n')) // so `%w\\n` is transformed to `%w\n' - we cant have new lines because of cliToArray split('\n') - so user must escape it and here we unescape
    // .map(s=>s)
  // debugger1
  return command
}

/**
 * Generates a command in the form of `string[][]` that is compatible with {@link call} from given command line string.
 * This works for strings containing multiple commands in different lines. and also respect `\` character for continue the same
 * command in a new line. See {@link ExecuteCommand} for more information.
 */
export function cliToArray(cliCommand: string): Command[] {
  const lines = cliCommand.split('\n')
    .map(s => s.trim())
    .map(cliToArrayOne)
    .filter(notUndefined)
    .filter(a => a.length) 
  const result = []
  let currentCommand: Command = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line[line.length - 1] !== '\\') {
      currentCommand = currentCommand.concat(line)
      result.push(currentCommand)
      currentCommand = []
    }
    else {
      currentCommand = currentCommand.concat(line.slice(0, line.length - 1))
    }
  }
  return result
}

/**
 * Makes sure that given {@link ExecuteCommand}, in whatever syntax, is transformed to the form `string[][]` that is compatible with {@link call}
 */
export function asCommand(c: ExecuteCommand): Command[]  {
  if (!c) {return []}
  if (typeof c === 'string') { return asCommand([c]) }
  if (!c[0]) { return [] }
  if (isArrayOfStrings(c)) {
    return flat(c.map(cliToArray))
  }
  if (isArrayOfArrayOfStrings(c)) {
    // this means that the command is already a valid Command. This means that Execute Commands cannot be [['convert a'], ['convert b']]
    return c as Command[]
  }else {
    throw new Error('Could not build Command from '+c)
  }

}

export function unquote(s: string): string {
  s = s.startsWith('\'') ? s.substring(1, s.length) : s
  return s.endsWith('\'') ? s.substring(0, s.length - 1) : s
}