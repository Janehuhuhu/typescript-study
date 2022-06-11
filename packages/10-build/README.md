## 在不同环境中编译 ts 文件
- tsc
  - [经常用的 tsc 是什么](https://github.com/microsoft/TypeScript/blob/main/bin/tsc)
  - [深入理解typescript-编译上下文](https://jkchao.github.io/typescript-book-chinese/project/compilationContext.html#tsconfig-json)
  - [TypeScript编译原理](https://www.studyfe.cn/2019/08/05/typescript/compilationprinciple/)

- node 中构建 ts
  - `ts-node` => 在 `node` 环境编译+执行 `.ts` 文件
  - [ts-node](https://github.com/TypeStrong/ts-node#overview)

- rollup 中构建 ts
  - [@rollup/plugin-typescript](https://github.com/rollup/plugins/tree/master/packages/typescript/#readme)

- webpack 中构建 ts
  - [TypeScript起步](https://webpack.docschina.org/guides/typescript/)

<br>

## swc 和 esbuild
- [ESBuild & SWC浅谈: 新一代构建工具](https://juejin.cn/post/7091655236938366989)

- 要点：
  - `ESBuild` 是基于 `Go` 语言开发的 `JavaScript Bundler`, 由 `Figma` 前 `CTO Evan Wallace` 开发, 并且也被 `Vite` 用于开发环境的依赖解析和 `Transform`.
  - `SWC` 则是基于 `Rust` 的 `JavaScript Compiler` (其生态中也包含打包工具 `spack`)
  - `ESBuild` 在 `API` 层面上非常简洁, 主要的API只有两个: `Transform` 和 `Build,` 这两个 `API` 可以通过 `CLI, JavaScript, Go` 的方式调用
    ```js
    require('esbuild').buildSync({
      entryPoints: ['in.js'],
      bundle: true,
      outfile: 'out.js',
    })
    ```
  - 如果你觉得目前完全使用 `ESBuild` 还不成熟, 也可以在 `Webpack` 体系中使用 `ESBuild` 的`loader` 来替代 `babel` 用于进行代码转换, 除此之外, `esbuild-loader` 还可以用于 `JS & CSS` 的代码最小化, 详见[在webpack中使用esbuild去构建 ts](https://github.com/privatenumber/esbuild-loader)

  ```js
  const { ESBuildMinifyPlugin } = require('esbuild-loader')
  module.exports = {
      rules: [
        {
          test: /.js$/,
          // 使用esbuild作为js/ts/jsx/tsx loader
          loader: 'esbuild-loader',
          options: {
            loader: 'jsx',  
            target: 'es2015'
          }
        },
      ],
      // 或者使用esbuild-loader作为JS压缩工具
      optimization: {
        minimizer: [
          new ESBuildMinifyPlugin({
            target: 'es2015'
          })
        ]
      }
  }
  ```

- 如果你想在 `Webpack` 体系下使用 `swc` (替代babel), 也可以使用 `swc-loader`

<br>

## ts 构建工具
- tsup
  - 和 `webpack` 比较类似的构建工具，可用于构建 `ts`、`js`等
  - [tsup](https://github.com/egoist/tsup)

- SWC
  - [swc-project](https://github.com/swc-project/swc)
  - Run TypeScript with node, 且可用于加速 `jest` 运行, [swc-node](https://github.com/Brooooooklyn/swc-node)

- esbuild
  - [esbuild](https://github.com/evanw/esbuild)
  - [rollup-plugin-esbuild](https://github.com/egoist/rollup-plugin-esbuild)
  - [在webpack中使用esbuild去构建 ts](https://github.com/privatenumber/esbuild-loader)

<br>

## 实践 - 运行中 ts 解析
一般用于在运行中加载 `ts` 文件，如按需加载的情况
```js
// compiler.js
const { register } = require('ts-node')
const compilerOptions = {
  module: 'commonjs',
  target: 'es5',
  lib: [
    // 接收的语法规范范围
    'es5',
    'esnext',
    'dom',
  ],
}
register({ compilerOptions })
```

```js
require('./compiler')
const demoRes = require('./demo.ts')
demoRes.callMe()
```