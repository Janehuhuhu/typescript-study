import * as ts from 'typescript'
interface File {
  [key: string]: any
}
/**
 * 支持同时输入多个 js 文件
 * 通过 ts 编译器内置api实现一个 dts 提取工具
 */
function compile(fileNames: string[], options: ts.CompilerOptions): void {
  const createdFiles: File = {}

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
    console.log(host.readFile(file))

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