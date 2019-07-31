import Queue from 'p-queue'
import { ls } from 'shelljs';
import { execSync } from 'child_process';

let  queue:Queue|undefined
function getQueue(){
  if(!queue){
    queue = new Queue({autoStart: true, concurrency: 1, interval: 100})
  }
  return queue
}


async function main(){
  ls('test/**/*Test.ts*').forEach(t=>{
    getQueue().add(()=>{
      try {
        console.log('Starting', t);
        var o = execSync(`npx ava --serial ${t}`)
        console.log('Finish OK', t, o.toString());

      } catch (error) {
        console.error('ERROR in test', t, error.stdout.toString(), error.stderr.toString());
        process.exit(1)
      }
    })
  })
}


main()