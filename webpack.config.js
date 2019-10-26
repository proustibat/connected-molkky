const path = require('path');
const Visualizer = require('webpack-visualizer-plugin');
const { BS_PORT } = require('./src/config');

module.exports = {
  entry: {
    'babel-polyfill': ['@babel/polyfill'],
    index: ['./src/front/index.js'],
  },
  output: {
    path: path.join(__dirname, 'public', 'javascript'),
    filename: '[name].min.js',
  },
  resolve: {
    extensions: ['.js'],
    alias: {
      '@pages': path.resolve(__dirname, 'src/front/pages/'),
      '@components': path.resolve(__dirname, 'src/front/components/'),
      '@utils': path.resolve(__dirname, 'src/front/utils/'),
      '@contexts': path.resolve(__dirname, 'src/front/contexts/'),
      '@fixtures': path.resolve(__dirname, 'src/fixtures/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@root': path.resolve(__dirname, 'src/'),
    },
  },
  devtool: 'source-map',
  devServer: {
    proxy: {
      '/': {
        target: `http://localhost:${BS_PORT}`,
        secure: false,
      },
    },
  },
  module: {
    // noParse: /(node_modules|\.(test.js|spec.js|test.js.snap)$)/,
    rules: [
      {
        test: /\.(js)?$/,
        // exclude: /(node_modules|\.(test.js|spec.js|test.js.snap)$)/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new Visualizer(),
  ],
};
