module.exports = {
  "extends": "@istanbuljs/nyc-config-typescript",
  "exclude": ['test-browser-outdir', "dist", "src/imageMagick/compiled", "test"],
  "reporter": [
    "html", 'lcov', 'text-summary'
  ],
}