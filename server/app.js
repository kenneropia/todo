const express = require('express')
require('express-async-errors')
const app = express()
const userRouter = require('./routes/userRouter')
const todoRouter = require('./routes/todoRouter')
const globalErrorHandler = require('./utils/globalErrorHandler')

// if (process.env.NODE_ENV === 'development') {
//   app.use(morgan('dev'))
// }

app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

app.get('/me', (req, res) => {
  res.send('lolo')
})

app.use('/api/user', userRouter)
app.use('/api/todos', todoRouter)

app.all('*', (req, res, next) => {
  throw Error(`Can't find ${req.originalUrl} on this server!`, 404)
})

app.use(globalErrorHandler)

module.exports = app
