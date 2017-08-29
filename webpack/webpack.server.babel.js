import webpack from "webpack"
import nodeExternals from "webpack-node-externals"
import path from "path"

import config from "../config"

let plugins = []

if (config.nodeEnv == "production") {
  plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }))

  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  target: "node",
  node: {
    __dirname: true,
    __filename: true
  },
  entry: path.join(__dirname, "..", "src", "server", "app.js"),
  output: {
    path: path.join(__dirname, "..", "dist"),
    filename: "app.js"
  },
  devtool: 'source-map',

  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015"]
            }
          }
        ]
      }
    ]
  },
  plugins
}
