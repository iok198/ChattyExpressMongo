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
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: ["es2015", "react"]
                        }
                    }
                ]
            }
        ]
    }
}