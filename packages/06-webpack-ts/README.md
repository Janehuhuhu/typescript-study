## TypeScript打包

### webpack整合

通常情况下，实际开发中我们都需要使用构建工具对代码进行打包；

 `TS` 同样也可以结合构建工具一起使用，下边以 `webpack` 为例介绍一下如何结合构建工具使用 `TS`

步骤如下：

#### 初始化项目

进入项目根目录，执行命令 ` npm init -y`，创建 `package.json` 文件

#### 下载构建工具

命令如下：

`npm i -D webpack webpack-cli webpack-dev-server typescript ts-loader clean-webpack-plugin`

共安装了7个包:

  - `webpack`：构建工具 `webpack`
  - `webpack-cli`： `webpack` 的命令行工具
  - `webpack-dev-server`： `webpack` 的开发服务器
  - `typescript`： `ts` 编译器
  - `ts-loader`： `ts` 加载器，用于在 `webpack` 中编译 `ts` 文件
  - `html-webpack-plugin`：`webpack` 中 `html` 插件，用来自动创建 `html` 文件
  - `clean-webpack-plugin`：`webpack`中的清除插件，每次构建都会先清除目录

<br>

#### 配置 webpack

根目录下创建 `webpack` 的配置文件`webpack.config.js`：

 ```javascript
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
    optimization:{
        minimize: false // 关闭代码压缩，可选
    },
    entry: "./src/index.ts",
    devtool: "inline-source-map",
    devServer: {
        contentBase: './dist'
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false // 关闭webpack的箭头函数，可选
        }
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: {
                    loader: "ts-loader"     
                },
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title:'TS测试'
        }),
    ]
}
 ```

 实际使用时 `ts-loader` 一般主要用于转译，而 `​fork-ts-type-build-webpack-plugin` 主要负责在 `webpack` 通过独立进程进行类型校验。
 
 因为 `ts-loader` 本身进行转译 + 类型校验賊慢，很难受。一般社区工具都是 `ts-loader + fork-ts-type-build-webpack-plugin`
 ```js
 var ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
 
var webpackConfig = {
  context: __dirname,
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          // disable type checker - we will use it in fork plugin
          transpileOnly: true 
        }
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin()
  ]
}
 ```





#### 配置TS编译选项

根目录下创建 `tsconfig.json`，配置可以根据自己需要

 ```json
{
    "compilerOptions": {
        "target": "ES2015",
        "module": "ES2015",
        "strict": true
    }
}
 ```


 ### ts 常用插件
 - 如果需要使用可选链(?.、??)，则需要在 `babel` 配置文件中配置
    ```js
    module.exports = {
    plugins: [
        '@babel/plugin-proposal-optional-chaining',
    ],
    }
    ```

 - 如果 `class` 类写属性声明时一直报错，需在 `babel` 配置文件中配置

 ```js
 module.exports = {
  plugins: [
    '@babel/plugin-proposal-class-properties',
  ],
}
 ```


