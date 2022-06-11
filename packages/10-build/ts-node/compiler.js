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