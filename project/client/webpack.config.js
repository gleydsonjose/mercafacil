
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const ENVIRONMENT = process.env.NODE_ENV

const plugins = [
  new VueLoaderPlugin(),
  new HtmlWebpackPlugin({
    hash: true,
    template: './template.html',
    title: 'Mercafacil Teste'
  }),
]

if (ENVIRONMENT === 'production') {
  plugins.push(new CleanWebpackPlugin())
}

module.exports = {
  mode: 'development',
  entry: {
    main: './main.js'
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[id].chunk.js'
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    port: 3000,
    compress: true,
    hot: true,
    open: true
  },
  devtool: 'eval-source-map'
}