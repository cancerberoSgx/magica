// import { pushStdout } from '../../imageMagick/magickLoaded'
// import { TemplateHelper } from './template'

// interface Options {
// }

// function printArguments(...args: any[]): string {
//   return args.map(a=>JSON.stringify(a)).join(' ') + '\n'
// }

// export class ConsoleLogHelper implements TemplateHelper<Options, Promise<void>> {
//   public name = 'log'
//   public async fnCompileTime(...args: any[]) {
//     const s = printArguments(args)
//     console.log('fnCompileTime', args, s);
//     pushStdout(s)
//   }
//   public async fnRunTime(...args: any[]) {
//     const s = printArguments(args)
//     console.log('fnRunTime', args, s);
//     pushStdout(s)
//   }
// }
