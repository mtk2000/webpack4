const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    filename: "built.js",
    path: resolve(__dirname, "build"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      // 打包其它资源(除了html、js、css以外的其它资源)
      {
        //排除html、js、css资源
        exclude: /\.(html|js|css)$/,
        loader: "file-loader",
        options: {
          name: "[hash:10].[ext]",
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",

  // devServer 开发服务器，用来自动化。
  // 自动编译、自动打开浏览器、自动刷新浏览器
  // 特点：只会在内存中编译打包，不会有任何输出
  // 启动 devServer 指令：npx webpack-dev-server
  devServer: {
    contentBase: resolve(__dirname, "build"),
    //启用gzip压缩
    compress: true,
    //端口号
    port: 3000,
    //自动打开浏览器
    open: true,
  },
};
