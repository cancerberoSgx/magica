import { rm } from 'shelljs';
import { buildFolder } from './config';
import { Context, renderTemplates } from './template';

interface Options extends Context{

}

function main(o: Options){
  clean();
  renderTemplates(o)
  
}



function clean(){
  rm('-rf', buildFolder)
}


main({})