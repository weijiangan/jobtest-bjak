const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: "development",
  devtool: "cheap-module-source-map",
  entry: ["webpack-hot-middleware/client", "./src/index.js"],
  resolve: {
    extensions: [".mjs", ".js", ".jsx"],
    alias: {
      "react-dom": "@hot-loader/react-dom"
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "..", "dist"),
    publicPath: "/"
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            exclude: /node_modules|packages/,
            test: /\.jsx?$/,
            loader: "babel-loader",
            options: {
              compact: true,
              cacheDirectory: true,
              babelrc: false,
              plugins: [
                "@babel/plugin-syntax-dynamic-import",
                ["@babel/plugin-proposal-class-properties", { loose: false }]
              ],
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: [
                        "last 2 Chrome versions",
                        "not Chrome < 60",
                        "last 2 Safari versions",
                        "not Safari < 10.1"
                      ]
                    },
                    modules: false
                  }
                ],
                "@babel/preset-react"
              ]
            }
          },
          {
            test: /\.css$/,
            include: [path.resolve(__dirname, "..", "src")],
            use: [
              { loader: "style-loader" },
              {
                loader: "css-loader",
                options: { modules: true, importLoaders: 1 }
              },
              {
                loader: "postcss-loader",
                options: {
                  ident: "postcss",
                  plugins: [require("autoprefixer")]
                }
              }
            ]
          },
          {
            test: /\.css$/,
            exclude: [path.resolve(__dirname, "..", "src")],
            use: ["style-loader", "css-loader"]
          },
          {
            loader: "file-loader",
            // Exclude `js` files to keep "css" loader working as it injects
            // it's runtime that would otherwise processed through "file" loader.
            // Also exclude `html` and `json` extensions so they get processed
            // by webpacks internal loaders.
            exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
            options: {
              name: "static/media/[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("development"),
      "process.env.BABEL_ENV": JSON.stringify("development")
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ],
  performance: {
    hints: false
  }
};
