import * as ts from 'typescript'

const printAllChildren = (node: ts.Node, depth = 0) => {
  // console.log('node', node)
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