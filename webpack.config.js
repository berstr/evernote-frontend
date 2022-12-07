const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
  entry: path.resolve(__dirname, './src/index.tsx'),
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: ['babel-loader'],
      },
      {
        // how to process module based CSS or SASS files
        test: /\.(scss|css)$/,
        use: [
          // to inject the result into the DOM as a style block
          { loader: "style-loader" },

          // to generate a .d.ts module next to the .scss file (also requires a declaration.d.ts with 
          // "declare modules '*.scss';" in it to tell TypeScript that "import styles from './styles.scss';" 
          // means to load the module "./styles.scss.d.td")
          { loader: "css-modules-typescript-loader" },

          {
            // to convert the resulting CSS to Javascript to be bundled.
            // modules:true to rename CSS classes in output to cryptic identifiers, except if wrapped in a :global(...) pseudo class
            loader: "css-loader",
            options: { importLoaders: 1, modules: true },
          },

          // to convert SASS to CSS   
          { loader: "sass-loader" },
        ],
        include: /\.module\.(scss|css)$/,
      },
      // how to process normal CSS or SASS files
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", 'sass-loader'],
        exclude: /\.module\.(scss|css)$/,
      },
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      title: 'Evernote',
      template: path.resolve(__dirname, './src/index.html'),
    })
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
  },
};
