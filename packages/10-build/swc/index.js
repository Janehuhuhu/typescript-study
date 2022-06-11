const { performance } = require('perf_hooks')
global.__rome_start_time = performance.now()
const swc = require('@swc/core')

const tsCode = `
let x: string = 'world'

export default {
  a: 'hello',
  callMe: () => {
    console.log(x)
  },
}

`

swc
  .transform(tsCode, {
    filename: 'input.js',
    sourceMaps: true,
    isModule: true,
    jsc: {
      parser: {
        syntax: 'typescript',
        tsx: true,
        decorators: true,
        dynamicImport: true,
      },
      transform: {},
    },
  })
  .then((output) => {
    console.log()
    console.log(output.code)
    console.log()
    console.log(
      `Timer: ${Math.floor(performance.now() - global.__rome_start_time)} ms`
    )
  })