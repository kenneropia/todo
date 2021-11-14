const express = require('express')
const Todo = require('../models/todo/todoModel')
const protectRoute = require('../utils/protectRoute')

const router = express.Router()

router.get('/', protectRoute, async (req, res) => {
  let allTodos = Todo.find({})
  const { sortBy, limit = 30 } = req.query

  allTodos = await allTodos.sort('-' + sortBy).limit(limit - 1)
  res.json({ data: { todos: allTodos } })
})

router.post('/', protectRoute, async (req, res) => {
  //text,id,user

  req.body.user = req.user.id
  console.log(req.body)

  const newTodo = await Todo.create(req.body)
  res.json({ data: { todo: newTodo } })
})

router.get('/:todoId', protectRoute, async (req, res) => {
  const { todoId = null } = req.params

  const { id: userId } = req.user

  const todo = await Todo.findOne({ id: todoId, user: userId })
  if (!todo || todo.length < 12) {
    return res.json({
      error: {
        status: 404,
        message: 'This todo doesnt exist or has been deleted',
      },
    })
  }
  res.json({ data: { todo } })
})

router.post('/', protectRoute, async (req, res) => {
  //text,id,user

  req.body.user = req.user.id
  console.log(req.body)
  const isUserValid = Todo.todoValidator(req.body)

  const newTodo = await Todo.create(req.body)
  res.json({ data: { todo: newTodo } })
})

router.patch('/:todoId', protectRoute, async (req, res) => {
  const { todoId } = req.params
  const { id: userId } = req.user
  console.log(req.body)
  const todo = await Todo.findOneAndUpdate(
    { _id: todoId, user: userId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  )
  console.log(todo)
  if (!todo) {
    return res.json({
      error: {
        status: 404,
        message: 'This todo doesnt exist or has been deleted',
      },
    })
  }
  res.json({ data: { todo } })
})

router.delete('/:todoId', protectRoute, async (req, res) => {
  const { todoId = null } = req.params

  const todo = await Todo.findByIdAndDelete(todoId)
  if (!todo || todo.length < 12) {
    return res.json({
      error: {
        status: 404,
        message: 'This todo doesnt exist or has already been deleted',
      },
    })
  }
  res.json({ data: { todo } })
})

module.exports = router
