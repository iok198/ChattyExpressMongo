var nodeExternals = require("webpack-node-externals")
var path = require("path")

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
    }
}