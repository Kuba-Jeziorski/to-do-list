const path = require("path");

module.exports = {
  entry: ["./src/app.ts", "./src/app.scss"],
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "app.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        use: [],
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /.scss$/,
        exclude: /node_modules/,
        type: "asset/resource",
        generator: {
          filename: "app.css",
        },
        use: ["sass-loader"],
      },
    ],
  },
};
