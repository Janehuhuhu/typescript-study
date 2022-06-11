## ts 常用 api

### 获取 ast - ts.createSourceFile

[网页版方式ts-ast-viewer](https://ts-ast-viewer.com/#code/MYewdgziA2CmB00QHMAUByARt9BKIA) 获取 `ts ast`, 可以灵活修改转换的配置，比 [astexplorer](https://astexplorer.net/) 结果准确


```typescript
import * as ts from 'typescript'

const printAllChildren = (node: ts.Node, depth = 0) => {
  console.log(
    new Array(depth + 1).join('----'),
    ts.SyntaxKind[node.kind],
    node.pos,
    node.end
  )
  node.getChildren().forEach((c) => printAllChildren(c, depth + 1))
}

const tsCode = `console.log('bbb')`

printAllChildren(
  ts.createSourceFile('hello.ts', tsCode, ts.ScriptTarget.ES5, true)
)
```

### 遍历 AST - ts.forEachChild
通常，我们以递归方式使用 `forEachChild` 函数来遍历树。这包含了访问者模式并且通常提供更多的灵活性,[详见](https://juejin.cn/post/7042498660977868814)
```js
import { readFileSync } from "fs";
import * as ts from "typescript";

export function delint(sourceFile: ts.SourceFile) {
  delintNode(sourceFile);

  function delintNode(node: ts.Node) {
    switch (node.kind) {
      case ts.SyntaxKind.ForStatement:
        if ((node as ts.IterationStatement).statement.kind !== ts.SyntaxKind.Block) {
          report(
            node,
            'A looping statement\'s contents should be wrapped in a block body.'
          );
        }
        break;

      case ts.SyntaxKind.IfStatement:
        // ....
    }

    ts.forEachChild(node, delintNode);
  }

  function report(node: ts.Node, message: string) {
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(node.getStart());
    console.log(`${sourceFile.fileName} (${line + 1},${character + 1}): ${message}`);
  }
}

const fileNames = process.argv.slice(2);
fileNames.forEach(fileName => {
  // Parse a file
  const sourceFile = ts.createSourceFile(
    fileName,
    readFileSync(fileName).toString(),
    ts.ScriptTarget.ES2015,
    /*setParentNodes */ true
  );

  // delint it
  delint(sourceFile);
});
```


### 编译 - ts.transpileModule
- 创建一个编译器不需要太多代码行，但您可能只想获得给定 `TypeScript` 源码的相应 `JavaScript` 输出。 为此，您可以使用 `ts.transpileModule` 在两行中获取 `string => string` 转换。
- ```js
  import * as ts from "typescript";

  const source = "let x: string  = 'string'";

  let result = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS }});

  console.log(JSON.stringify(result))
  ```

- 编译其他后缀文件

  本质上就是替换掉自定义后缀文件类型中约定的规范，然后通过编译器转译成可执行的代码即可
- ```js
  import * as ts from 'typescript'
  import * as fs from 'fs'
  import { join } from 'path'

  const romeFile = join(process.cwd(), './test.hj')
  let source = fs.readFileSync(romeFile, 'utf-8')

  source = source.replace('@world', 'const world:string = "world !"')

  const result = ts.transpileModule(source, {
    compilerOptions: { module: ts.ModuleKind.CommonJS },
  })

  const { outputText } = result

  eval(outputText)
  ```

### 获取 dst
可用于早期业务代码过渡 `typescript` 时，降低工作量, 也可为 `javascript` 编写的 `npm` 包自动化的提供智能提示支持

注意：输入的文件参数需要是绝对路径，`host.readFile` 需要绝对路径

用户系统的 `CompilerHost` ，带有用于读取文件、检查目录和区分大小写等的 `API`

```js
import * as ts from 'typescript'

/**
 * 支持同时输入多个 js 文件
 * 通过 ts 编译器内置api实现一个 dts 提取工具
 */
function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const createdFiles = {}

  // 编译进程的文件读取, 支持 get、write 等
  const host = ts.createCompilerHost(options)
  host.writeFile = (fileName: string, dts: string) => {
    // 拦截并收集 dts
    createdFiles[fileName] = dts
  }

  // 创建编译进程
  const program = ts.createProgram(fileNames, options, host)
  // 手动调用编译进程结果输出函数, 否则进程不会主动结束, 就没有结果
  program.emit()

  fileNames.forEach((file) => {
    console.log('### JavaScript\n')
    // 输出 js 代码
    // console.log(host.readFile(file))

    console.log('### Type Definition\n')
    const dts = file.replace('.js', '.d.ts')
    // 输出 dts 代码
    console.log(createdFiles[dts])
  })
}

const files = process.argv.slice(2)
const compilerOptions = {
  allowJs: true,
  declaration: true,
  emitDeclarationOnly: true,
}

console.log(`要自动提取的文件是 ${files.join(',')}`)
compile(files, compilerOptions)
```


[TypeScript编译器API使用指南](https://juejin.cn/post/7042498660977868814)
[Compiler API](https://github.com/microsoft/TypeScript/wiki/Using-the-Compiler-API#creating-and-printing-a-typescript-ast)