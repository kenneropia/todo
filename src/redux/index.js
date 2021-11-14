import { combineReducers } from 'redux'
import { authReducer } from './auth/authReducer'
import { errorReducer } from './error/errorReducer'
import filterReducer from './filter/filterReducer'
import todoReducer from './todo/todoReducer'

const reducers = combineReducers({
  error: errorReducer,
  auth: authReducer,
  todos: todoReducer,
  filters: filterReducer,
})

export default reducers
