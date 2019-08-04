export default {
  files: [
    "test/*Test.ts*"
  ],
  extensions: ['ts'],
  compileEnhancements: false,
  serial: true,
  concurrency: 1,
  // failFast:true,
  require: [
    "ts-node/register"
  ]
};