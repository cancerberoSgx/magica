module.exports =  {
  "extends": "@istanbuljs/nyc-config-typescript",
  // "all": true,
  "exclude": ['test-browser-outdir',"dist", "src/imageMagick/compiled" ],
    "reporter": [
      "html", 'lcov', 'text-summary'
    ],
  // "check-coverage": true
}