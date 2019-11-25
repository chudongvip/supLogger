const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/logger.ts',
  output: {
    path: path.resolve(__dirname, './release'),
    filename: 'SupLogger.js',
    library: "SupLogger",
    libraryTarget: "umd",
    libraryExport: "default"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"]
  },
  module: {
    rules: [
      { test: /\.ts?$/, use: ["ts-loader"], exclude: /node_modules/ }
    ]
  }
};