import { cli } from './cli'

const options = require('minimist')(process.argv.slice(2))
cli(options)
