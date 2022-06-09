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

### 用 little linter 遍历 AST
https://juejin.cn/post/7042498660977868814