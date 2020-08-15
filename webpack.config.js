const path = require('path');
const APP_DIR = path.resolve(__dirname, 'src');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  entry: `./src/index.js`,
  output: { filename: 'dist/bundle.js' },
  devServer: {
    hot: true,
    // enable HMR on the server
    host: '0.0.0.0',
    contentBase: path.resolve(__dirname, 'public'), // [path.resolve(__dirname, 'public'), 'node_modules'],
    // match the output path
    // before(app) {
    //   app.use('/public', express.static('/public/'));
    //   app.get('/some/path', (req, res) => {
    //     res.json({ custom: 'response' });
    //   });
    // },
    publicPath: '/',
    // match the output `publicPath`
    historyApiFallback: true,

    proxy: {
      '/api': {
        target: 'http://localhost:3000/', secure: false, pathRewrite: { '^/api': '' }
      },
      '/v1': {
        target: 'https://localhost:8443/', secure: false,
        // pathRewrite: { '^/api': ''  }
      }
    }
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: APP_DIR,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'],
            // plugins: ['react-hot-loader/babel'],
          },
        }],
      },
      {
        test: /\.css$/i,
        use: [
          'style-loader', 'css-loader'
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
  }
}