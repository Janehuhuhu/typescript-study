## 声明文件
[声明文件](https://ts.xcatliu.com/basics/declaration-files.html)


要点：

- 声明文件书写方式注意区分全局类型和模块，全局类型 `declare`, 模块 `export`
- ` declare global` 可以在 `npm` 包或者 `UMD` 库的声明文件中扩展全局变量的类型, `declare module` 可以扩展原有模块
- 注意声明文件解析规则：
    - 指定了 `types` 为 `foo.d.ts` 之后，导入此库的时候，就会去找 `foo.d.ts` 作为此库的类型声明文件了。 `typings` 与 `types` 一样，只是另一种写法。

    - 如果没有指定 `types` 或 `typings` ，那么就会在根目录下寻找 `index.d.ts` 文件，将它视为此库的类型声明文件。

    - 如果没有找到 `index.d.ts` 文件，那么就会寻找入口文件（ `package.json `中的 `main` 字段指定的入口文件）是否存在对应同名不同后缀的 `.d.ts` 文件。
