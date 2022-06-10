import * as ts from 'typescript'
import * as fs from 'fs'
import { join } from 'path'

const romeFile = join(__dirname, './test.hj')
let source = fs.readFileSync(romeFile, 'utf-8')

source = source.replace('@world', 'const world:string = "world !"')

const result = ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS },
})

const { outputText } = result

eval(outputText)