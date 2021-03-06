import webpack from "webpack"
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

export default {
  target: "web",
  entry: ["babel-regenerator-runtime", path.join(__dirname, "..", "src", "client", "browser.js")],
  output: {
    path: path.join(__dirname, "..", "public", "javascripts", "react"),
    filename: "bundle.js"
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["es2015", "react", "stage-1"],
              plugins: ["transform-decorators-legacy", "transform-class-properties"]
            }
          }
        ]
      }
    ]
  },
  plugins
}
