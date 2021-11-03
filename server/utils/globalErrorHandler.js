const sendErrorDev = (err, req, res) => {
  console.log(err)
  return res.status(500).json({
    error: {
      status: 500,
      error: err,
      message: err.message,
      stack: err.stack,
    },
  })
}

const sendErrorProd = (err, req, res) => {
  // A) API

  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      error: {
        status: err.status,
        message: err.message,
      },
    })
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error('ERROR 💥', err)
  // 2) Send generic message
  return res.status(500).json({
    error: {
      status: 'error',
      message: 'Something went very wrong!',
    },
  })
}

const handleCastErrorDB = (err) => {
  let error = `Invalid ${err.path}: ${err.value}.`
  error = new Error(error)
  error.statusCode = 400
  error.isOperational = true
  return error
}

const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0]

  let error = `Duplicate field value: ${value}. Please use another value!`

  error = new Error(error)
  error.statusCode = 400
  error.isOperational = true
  return error
}

const handleValidationErrorDB = (err) => {
  let error = ' '
  err.details.forEach(({ message }) => (error = error + message))
  error = new Error(error)
  error.statusCode = 400
  error.isOperational = true
  return error
}

const handleJWTError = () => {
  let error = 'Invalid token. Please log in again!'
  error = new Error(error)
  error.statusCode = 401
  error.isOperational = true
  return error
}
const handleJWTExpiredError = () => {
  let error = 'Your token has expired! Please log in again.'
  error = new Error(error)
  error.statusCode = 401
  error.isOperational = true
  return error
}

const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, req, res)
  }

  let error = { ...err }
  error.message = err.message
  error.code = err.code
  error.name = err.name

  console.log(err.name)
  if (error.name === 'CastError') error = handleCastErrorDB(error)
  if (error.code === 11000) error = handleDuplicateFieldsDB(error)
  if (error.name === 'ValidationError') error = handleValidationErrorDB(error)
  if (error.name === 'JsonWebTokenError') error = handleJWTError()
  if (error.name === 'TokenExpiredError') error = handleJWTExpiredError()

  sendErrorProd(error, req, res)
}

module.exports = globalErrorHandler
