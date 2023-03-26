// talks with server.ts
import PromiseQueue from 'p-queue'
import got, { RetryOptions } from 'got'
import colors from '@jshor/colors'

console.clear()
let counter = 0

const { blue, bold, red } = colors

console.clear()

const printCounter = () => {
  // @ts-expect-error
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(blue(bold(`counter ${counter}`)))
}
// ? [1] [2] [3] [x] [x]
// ? 50ms
const queue = new PromiseQueue({
  concurrency: 60,
  // intervalCap: 5,
  // interval: 10,
})

Array.from({ length: 100 }).forEach(() => {
  queue.add(() => {
    return got.get('http://localhost:3000/')
  })
})

queue.on('completed', () => {
  counter++
  printCounter()
})

queue.on('error', (error) => {
  console.log(red(`Error`), Object.keys(error))
})
