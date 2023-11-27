const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const filePath = {
  src: {
    style: './assets/scss/style.scss',
    icons: './assets/icons/icons.js'
  },
  dist: './public/'
};

module.exports = {
  entry: [
    filePath.src.style,
    filePath.src.icons
  ],

  output: {
    path: path.resolve(__dirname, filePath.dist)
  },

  module: {
    rules: [
      {
        test: /\.(c|sa|sc)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: './icons/sprite.svg',
              symbolId: (filePath) =>
                'icon-' + path.basename(filePath).split('.')[0]
            }
          },
          {
            loader: 'svgo-loader'
          }
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: './css/style.css'
    }),
    new SpriteLoaderPlugin({
      plainSprite: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: './assets/images', to: 'images', noErrorOnMissing: true },
        { from: './assets/fonts', to: 'fonts', noErrorOnMissing: true }
      ]
    })
  ],

  mode: 'production'
};
