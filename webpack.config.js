const nodeExternals = require("webpack-node-externals");

module.exports = {
  // ... other webpack config options
  externals: [nodeExternals()],
};
