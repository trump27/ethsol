module.exports = {
  entry: './src/index.js',
  output: {
    path: './build/',
    publicPath: 'build/',
    filename: 'build.js'
  },
  devtool: "#source-map",
  module: {
    preLoaders: [
        { test: /\.json$/, loader: 'json'},
    ],
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel!eslint', exclude: [/node_modules/, /assets/] }
    ]
  },
  vue: {
    loaders: {
      js: 'babel!eslint'
    }
  }
};