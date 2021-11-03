const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user/userModel')
const protectRoute = require('./../utils/protectRoute')

const router = express.Router()

const signToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

router.get('/signup', async (req, res, next) => {
  const userDetails = {
    username: req.body.username,
    email: req.body.email,
    birth_year: req.body.birth_year,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
  }

  const isUserValid = User.userValidator(userDetails)

  const newUser = await User.create(userDetails)

  res.json({ data: { user: newUser } })
})

router.get('/login', async (req, res, next) => {
  const { username, email, password } = req.body
  let user = null
  if (email && email.includes('@')) {
    user = await User.findOne({ email }).select('+password')
  }
  if (username) {
    user = await User.findOne({ username }).select('+password')
  }

  const isCorrectPassword = await User.correctPassword(password, user.password)
  user.password = null
  if (!user || !isCorrectPassword) {
    res.json({
      error: {
        status: 401,
        message: 'Your email or username is incorrect',
      },
    })
  }
  const token = signToken(user)
  res.json({ token, data: { user } })
})

router.get('/me', protectRoute, async (req, res, next) => {
  res.json({ data: { user: req.user } })
})

module.exports = router
