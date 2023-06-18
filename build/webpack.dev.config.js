// @ts-nocheck
const { merge } = require('webpack-merge')
const common = require('./webpack.base.config')
// const SpeedMeasurePlugin = require("speed-measure-webpack-plugin")
// const smp = new SpeedMeasurePlugin()

module.exports = merge(common, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    hot: true,
    open: true,
    port: 8080,
    host: 'localhost',
    proxy: {},
  },
})
