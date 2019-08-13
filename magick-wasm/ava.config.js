export default {
  files: [
    "./test/*Test.ts*"
  ],
  extensions: ['ts'],
  compileEnhancements: false,
  serial: true,
  concurrency: 1,
  require: [
    "ts-node/register"
  ]
};