import { asArray, serial, notUndefined } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { getOption } from '../options'
import { Result, RunOptions, RunResult } from '../types'
import { arrayToCliOne, cliToArray } from './command'
import { _preprocessCommand } from './executeCommandPreprocessor'
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
export async function run(o: RunOptions) {
  const emscriptenNodeFsRoot = getOption('emscriptenNodeFsRoot')
  let inputFiles = await File.resolve(o.inputFiles)
  const commands = await resolveRunCommands({...o, inputFiles: inputFiles.filter(notUndefined).map(File.asFile)})
  const finalResult: RunResult = { results: [], commands, outputFiles: [], stderr: [], stdout: [], error: undefined, returnValue: undefined }
  await serial(commands.map((command, i) => async () => {
    try {
      const mainOptions = { ...o, command, inputFiles: inputFiles.map(File.asFile) }
      let result: Result
      result = await main(mainOptions)
      result.outputFiles = result.outputFiles.map(f => ({ ...f, name: f.name.startsWith(emscriptenNodeFsRoot) ? f.name.substring(emscriptenNodeFsRoot.length + 1) : f.name })).map(File.asFile)
      inputFiles = [...inputFiles.filter(f => !result.outputFiles.find(f2 => f2.name === f.name)),
      ...result.outputFiles].map(File.asFile)
      finalResult.results.push(result)
    } catch (error) {
      console.error('Error on ' + i + 'th command', error);
    }
  }))
  const r: RunResult = {
    ...finalResult,
    stdout: finalResult.results.map(r => r.stdout).flat(),
    stderr: finalResult.results.map(r => r.stderr).flat(),
    outputFiles: finalResult.results.length ? finalResult.results[finalResult.results.length - 1].outputFiles.map(File.asFile) : []
  }
  return r
}

async function resolveRunCommands(o: RunOptions) {
  if ((!o.script || !o.script.length) && (!o.command || !o.command.length)) {
    throw new Error('No script or command given')
  }
  o = await _preprocessCommand(o)
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
