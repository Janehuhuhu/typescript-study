const { performance } = require('perf_hooks')
global.__rome_start_time = performance.now()
const { build } = require('esbuild')
const path = require('path')

const setup = async () => {
  const res = await build({
    entryPoints: [path.join(__dirname, './demo.ts')],
    outfile: path.join(__dirname, './dist/index.js'),
    minify: true,
    bundle: true,
  })
}

setup()

console.log(
  `Timer: ${Math.floor(performance.now() - global.__rome_start_time)} ms`)