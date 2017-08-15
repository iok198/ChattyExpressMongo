var webpack = require("webpack")
var path = require("path")

var plugins = []

if (process.env.NODE_ENV == "production") {
  plugins.push(new webpack.DefinePlugin({
    "process.env": {
      NODE_ENV: JSON.stringify("production")
    }
  }))

  plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = {
  target: "web",
  entry: path.join(__dirname, "..", "src", "client", "browser.js"),
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
