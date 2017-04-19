var nodeExternals = require("webpack-node-externals");
var path = require("path");

module.exports = [
    {
        target: "node",
        node: {
            __dirname: true,
            __filename: true
        },
        entry: "./src/server/app.js",
        output: {
            path: path.join(__dirname, "dist"),
            filename: "app.js"
        },
          devtool: 'source-map',
        externals: [nodeExternals()],
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ["babel-loader"]
                }
            ]
        }
    },
    {
        target: "web",
        entry: "./src/client/App.js",
        output: {
            path: path.join(__dirname, "public", "javascripts"),
            filename: "bundle.js"
        },
            devtool: 'source-map',
        module: {
            loaders: [
                {
                    test: /\.js$/,
                    loaders: ["babel-loader"]
                }
            ]
        }
    }
]
