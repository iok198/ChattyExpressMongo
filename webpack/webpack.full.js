var clientBuild = require("./webpack.client")
var serverBuild = require("./webpack.server")

module.exports = [
    clientBuild,
    serverBuild
]