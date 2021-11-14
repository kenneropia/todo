import {
  getAllTodos,
  postTodo,
  removeTodo,
  patchTodo,
  removeAllTodo,
} from '../api'
import { SET_ERROR } from '../error/errorTypes'
import {
  FETCH_ALL_TODO,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  REMOVE_ALL_TODOS,
} from './todoTypes'

const errorHandler = (err, dispatch) => {
  if (err.message) {
    dispatch({ type: SET_ERROR, payload: { message: err.message } })
  } else if (err.response.data.error.message) {
    dispatch({ type: SET_ERROR, payload: err.response.data.error })
  } else if (err.response) {
    dispatch({ type: SET_ERROR, payload: err.response.data })
  }
}

export const getTodos = () => async (dispatch) => {
  try {
    const todos = await getAllTodos()

    dispatch({ type: FETCH_ALL_TODO, payload: todos.data })
  } catch (err) {
    if (err.response.data.error.message) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error })
    } else if (err.response) {
      dispatch({ type: SET_ERROR, payload: err.response.data })
    } else {
      dispatch({ type: SET_ERROR, payload: { message: err.message } })
    }
  }
}
export const createTodo = (todo) => async (dispatch) => {
  try {
    const { data } = await postTodo(todo)

    dispatch({ type: ADD_TODO, payload: data })
  } catch (err) {
    if (err.response.data.error.message) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error })
    } else if (err.response) {
      dispatch({ type: SET_ERROR, payload: err.response.data })
    } else {
      dispatch({ type: SET_ERROR, payload: { message: err.message } })
    }
  }
}

export const updateTodo = (id, todo) => async (dispatch) => {
  try {
    const { data } = await patchTodo(id, todo)

    dispatch({ type: UPDATE_TODO, payload: data })
  } catch (err) {
    if (err.response.data.error.message) {
      dispatch({ type: SET_ERROR, payload: err.response.data.error })
    } else if (err.response) {
      dispatch({ type: SET_ERROR, payload: err.response.data })
    } else {
      dispatch({ type: SET_ERROR, payload: { message: err.message } })
    }
  }
}

export const deleteTodo = (todoId) => async (dispatch) => {
  try {
    const { data } = await removeTodo(todoId)
    console.log(data.todo.id)
    dispatch({ type: REMOVE_TODO, payload: data })
  } catch (err) {
    errorHandler(err, dispatch)
  }
}
export const deleteAllTodos = (todos) => async (dispatch) => {
  try {
    console.log(todos)
    await removeAllTodo(todos)

    dispatch({ type: REMOVE_ALL_TODOS })
  } catch (err) {
    errorHandler(err, dispatch)
  }
}
