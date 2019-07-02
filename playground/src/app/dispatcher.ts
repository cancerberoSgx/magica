import { Options, File } from 'magica';
import { callMain } from './workerAccess';
import { getStore } from './store';
import { toDataUrl } from '../ui/common/uiUtil';

export async  function main(o:Partial<Options>){
  const result = await callMain(o)
  const outputDataUrl = toDataUrl(result.outputFiles[0])
  getStore().setState({result})
}
