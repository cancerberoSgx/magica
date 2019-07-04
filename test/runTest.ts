import test from 'ava'
import { run } from '../src/main/run';

test('should run a single command with comments, spaces and command break line', async t => {
    const result = await run({
      script: `
      # this is a comment before
      identify \\
        wizard:
      # this is a comment after
      `
    })
    t.deepEqual(result.stdout, ['wizard:=>WIZARD GIF 480x640 480x640+0+0 8-bit sRGB 256c 99674B 0.000u 0:00.000'])
})
