import express from 'express'
import colors from '@jshor/colors'
import rateLimit from 'express-rate-limit'
console.clear()
let counter = 0

const { yellow, bold, green } = colors
const printCounter = () => {
  // @ts-expect-error
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(yellow(bold(`counter ${counter}`)))
}

const limiter = rateLimit({
  windowMs: 100,
  // Limit each IP to 5 requests per `window`
  max: 5,
  message: 'Too many requests',
})

const app = express()
app.use(limiter)

const port = 3000

app.get('/', (req, res) => {
  counter++
  printCounter()
  res.json({ msg: 'hi' })
})

app.listen(port, () => {
  console.log(green(`Example app listening on port ${port} 🚀`))
})
