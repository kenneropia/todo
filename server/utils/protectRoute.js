const { promisify } = require('util')
const jwt = require('jsonwebtoken')
const User = require('../models/user/userModel')

module.exports = async (req, res, next) => {
  const bearer = req.headers['authorization']
  if (!bearer) {
    return res.json({
      error: {
        status: 401,
        message: 'The authorization header is missing ',
      },
    })
  }
  let token = bearer.split(' ')[1]
  if (!token) {
    return res.json({
      error: {
        status: 401,
        message: 'You are not logged in! Please log in to get access',
      },
    })
  }
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)
  const freshUser = await User.findById(decoded.id)

  if (!freshUser) {
    return res.json({
      error: {
        status: 401,
        message: 'The user belonging to this token does no longer exist',
      },
    })
  }

  if (User.changedPasswordAfter(decoded.iat)) {
    return res.json({
      error: {
        status: 401,
        message: 'User recently changed password! Please log in again',
      },
    })
  }

  req.user = freshUser
  next()
}
