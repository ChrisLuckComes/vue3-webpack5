const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const { DefinePlugin } = require('webpack')
const copyWebpackPlugin = require('copy-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const dotenv = require('dotenv')
const ESlintPlugin = require('eslint-webpack-plugin')

const mode = process.env.mode

//如下操作执行对应环境的.env文件,放到process.env上
dotenv.config({ path: `.env.${mode}` })

let env = {}

for (const key in process.env) {
  if (key == 'NODE_ENV' || key == 'BASE_URL' || key.startsWith('VUE_APP_')) {
    env[key] = JSON.stringify(process.env[key])
  }
}

const prodMode = env['NODE_ENV'] == 'production' //生产环境

module.exports = {
  entry: {
    path: path.resolve(__dirname, '../src/main.ts'),
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: (file) => /node_modules/.test(file) && !/\.vue\.js/.test(file),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: [
          !prodMode ? 'vue-style-loader' : miniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              esModule: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        type: 'asset/resource', // webpack5自带资源模块，不需要额外的loader
        generator: {
          filename: 'images/[hash][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 当生成的图片小于10kb，则不会生成图片，会转成base64
          },
        },
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/,
        type: 'asset/resource', // 音视频文件
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          },
        },
      },
      {
        test: /\.(woff2?|eot|tff|woff|ttf)$/, //字体文件
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:6][ext]',
        },
        parser: {
          dataUrlCondition: {
            maxSize: 8 * 1024,
          },
        },
      },
    ],
  },
  cache: {
    type: 'filesystem',
    buildDependencies: {
      config: [__filename], //当构建依赖的config文件变化时，缓存失效
    },
  },
  output: {
    filename: 'js/[name].[chunkhash].js',
    path: path.resolve(__dirname, '../dist'),
    clean: true,
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../public/index.html'),
      filename: 'index.html',
      title: 'webpack5+vue3',
      minify: {
        html5: true, // 根据HTML5规范解析输入
        collapseWhitespace: true, // 折叠空白区域
        preserveLineBreaks: false,
        minifyCSS: true, // 压缩文内css
        minifyJS: true, // 压缩文内js
        removeComments: false, // 移除注释
      },
    }),
    new DefinePlugin({
      __VUE_PROD_DEVTOOLS__: false, //生产环境开发者工具，先禁用
      __VUE_OPTIONS_API__: false, // 不使用用options API
      'process.env': {
        ...env,
      },
    }),
    new copyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: './',
          globOptions: {
            dot: true,
            gitignore: true,
            ignore: ['**/index.html*'],
          },
        },
      ],
    }),
    new miniCssExtractPlugin({
      filename: './css/[name].[contenthash].css',
      chunkFilename: './css/[id].[contenthash].css',
    }),
    new ESlintPlugin({
      context: path.join(__dirname, '../src'),
      extensions: ['js', 'jsx', 'ts', 'tsx', 'vue'],
      emitError: true,
      emitWarning: true,
      failOnWarning: false,
      failOnError: true,
      overrideConfigFile: './.eslintrc.js',
      // Toggle autofix
      fix: false,
      cache: false,
    }),
  ],
}
