import { checkThrow, notUndefined } from 'misc-utils-of-mine-generic'

export function processCommand(command: string | string[]) {
  if (typeof command !== 'string') {
    return command
  }
  return checkThrow<string[]>(cliToArrayOne(command), 'Cannot create a command array from given string ' + command)
}

/**
 * Generates a valid command line command from given `string[]` command. Works with a single command.
 */
export function arrayToCliOne(command: string[]): string {
  return command
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
export function arrayToCli(command: string[] | string[][]): string {
  const cmd = typeof command[0] === 'string' ? [command as string[]] : command as string[][]
  return cmd.map(arrayToCliOne).join('\n')
}

/**
 * Generates a command in the form of array of strings, compatible with {@link call} from given command line string . The string must contain only one command (no newlines).
 */
function cliToArrayOne(cliCommand: string): string[] | undefined {
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
    .map((spaceIndex, i) => cliCommand.substring(i === 0 ? 0 : spaceIndexes[i - 1], spaceIndexes[i]).replace(/^[ ]+/, '').replace(/[ ]+$/, ''))
    .filter(s => !!s)

    // remove quotes
    .map(s => s.startsWith(`'`) ? s.substring(1, s.length) : s)
    .map(s => s.endsWith(`'`) ? s.substring(0, s.length - 1) : s)

    //  unescape parenthesis
    .map(s => s === `\\(` ? `(` : s === `\\)` ? `)` : s)

    .map(s => s.replace(/\\n/g, '\n')) // so `%w\\n` is transformed to `%w\n' - we cant have new lines because of cliToArray split('\n') - so user must escape it and here we unescape
  return command
}

/**
 * Generates a command in the form of `string[][]` that is compatible with {@link call} from given command line string.
 * This works for strings containing multiple commands in different lines. and also respect `\` character for continue the same
 * command in a new line. See {@link ExecuteCommand} for more information.
 */
export function cliToArray(cliCommand: string): string[][] {
  const lines = cliCommand.split('\n')
    .map(s => s.trim())
    .map(cliToArrayOne)
    .filter(notUndefined)
    .filter(a => a.length)
  const result = []
  let currentCommand: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line[line.length - 1] !== '\\') {
      currentCommand = currentCommand.concat(line)
      //@ts-ignore
      result.push(currentCommand)
      currentCommand = []
    }
    else {
      currentCommand = currentCommand.concat(line.slice(0, line.length - 1))
    }
  }
  return result
}
