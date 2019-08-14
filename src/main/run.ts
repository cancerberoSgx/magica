import { asArray, notUndefined, serial } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { magickLoaded } from '../imageMagick/magickLoaded'
import { getOption, setOptions } from '../options'
import { IFile, Options, Result, RunOptions, RunResult } from '../types'
import { arrayToCliOne, cliToArray, processCommand } from './command'
import { CustomCommandDispatchOptions, dispatchCustomCommand, isCustomCommand } from './customCommand'
import { _compileTimePreprocess, _runTimePreprocess } from './executeCommandPreprocessor'
import { main } from './main'

/**
 * Has a signature compatible with main, but if `script` is given instead of `command` option then it's
 * interpreted as a sequence of commands that are executed serially using [[main]]
 *
 * The output files of command N are added as input files for command n+1 replacing files with the same name.
 * This way users can write script-like behavior for complex tasks that require more than one command to be
 * implemented. 
 *
 * Also it supports shell script comments (lines starting with `#` are ignored) and breaking a single command
 * in multiple lines using `\`. 
 *
 * See [[RunOptions.script]] option.
 *
 * @returns the result of each command execution
 */
export async function run<T extends IFile = IFile>(o: RunOptions): Promise<RunResult<T>> {
  const t0 = Date.now()

  o.debug && setOptions({ debug: o.debug })

  const emscriptenNodeFsRoot = getOption('emscriptenNodeFsRoot')

  const { FS } = await magickLoaded
  FS.chdir(emscriptenNodeFsRoot)

  let inputFiles = await File.resolve(o.inputFiles)
  inputFiles = inputFiles.filter(notUndefined).map(File.asFile)
  const commands = await resolveRunCommands({
    ...o,
    inputFiles
  })

  const finalResult: RunResult = {
    results: [],
    commands,
    outputFiles: [],
    stderr: [],
    stdout: [],
    error: undefined,
    returnValue: undefined
  }

  await serial(commands.map((command, i) => async () => {
    // inputFiles = inputFiles.map(File.asFile)
    let mainOptions: Options = { ...o, command, inputFiles } as any //TODO

    await _runTimePreprocess(o, mainOptions, i)
    let result: Result
    if (await isCustomCommand(command)) {
      const customCommandOptions: CustomCommandDispatchOptions = {
        command,
        options: mainOptions,
        FS,
        // files: inputFiles,
        outputFiles: inputFiles
      }
      result = { ... await dispatchCustomCommand(customCommandOptions), outputFiles: inputFiles }
    } else {
      result = await main(mainOptions)
    }

    inputFiles = [
      ...inputFiles.filter(f => !result.outputFiles.find(f2 => f2.name === f.name)),
      ...result.outputFiles
    ]
      .map(File.asFile)

    finalResult.results.push(result)

    finalResult.commands[i] = processCommand(mainOptions.command)
  }))

  const r: RunResult<T> = {
    ...finalResult,
    stdout: finalResult.results.map(r => r.stdout).flat(),
    stderr: finalResult.results.map(r => r.stderr).flat(),
    outputFiles: finalResult.results.length ? finalResult.results[finalResult.results.length - 1].outputFiles : [] as any,
    times: {
      total: Date.now() - t0
    },
  }
  return r
}

async function resolveRunCommands(o: RunOptions) {
  if ((!o.script || !o.script.length) && (!o.command || !o.command.length)) {
    throw new Error('No script or command given')
  }
  o = await _compileTimePreprocess(o)
  let script: string
  if (o.script && o.script.length) {
    script = asArray(o.script).join('\n')
  }
  else {
    script = arrayToCliOne(asArray(o.command!))
  }
  const commands = cliToArray(script)
  return commands
}

export async function runOne(script: string, input: File | File[] = []) {
  const result = await run({ inputFiles: asArray(input), script })
  if (result.error) { throw new Error(result.error + '' + result.stderr.join(', ')) }
  if (!result.outputFiles.length) {
    throw new Error('Expected output files but none resulted')
  }
  return result.outputFiles[0]
}
