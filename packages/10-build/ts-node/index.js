const { performance } = require('perf_hooks')
global.__rome_start_time = performance.now()
require('./compiler')

const demoRes = require('./demo.ts')
console.log(demoRes.a)
demoRes.callMe()
console.log(
  `Timer: ${Math.floor(performance.now() - global.__rome_start_time)} ms`
)