//webpack 的配置文件

// 所有的构建平台都是基于nodejs平台运行的，模块化默认采用 commonjs
const { resolve } = require("path");
module.exports = {
  // 入口起点
  entry: "./src/index.js",
  // 输出
  output: {
    //输出文件名
    filename: "main.[hash:5].js",
    //__dirname 是 nodejs的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, "build"),
  },
  // loader 的配置
  module: {
    rules: [
      // 详细的loader配置
      // 不同文件必须配置不同的loader处理
      {
        // 匹配哪些文件
        test: /\.css$/,
        // 使用哪些 loader 进行处理
        use: [
          // use 数组中loader执行的顺序是从右往左，从下到上【先css，后style】
          // 创建 style 标签，将js中的样式资源插入进行，添加到 head 生效
          "style-loader",
          // 将 css 文件变成 commonjs 模块加载js中，里面的内容是样式字符串
          "css-loader",
        ],
      },
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
    ],
  },
  plugins: [],
  // 模式
  mode: "development", // 开发模式
  // 生产模式 production ， 区别在于js会被压缩
};
