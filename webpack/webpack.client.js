var path = require("path")

module.exports = {
    target: "web",
    entry: path.join(__dirname, "..", "src", "client", "App.js"),
    output: {
        path: path.join(__dirname, "..", "public", "javascripts", "react"),
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