const options = require('./webpack.config')
const compiler = require('./lib/compiler')
new compiler(options).run()