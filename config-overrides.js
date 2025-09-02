const webpack = require("webpack");
const path = require("path");
module.exports = function override(config, env) {
  config.resolve = {
    ...config.resolve,
   
  };
  config.resolve.fallback = {
    url: require.resolve("url"),
    assert: require.resolve("assert"),
    buffer: require.resolve("buffer"),
    crypto: require.resolve("crypto-browserify"),
    stream: require.resolve("stream-browserify"),
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    os: require.resolve("os-browserify"),
    "process/browser": require.resolve("process/browser"),
    zlib: require.resolve("browserify-zlib"),
  };
  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser",
      Buffer: ["buffer", "Buffer"],
    })
  );

  return config;
};
