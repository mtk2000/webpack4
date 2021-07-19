const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  plugins: [
    // 作用：默认会创建一个空的html文件，自动引入打包输出的所有资源（js、css）
    // 需求：需要有结构的html文件，只要加 template 就可以
    new HtmlWebpackPlugin({
      // 复制 "./src/index.html" 文件，并自动引入打包输出的所有资源（js、css）
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
