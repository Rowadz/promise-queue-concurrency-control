import express from 'express'
import { rateLimit } from 'express-rate-limit'

console.clear()

const app = express()
const port = 3001

const limiter = rateLimit({
  windowMs: 100,
  // Limit each IP to 5 requests per `window`
  max: 5,
  message: 'Too many requests',
})

app.get('/', limiter, (req, res) => {
  console.log('hi')

  res.sendStatus(Math.random() > 0.5 ? 500 : 200)
})

app.listen(port, () => {
  console.log(`🚀 Example app listening on port ${port}`)
})
