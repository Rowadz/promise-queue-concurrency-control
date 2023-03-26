// talks with server2.ts

import PromiseQueue from 'p-queue'
import got, { Request } from 'got'
import colors from '@jshor/colors'

console.clear()
let counter = 0
let errorCounter = 0

const { bold, green, red } = colors

const printCounter = () => {
  console.clear()
  console.log(`
    ${green(bold(`success ${counter}`))}
    ${red(bold(`failer ${errorCounter}`))}
  `)
}

const queue = new PromiseQueue({
  concurrency: 5,
  intervalCap: 5,
  interval: 110,
})

let priority = 10

const handleSuccess = () => {
  counter++
}

const handleErrors = <T extends Request>(request: T) => {
  const { url, method } = request.options

  if (priority === -1) {
    errorCounter++
    return
  }

  priority--
  console.log({ priority })

  queue.add(
    () => {
      const methodName = method.toLowerCase() as 'get' | 'post'
      got[methodName](url?.toString()!, { retry: { limit: 0 } })
        .then(handleSuccess)
        .catch(handleErrors)
    },
    { priority }
  )
}

Array.from({ length: 100 }).forEach(() => {
  queue.add(
    () => {
      return got
        .get('http://localhost:3001/', { retry: { limit: 0 } })
        .then(handleSuccess)
        .catch(handleErrors)
    },
    { priority: 0 }
  )
})

queue.on('completed', (result) => {
  // console.log(queue.size)
  // counter++
  // printCounter()
})
queue.on('empty', (result) => {
  // console.clear()
  // console.log(blue(bold(`Empty`)))
  setTimeout(() => {
    printCounter()
  }, 200)
})

queue.on('error', (error) => {
  console.log('??')
  // console.log(red(`Error`), error)
})
