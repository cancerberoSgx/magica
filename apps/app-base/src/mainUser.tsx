import 'babel-polyfill'
import { AppOptions } from './app/state'
import { main } from './main'


var app: AppOptions = {
  projectAddress: 'https://github.com/cancerberoSgx'
}
main(app)
