import { asArray, basename, isString, pathJoin, flatInstallArrayPrototype } from 'misc-utils-of-mine-generic'
flatInstallArrayPrototype()

import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs'
import { sync as glob } from 'glob'
import { processCommand } from '../main/command'
import { main } from '../main/main'
import { getOptions } from '../options'
import { CliOptions } from '../types'
import { getFileName } from '../util/fileUtil'

export async function cli(options: CliOptions) {
  preconditions(options as any)
  options = { ...getOptions(), ...options }
  options.debug && console.log(`CLI Options: ${JSON.stringify({ ...options, input: null })}`)
  const inputPaths = asArray(options.input).filter(isString)
    .map(f => glob(f)).flat().filter(existsSync)
  const result = await main({
    command: processCommand(options.command),
    inputFiles: inputPaths.map(name => ({ name: basename(name), content: readFileSync(name) }))
  })
  process.stdout.write((result.stdout || []).join('\n') + '\n')
  if (result.error || result.stderr) {
    process.stderr.write((result.stderr || []).join('\n') + '\n')
  }
  (result.outputFiles || []).forEach(f => {
    if (!existsSync(options.outputDir)) {
      mkdirSync(options.outputDir, { recursive: true })
    }
    const outputName = pathJoin(options.outputDir, getFileName(f.name))
    options.debug && console.log('Writing output file', outputName)
    writeFileSync(outputName, f.content, { encoding: 'binary' })
  })
}

function preconditions(options: CliOptions & { _: any }) {
  if (options.help) {
    printHelp()
    process.exit(0)
  }
  if (!options.command || !options.input) {
    fail('--command and --input are both mandatory. Aborting.')
  }
}

function fail(msg: string, help = false) {
  console.error(msg)
  help && printHelp()
  process.exit(1)
}

function printHelp() {
  console.log(`
Usage: 

magica --command "identify n.png" --input test/assets/n.png 
magica --input test/assets/n.png --command "convert n.png -scale 44% dest/tmp.gif"

Options:

  --input: string[]: Input file paths. It can also be glob patterns. For passing more than one use --input multiple times. It's important that the base name of these paths match the file names given in the command.
  --command: string | string[]: An ImageMagick command, for example: "convert foo.png -scale 50% bar.gif".
  --localNodeFsRoot?: string:
  --emscriptenNodeFsRoot?: string:
  --help?: boolean: (command line only)
  --debug?: boolean:

`)
}
