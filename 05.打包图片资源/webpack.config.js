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
        test: /\.less$/,
        // 要使用多个loader处理用use数组
        use: ["style-loader", "css-loader", "less-loader"],
      },
      // 问题：处理不了 html 中 img 的图片
      // 处理图片资源
      {
        test: /\.(jpg|jpeg|png|gif)$/,
        //使用一个用loader
        //下载url-loader file-loader
        loader: "url-loader",
        options: {
          //图片大小 小于 8kb，就会被base64处理
          //优点：减少请求数量（减轻服务器压力）
          //缺点：图片体积会更大（文件请求速度更慢）
          limit: 8 * 1024,
          //问题：因为 url-loader 默认使用 es6 模块化解析，而html-loader引入图片是采用commonjs
          //所以解析会出问题：[object Module]
          //解决方法：关闭es6模块化解析，采用commonjs解析
          esModule: false,
          //给图片进行重命名
          //[hash:10] 取图片hash值的前10位
          //[ext] 读取原来的拓展名
          name: "[hash:10].[ext]",
        },
      },
      {
        test: /\.html$/,
        // 处理 html 中 img 图片，负责引入img，从而能被url-loader进行处理
        loader: "html-loader",
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
};
