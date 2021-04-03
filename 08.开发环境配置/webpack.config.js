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
        use: [
          "style-loader",
          "css-loader",
          // 将less文件编译成css文件
          // 需要下载 less-loader 和 less
          "less-loader",
        ],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
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
      // 打包其它资源
      {
        //排除资源
        exclude: /\.(html|js|css|less|jpg|jpeg|png|gif)$/,
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
