import axios from 'axios'
import { add, getTime } from 'date-fns'

const API = axios.create({ baseURL: 'http://localhost:3005/api' })

API.interceptors.request.use((req) => {
  req.headers.authorization = `Bearer ${
    JSON.parse(localStorage.getItem('user'))?.token
  }`

  return req
})

export const getAllTodos = async (params = {}) => {
  const data = (await API.get('/todos', { params })).data
  return data
}
export const postTodo = async (text) =>
  (await API.post('/todos', { text })).data

export const patchTodo = async (id, editedTodo) => {
  const data = (await API.patch(`/todos/${id}`, editedTodo)).data

  return data
}

export const removeTodo = async (id) => (await API.delete(`/todos/${id}`)).data

export const removeAllTodo = async (todos) => {
  const allTd = todos.map((td) => API.delete(`/todos/${td.id}`))
  return await Promise.allSettled([...allTd])
}

const getUser = async (loginData) => {
  const data = await (await API.post('/user/login', loginData)).data

  const {
    user: { username, email, id },
  } = data.data

  let user = {
    username,
    id,
    email,
    token: data.token,
    jwt_created_at: Date.now(),
    jwt_expired_at: getTime(add(Date.now(), { days: 29 })),
  }

  localStorage.setItem('user', JSON.stringify(user))
  return user
}

export const userLogin = async (loginData) => {
  if (!localStorage.getItem('user')) {
    let user = getUser(loginData)
    return user
  } else if (localStorage.getItem('user')) {
    let user = JSON.parse(localStorage.getItem('user'))
    if (Date.now() > user.jwt_expired_at) {
      user = getUserLogin()
      return user
    }
    user = JSON.parse(localStorage.getItem('user'))
    return user
  }
}

export const signup = async (signinData) => {
  let {
    data: {
      data: { user },
    },
  } = await API.post('/user/login', signinData)

  return user
}

export const logOut = async () => {
  localStorage.removeItem('user')
  return true
}

export const getUserLogin = () => {
  const user = localStorage.getItem('user')
  return user
}
