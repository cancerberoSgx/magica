import { randomIntBetween, arrayToObject } from 'misc-utils-of-mine-generic'
import { State } from './state'

interface Context {
  inputFile: string
  outputFile: string
  fieldMap: { [n: string]: Field }
  x: number
  y: number
}

export interface Command {
  name: string
  command: (state: State & Context) => string
  fields: Field[]
}

export interface Field {
  id: string
  value: string
  type?: 'string' | 'number' | 'color'
}

export function buildCommand(pos: { x: number, y: number }, c: Command, state: State) {
  const context = {
    ...state,
    ...pos,
    fieldMap: arrayToObject(state.fields.map(f => f.id), f => state.fields.find(f2 => f2.id === f)) as {
      [s: string]: Field;
    },
    inputFile: 'output.miff',
    outputFile: `output.${state.renderedFormat}`
  }
  const command = c.command(context);
  return command;
}

export const commands: Command[] = [

  {
    name: 'barrel',
    command: state => `convert ${state.inputFile} -matte -virtual-pixel ${state.virtualPixel} -distort Barrel '${[state.fieldMap['a'].value, state.fieldMap['b'].value, state.fieldMap['c'].value, state.fieldMap['d'].value, state.x, state.y].join(' ')}' ${state.outputFile}`,
    fields: [{ id: 'a', value: '-0.4', type: 'number' }, { id: 'b', value: '0.7', type: 'number' }, { id: 'c', value: '0.2', type: 'number' }, { id: 'd', value: '0.5', type: 'number' }]
  },
  {
    name: 'implode',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -implode  ${state.fieldMap['implode'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'implode', value: '2', type: 'number' }, { id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'explode',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -implode  ${state.fieldMap['implode'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'implode', value: '-2', type: 'number' }, { id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'swirl',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -swirl  ${state.fieldMap['swirl'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'swirl', value: '244', type: 'number' }, { id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'scale',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} +repage  -distort ScaleRotateTranslate '${state.fieldMap['scale'].value}  0'  -geometry +${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} ) -composite  ${state.outputFile}`,
    fields: [{ id: 'scale', value: '3', type: 'number' }, { id: 'size', value: '80', type: 'number' }]
  },
  {
    name: 'wave',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -background none -wave  ${state.fieldMap['wave'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'wave', value: '10x64' }, { id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'blur',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)}  -blur  ${state.fieldMap['blur'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'blur', value: '4x2' }, { id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'spread',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -spread  ${state.fieldMap['spread'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'spread', value: '5', type: 'number' }, { id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'color histogram',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -size 1x2  gradient:blue-red -fx  'v.p{0,1}+(v.p{0,0}-v.p{0,1})*u^${state.fieldMap['factor'].value}' ) -flatten ${state.outputFile}`,
    fields: [{ id: 'factor', value: '1.3', type: 'number' }, { id: 'size', value: '50', type: 'number' }]
  },
  {
    name: 'sepia',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)}   -color-matrix ' 0.393 0.769 0.189    0.349 0.686 0.168    0.272 0.534 0.131  ' ) -flatten ${state.outputFile}`,
    fields: [{ id: 'size', value: '180', type: 'number' }]
  },
  {
    name: 'vignette',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -background ${state.fieldMap['background'].value} -vignette ${state.fieldMap['vignette'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'vignette', value: '0x13' }, { id: 'size', value: '180', type: 'number' }, { id: 'background', value: '#000000', type: 'color' }]
  },
  {
    name: 'charcoal',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -alpha remove -charcoal ${state.fieldMap['charcoal'].value} -fill ${state.fieldMap['fill'].value}  -tint 80% ) -flatten ${state.outputFile}`,
    fields: [{ id: 'charcoal', value: '4', type: 'number' }, { id: 'fill', value: '#ff0000', type: 'color' }, { id: 'size', value: '130', type: 'number' }]
  },
  {
    name: 'emboss',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)}   -emboss ${state.fieldMap['emboss'].value}   ) -flatten ${state.outputFile}`,
    fields: [{ id: 'emboss', value: '0x1.1 ' }, { id: 'size', value: '160' }]
  },
  {
    name: 'paint',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -paint ${state.fieldMap['paint'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'paint', value: '4' }, { id: 'size', value: '120' }]
  },

  {
    name: 'paint morphology',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)} -morphology OpenI Disk:${state.fieldMap['disk'].value} ) -flatten ${state.outputFile}`,
    fields: [{ id: 'disk', value: '3.5' }, { id: 'size', value: '120' }]
  },

  {
    name: 'sketch',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)}   -sketch ${state.fieldMap['sketch'].value}  ) -flatten ${state.outputFile}`,
    fields: [{ id: 'sketch', value: '16x32+33' }, { id: 'size', value: '80' }]
  },
  {
    name: 'grid',
    command: state => `convert  -size ${state.fieldMap['point'].value}x${state.fieldMap['point'].value}  xc: -draw 'circle ${Math.round(parseInt(state.fieldMap['point'].value) / 2)},${Math.round(parseInt(state.fieldMap['point'].value) / 2)} 1,${Math.round(parseInt(state.fieldMap['point'].value) / 2)}'     -write mpr:block +delete   ${state.inputFile} -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)}  tile:mpr:block  +swap -compose screen -composite   -flatten ${state.outputFile}`,
    fields: [{ id: 'point', value: '10' }, { id: 'size', value: '100' }]
  },
  {
    name: 'modulate',
    command: state => `convert ${state.inputFile} ( +clone -crop ${state.fieldMap['size'].value}x${state.fieldMap['size'].value}+${state.x - Math.round(parseInt(state.fieldMap['size'].value) / 2)}+${state.y - Math.round(parseInt(state.fieldMap['size'].value) / 2)}   -modulate ${state.fieldMap['brightness'].value},${state.fieldMap['saturation'].value},100 ) -flatten  ${state.outputFile}`,
    fields: [
      { id: 'brightness', value: '160' },
      { id: 'saturation', value: '40' },
      // { id: 'lightness', value: '70' },
      { id: 'size', value: '170' }
    ],
  },
  {
    name: 'rotate',
    command: state => `convert  ${state.inputFile} -rotate ${state.x + state.y} ${state.outputFile}`,
    fields: []
  },
  {
    name: 'distort perspective',
    command: state => {
      function R(n: number) {
        return randomIntBetween(-n, n)
      }
      function N(n: number, m: number) {
        return n ? randomIntBetween(n - m, n + m) : 0
      }
      const D = 3, M = N(100, 5)
      return `convert ${state.inputFile} -matte -virtual-pixel ${state.virtualPixel} -distort perspective '${N(10, 5)},${N(10, 5)} ${Math.round(state.x / (D + R(D / 4)))},${Math.round(state.y / (D + R(D / 4)))}      0,${M} ${Math.round(state.x / (D + R(D / 4)))},${state.y + R(D)}      ${M},${M} ${state.x + R(D)},${state.y + R(D)}         ${M},0 ${state.x + R(D)},${Math.round(state.y / (D + R(D / 4)))}' ${state.outputFile}`
    },
    fields: []
  },
]
