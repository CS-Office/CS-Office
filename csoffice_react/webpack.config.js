const path = require('path');

const BUILD_DIR = path.resolve(__dirname, './build');
const APP_DIR = path.resolve(__dirname, './src/client');

const config = {
  entry: {
    main: `${APP_DIR}/index.jsx`,
  },
  output: {
    filename: 'bundle.js',
    path: BUILD_DIR,
  },
  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              presets: ['react', 'es2015', 'stage-3'], // Transpiles JSX and ES6
            },
          },
        ],
      },
      {
        test: /.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.(png|jpg|jpeg|gif|svg)$/, loader: 'url-loader?limit=100000' },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};

module.exports = config;
