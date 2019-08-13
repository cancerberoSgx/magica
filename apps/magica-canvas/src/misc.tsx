import { arrayToObject } from 'misc-utils-of-mine-generic'
import { Command } from './app/commands'

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
