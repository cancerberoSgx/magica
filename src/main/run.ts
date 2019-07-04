import { Options, Result, RunOptions, RunResult } from '../types';
import { cliToArray, arrayToCliOne } from './command';
import { RemoveProperties, PropertyOptional, asArray, serial } from 'misc-utils-of-mine-generic';
import { main } from './main';
import { File } from '../file';

/**
 * Has a signature compatible with main, but if `script` is given instead of `command` option then it's interpreted as a sequence of commands that are executed serially using [[main]]
 * 
 * The output files of command N are added as input files for command n+1 replacing files with the same name. This way users can write script-like behavior for complex tasks that require more than one command to be implemented. 
 * 
 * Also it supports shell script comments (lines starting with `#` are ignored) and breaking a single command in multiple lines using `\`. 
 * 
 * See [[RunOptions.script]] option.
 *  
 * TODO: also supports command preprocessing API (for example command template) and virtual commands API (built in like cat, ls, substitution, variable, built in virtual commands).
 * 
 * @returns the result of each command execution
 */
export async function run(o: RunOptions) {
  const commands = resolveRunCommands(o);
  const finalResult: RunResult = { results: [], commands, outputFiles: [], stderr: [], stdout: [], error: undefined, returnValue: undefined }
  let inputFiles = await File.resolveOptions(o)
  await serial(commands.map(command => async () => {
    const result = await main({ ...o, command, inputFiles })
    inputFiles = inputFiles.filter(f => !result.outputFiles.find(f2 => f2.name === f.name)).concat(result.outputFiles)
    finalResult.results.push(result)
  }))
  const r: RunResult = {
    ...finalResult,
    stdout: finalResult.results.map(r => r.stdout).flat(),
    stderr: finalResult.results.map(r => r.stderr).flat(),
    outputFiles: finalResult.results.length ? finalResult.results[finalResult.results.length-1].outputFiles : []
  }
  return r
}


function resolveRunCommands(o: RunOptions) {
  if ((!o.script || !o.script.length) && (!o.command || !o.command.length)) {
    throw new Error('No script or command given');
  }
  let script: string;
  if (o.script && o.script.length) {
    script = asArray(o.script).join('\n');
  }
  else {
    script = arrayToCliOne(asArray(o.command!));
  }
  // const script = (asArray(o.script).join(' ')||asArray(o.command||'').join(' ')).trim()
  // if(!script){
  // }
  const commands = cliToArray(script);
  return commands;
}
//TODO shortcut signature - the wildcards could be implemented with command preprocessor
// var firstOutputFile = await runShortcut(`convert $1 $2 -compose foo.tiff`, File.fromUrl('dynamic/so/we/dont/the/filename.png'), File.fromUrl(sameAsPrevious))

// os just using template and pasing input files in context