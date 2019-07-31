import { main } from './main';

const options = require('minimist')(process.argv.slice(2))
main(options)

