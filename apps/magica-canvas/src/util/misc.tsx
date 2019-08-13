import { arrayToObject } from 'misc-utils-of-mine-generic'
import { Command } from '../app/commands'
import { run } from '../../../../dist/src';

export function fieldArrayToObject(command: Command) {
  return arrayToObject(command.fields.map(f => f.id), id => command.fields.find(f => f.id === id)!) as any
}

export function memoryReport() {
  var m = (performance as any).memory
  if (!m) {
    return {
      usedMb: 'N/A', totalMb: 'N/A', percent: 'N/A'
    }
  }
  return {
    usedMb: (m.usedJSHeapSize / 1048576).toFixed(2) + 'Mb',
    percent: (100 * m.usedJSHeapSize / m.totalJSHeapSize).toFixed(1) + '%',
  }
}

export async function getImageMagickVersion() {
  const r = await run({script: 'convert -version'})
  return r.stdout.join('\n')
}

export function time(n:number ): string {
  return n.toFixed(2)+' ms';
}
