// index.js

// webpack 入口文件

// 运行指令
// 开发环境指令： webpack ./src/index.js -o ./build/built.js --mode=development
//  webpack 会以 ./src/index.js 为入口文件开始打包，打包文件输出到 ./build/built.js，整体打包环境是开发环境

// 生产环境指令： webpack ./src/index.js -o ./build/built.js --mode=production

//结论：
// 1、webpack 能处理 js 和 json资源， 不能处理css、img等其它资源
// 2、生产环境比开发环境多一个js压缩代码

import "./index.css";

import data from "./data.json";
console.log(data);

function add(x, y) {
  return x + y;
}

console.log(add(1, 2));
