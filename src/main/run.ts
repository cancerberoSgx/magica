import { asArray, notUndefined, serial } from 'misc-utils-of-mine-generic'
import { File } from '../file/file'
import { getOption } from '../options'
import { Options, Result, RunOptions, RunResult, ScriptEvent } from '../types'
import { arrayToCliOne, cliToArray, processCommand } from './command'
import { _compileTimePreprocess as compileTimePreprocess, _runTimePreprocess } from './executeCommandPreprocessor'
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
  var scriptStartEvent: ScriptEvent = {
    name: 'onScriptStart',
    scriptOptions: o,
    stopPropagation: false,
    scriptInterrupt: false
  }
  if (o.scriptListener) {
    o.scriptListener(scriptStartEvent)
  }
  const emscriptenNodeFsRoot = getOption('emscriptenNodeFsRoot')
  let inputFiles = await File.resolve(o.inputFiles)
  const commands = await resolveRunCommands({
    ...o,
    inputFiles: inputFiles.filter(notUndefined).map(File.asFile)
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
  if (scriptStartEvent.scriptInterrupt) {
    return { ...finalResult, error: new Error('Script interrupted by listener') }
  }
  await serial(commands.map((command, i) => async () => {
    // try {
    let mainOptions: Options = { ...o, command, inputFiles: inputFiles.map(File.asFile) } as any //TODO
    // o.debug && console.log('Before run-time preprocessor the commands are', mainOptions.command , 'current command is ', mainOptions.command)

    await _runTimePreprocess(o, mainOptions, i)

    // o.debug && console.log('after run-time preprocessor bt before main() call the commands are', mainOptions.command , 'current command is ', mainOptions.command)

    // mainOptions.command  = Array.isArray( mainOptions.command  )? mainOptions.command  : processCommand(mainOptions.command ||[])
    let result: Result = await main(mainOptions)
    // console.log('end', mainOptions);
    // 
    // o.debug && console.log('after main() call the commands are', mainOptions.command , 'current command is ', mainOptions.command)

    // var commandEndEvent: ScriptEvent = {
    //   name: 'afterCommand',
    //   scriptOptions: o,
    //   commandOptions: mainOptions,
    //   stopPropagation: false,
    //   scriptInterrupt: false,
    //   commandResult: result
    // }
    // if (o.scriptListener) {
    //   o.scriptListener(commandEndEvent)
    //   //TODO: stopPropagation and scriptInterrupt
    // }

    result.outputFiles = result.outputFiles.map(f => ({ ...f, name: f.name.startsWith(emscriptenNodeFsRoot) ? f.name.substring(emscriptenNodeFsRoot.length + 1) : f.name })).map(File.asFile)
    inputFiles = [...inputFiles.filter(f => !result.outputFiles.find(f2 => f2.name === f.name)),
    ...result.outputFiles].map(File.asFile)
    finalResult.results.push(result)
    finalResult.commands[i] = processCommand(mainOptions.command)
    // console.log('finalResult.commands', finalResult.commands);

    // } catch (error) {
    //   console.error('Error on ' + i + 'th command', error);
    // }
  }))
  const r: RunResult = {
    ...finalResult,
    stdout: finalResult.results.map(r => r.stdout).flat(),
    stderr: finalResult.results.map(r => r.stderr).flat(),
    outputFiles: finalResult.results.length ? finalResult.results[finalResult.results.length - 1].outputFiles.map(File.asFile) : []
  }
  // console.log('r: RunResult', r.commands);

  return r
}

async function resolveRunCommands(o: RunOptions) {
  if ((!o.script || !o.script.length) && (!o.command || !o.command.length)) {
    throw new Error('No script or command given')
  }
  o = await compileTimePreprocess(o)
  let script: string
  if (o.script && o.script.length) {
    script = asArray(o.script).join('\n')
  }
  else {
    script = arrayToCliOne(asArray(o.command!))
  }
  const commands = cliToArray(script)
  // const commands = await serial(cliToArray(script).map(command=>async ()=>{
  //   var args = await serial(command.map(arg=>async ()=>{
  //     if(unquote(arg).trim().startsWith('<$=')) {
  //       return await _runTimePreprocess({...o, command, arg})
  //     }else {
  //       return [arg]
  //     }
  // }))
  // return args.flat()

  // }))
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
