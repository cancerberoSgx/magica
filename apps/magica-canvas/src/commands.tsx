import { randomIntBetween } from 'misc-utils-of-mine-generic'
import { State, Field } from './state'
export const commands: Command[] = [
  {
    name: 'barrel',
    command: state => `convert ${state.inputFile.name} -matte -virtual-pixel transparent -distort Barrel '${[state.fields['a'].value, state.fields['b'].value, state.fields['c'].value, state.fields['d'].value, state.x, state.y].join(' ')}' output.rgba`,
    fields: [{id: 'a', value: '0.2'},{id: 'b', value: '0.7'},{id: 'c', value: '0.2'},{id: 'd', value: '0.5'}]
  },
  {
    name: 'rotate',
    command: state => `convert  ${state.inputFile.name} -rotate ${randomIntBetween(0, 360)} output.rgba`,
    fields: []
  },
  {
    name: 'distort perspective',
    command: state => {
      const D = 9, dx=6, dy=3 , M=N(100, 5)
      // return `convert  ${state.inputFile.name} -matte -virtual-pixel transparent -distort Perspective '${state.x-50+R(D)},${state.y-50+R(D)} ${state.x-50+R(D)+dx},${state.y-50+R(D)+dy}      ${state.x-50+R(D)},${state.y+50+R(D)} ${state.x-50+R(D)+dx},${state.y+50+R(D)+dy}      ${state.x+50+R(D)},${state.y+50+R(D)} ${state.x+50+R(D)+dx},${state.y+50+R(D)+dy}      ${state.x+50+R(D)},${state.y-50+R(D)} ${state.x+50+R(D)+dx},${state.y-50+R(D)+dy}' output.rgba`
      // return `convert ${state.inputFile.name} -matte -virtual-pixel transparent -distort Perspective '0,0 ${Math.round(state.x/D)},${Math.round(state.y/D)}      0,100 ${Math.round(state.x/D)},${state.y}      100,100 ${state.x},${state.y}         100,0 ${state.x},${Math.round(state.y/D)}' output.rgba`
      return `convert ${state.inputFile.name} -matte -virtual-pixel transparent -distort perspective '${N(10, 5)},${N(10, 5)} ${Math.round(state.x/(D+R(D/4)))},${Math.round(state.y/(D+R(D/4)))}      0,${M} ${Math.round(state.x/(D+R(D/4)))},${state.y + R(D)}      ${M},${M} ${state.x + R(D)},${state.y + R(D)}         ${M},0 ${state.x + R(D)},${Math.round(state.y/(D+R(D/4)))}' output.rgba`
      
    },
    fields: []
  },
    {
      name: 'implode area',
      command: state =>    { 
      return `convert ${state.inputFile.name}  -region ${state.fields['size'].value}x${state.fields['size'].value}+${state.x-Math.round(parseInt(state.fields['size'].value)/2)}+${state.y-Math.round(parseInt(state.fields['size'].value)/2)}   -implode  ${state.fields['implode'].value}  output.rgba` 
      },
      fields: [{id: 'implode', value: '-2'}, {id: 'size', value: '120'}]
    },
    {
      name: 'scale region',
      command: state => `convert ${state.inputFile.name} ( +clone -crop ${state.fields['size'].value}x${state.fields['size'].value}+${state.x-Math.round(parseInt(state.fields['size'].value)/2)}+${state.y-Math.round(parseInt(state.fields['size'].value)/2)} +repage  -distort ScaleRotateTranslate '${state.fields['scale'].value}  0'  -geometry +${state.x-Math.round(parseInt(state.fields['size'].value)/2)}+${state.y-Math.round(parseInt(state.fields['size'].value)/2)} ) -composite  output.rgba` 
      ,
      fields: [ {id: 'scale', value: '3'}, {id: 'size', value: '80'}]
    },


]
const rim_={} as any
function RIM(a:number, b: number) {
  var k = a+'-'+b
  if(!rim_[k]){
    rim_[k]= randomIntBetween(a, b)
  }
  return rim_[k]
}
function R(n:number) {
 return RIM(-n, n)
}
function N(n:number, m:number) {
  return n ? randomIntBetween(n-m, n+m):0
}
export interface Command {
  name: string
  command: (state: State) => string
  fields: Field[]
}
