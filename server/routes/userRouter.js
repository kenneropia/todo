const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user/userModel')
const protectRoute = require('./../utils/protectRoute')

const router = express.Router()

const signToken = (user) =>
  jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  })

router.post('/signup', async (req, res, next) => {
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

router.post('/login', async (req, res, next) => {
  console.log(req.body)
  const { email = '', password = '' } = req.body
  let user = null
  if (email && email.includes('@')) {
    user = await User.findOne({ email }).select('+password')
  }

  if (!user || !(await User.correctPassword(password, user.password))) {
    return res.status(401).json({
      error: {
        status: 401,
        message: 'Your email or username is incorrect',
      },
    })
  }

  user.password = null

  const token = signToken(user)
  res.json({ token, data: { user } })
})

router.get('/me', protectRoute, async (req, res, next) => {
  res.json({ data: { user: req.user } })
})

module.exports = router
