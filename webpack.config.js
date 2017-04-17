var nodeExternals = require("webpack-node-externals");
var path = require("path");

module.exports = [
    {
        target: "node",
        node: {
            __dirname: true,
            __filename: true
        },
        entry: "./src/app.js",
        output: {
            path: path.join(__dirname, "dist"),
            filename: "app.js"
        },
        externals: [nodeExternals()],
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