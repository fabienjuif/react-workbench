const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.config.js')

const WEBPACK_PORT = 8080

const start = (paths) => {
  // patch config
  config.entry.app.unshift(`webpack-dev-server/client?http://localhost:${WEBPACK_PORT}/`)
  config.resolve.modules = config.resolve.modules.concat(paths)

  const compiler = webpack(config)
  const server = new WebpackDevServer(compiler)
  server.listen(WEBPACK_PORT)
}

module.exports = {
  start,
}