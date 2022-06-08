## 编译选项

### 自动编译文件

```js
// 安装依赖
npm install -g typescript
```
安装依赖后，可执行 `tsc` 进行 `ts` 文件编译，默认会编译所有 `ts` 文件

编译文件时，使用 `-w` 指令后，`TS` 编译器会自动监视文件的变化，并在文件发生变化时对文件进行重新编译。

示例：

```powershell
  tsc xxx.ts -w
```

<br>

### 自动编译整个项目

- 如果直接使用 `tsc` 指令，则可以自动将当前项目下的所有 `ts`文件编译为 `js` 文件。

- **但是能直接使用 tsc 命令(tsc)的前提时，要先在项目根目录下创建一个 ts 的配置文件 tsconfig.json**

- `tsconfig.json` 是一个 `JSON` 文件，添加配置文件后，只需只需 `tsc` 命令即可完成对整个项目的编译

- 配置查找
  - 默认 `tsc` 时，编译器会从当前目录开始去查找 `tsconfig.json` 文件，逐级向上搜索父目录
  - 支持命令行参数 `--project`（或-p）指定一个包含 `tsconfig.json` 文件的目录

<br>



配置选项：

#### **include**

  - 定义希望被编译文件所在的目录
  - 默认值：["\*\*/\*"]

示例：

```json
  "include":["src/**/*", "tests/**/*"]
```

上述示例中，所有 `src` 目录和 `tests` 目录下的文件都会被编译

#### **exclude**

  - 定义需要排除在外的目录
  - 默认值：["node_modules", "bower_components", "jspm_packages"]

示例：

```json
  "exclude": ["./src/hello/**/*"]
```

上述示例中， `src` 下 `hello` 目录下的文件都不会被编译

#### **extends**

-   定义被继承的配置文件

示例：

```json
"extends": "./configs/base"
```

上述示例中，当前配置文件中会自动包含 `config` 目录下 `base.json` 中的所有配置信息。

无法继承的一些配置（过往经验）： `baseUrl` 、 `include` 、 `exclude`

#### **files**

-   指定被编译文件的列表，**只有需要编译的文件少时才会用到**

示例：

```json
"files": [
    "core.ts",
    "sys.ts",
    "types.ts",
    "scanner.ts",
    "parser.ts",
    "utilities.ts",
    "binder.ts",
    "checker.ts",
    "tsc.ts"
  ]
```

- 列表中的文件都会被 `TS` 编译器所编译

#### compilerOptions

  - 编译选项是配置文件中非常重要也比较复杂的配置选项
  - 在 `compilerOptions` 中包含多个子选项，用来完成对编译的配置

项目选项：
  - target

    - 设置 `ts` 代码编译的目标版本

    - 可选值：

      - ES3（默认）、ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext

    - 示例：

      - ```json
        "compilerOptions": {
            "target": "ES6"
        }
        ```

    - 如上设置，我们所编写的 `ts` 代码将会被编译为 `ES6` 版本的 `js` 代码

  - lib

    - 指定代码运行时所包含的库（宿主环境）

    - 可选值：

      - ES5、ES6/ES2015、ES7/ES2016、ES2017、ES2018、ES2019、ES2020、ESNext、DOM、WebWorker、ScriptHost ......

    - 示例：

      - ```json
        "compilerOptions": {
            "target": "ES6",
            "lib": ["ES6", "DOM"],
            "outDir": "dist",
            "outFile": "dist/aa.js"
        }
        ```

  - module

    - 设置编译后代码使用的模块化系统

    - 可选值：

      - CommonJS、UMD、AMD、System、ES2020、ESNext、None

    - 示例：

      - ```typescript
        "compilerOptions": {
            "module": "CommonJS"
        }
        ```

  - moduleResolution

    - 查找模块遵守的规范

    - 共有两种可用的模块解析策略： `Node` 和 `Classic` 。 你可以使用 `--moduleResolution` 标记来指定使用哪种模块解析策略。若未指定，那么在使用了 `--module AMD | System | ES2015` 时的默认值为 `Classic`，其它情况时则为 `Node` 。 详情查看 [模块解析](https://www.tslang.cn/docs/handbook/module-resolution.html)

  - declaration

    - 是否生成声明文件

  - declarationDir

    - 定义声明文件输出目录

  - outDir

    - 编译后文件的所在目录

    - 默认情况下，编译后的 `js` 文件会和 `ts` 文件位于相同的目录，设置 `outDir` 后可以改变编译后文件的位置

    - 示例：

      - ```json
        "compilerOptions": {
            "outDir": "dist"
        }
        ```

      - 设置后编译后的 `js` 文件将会生成到 `dist` 目录

  - outFile

    - 将所有的文件编译为一个 `js` 文件

    - 默认会将所有的编写在全局作用域中的代码合并为一个 `js` 文件，如果 `module` 制定了 `None、System` 或 `AMD` 则会将模块一起合并到文件之中

    - 示例：

      - ```json
        "compilerOptions": {
            "outFile": "dist/app.js"
        }
        ```

  - rootDir

    - 指定代码的根目录，默认情况下编译后文件的目录结构会以最长的公共目录为根目录，通过 `rootDir` 可以手动指定根目录

    - 在 `"outDir": "./dest"` 配置情况下，`src/index.ts` 编译后输出位置为 `dest/src/index.js`。输出目录带上了的 · 这一层，显然不是那么合理。解决办法是指定 `rootDir: “src”`。这样，根目录变成了 `src` ，编译后输出则没有了 `src` 这一层,  即为 `dist/index.js`, [详情查看](https://wayou.github.io/2020/05/15/TypeScript-%E9%A1%B9%E7%9B%AE-rootDir-%E8%AE%BE%E7%BD%AE%E5%8F%8A%E6%A0%B9%E7%9B%AE%E5%BD%95%E4%B9%8B%E5%A4%96%E8%B5%84%E6%BA%90%E7%9A%84%E5%BC%95%E7%94%A8/)
  

    - 示例：

      - ```json
        "compilerOptions": {
            "rootDir": "./src"
        }
        ```

  - allowJs

    - 是否对 `js` 文件编译

  - checkJs

    - 是否对 `js` 文件进行检查,按照 `ts` 语法要求进行检查

    - 示例：

      - ```json
        "compilerOptions": {
            "allowJs": true,
            "checkJs": true
        }
        ```

  - removeComments

    - 是否删除注释
    - 默认值：false

  - noEmit

    - 不对代码进行编译，在需要检查编译是否通过而不需要编译结果时可用
    - 默认值：false

  - sourceMap

    - 是否生成 `sourceMap`
    - 默认值：false

  - incremental

    - 初次编译后生成存储编译信息文件，二次编译可增量编译，提升编译速度

  - paths 和 baseUrl

    -  `baseUrl` 用来描述计算相对路径时的根目录， `paths` 用来描述路径别名
    - ```js
      {
        "compilerOptions": {
          "baseUrl": "./",
          "paths": {
            "*": ["types/*"]
          } 
        }
      }
      ```
    - 应用场景：导入第三方包时，自己需要定义声明文件，用此方法定义声明文件的寻址路径，如通过 `import` 导入 `foo` 的时候，也会去 `types` 目录下寻找对应的模块的声明文件了, [详见](https://ts.xcatliu.com/basics/declaration-files.html)


- 严格检查

  - strict
    - 启用所有的严格检查，默认值为 `true` ，设置后相当于开启了所有的严格检查
  - alwaysStrict
    - 总是以严格模式对代码进行编译
  - noImplicitAny
    - 禁止隐式的 `any` 类型， 默认为 false

    - 如下，`noImplicitAny` 为 `true` 时，`name、age` 会报错
      ```js
      function a(name, age) {
        console.log(name, age);
      }
      ```
  - noImplicitThis
    - 禁止类型不明确的 `this`, 默认为 `false`
    - 如下，`this` 是不明确的
      ```js
      function test2() {
        alert(this)
      }
      ```
  - strictBindCallApply
    - 严格检查 `bind、call` 和 `apply` 的参数列表
  - strictFunctionTypes
    - 严格检查函数的类型
  - strictNullChecks
    - 严格的空值检查
  - strictPropertyInitialization
    - 严格检查属性是否初始化

- 额外检查

  - noFallthroughCasesInSwitch
    - 检查switch语句包含正确的break
  - noImplicitReturns
    - 检查函数没有隐式的返回值
  - noUnusedLocals
    - 检查未使用的局部变量
  - noUnusedParameters
    - 检查未使用的参数

- 高级

  - allowUnreachableCode
    - 检查不可达代码
    - 可选值：
      - true，忽略不可达代码
      - false，不可达代码将引起错误
  - noEmitOnError
    - 有错误的情况下不进行编译
    - 默认值：false