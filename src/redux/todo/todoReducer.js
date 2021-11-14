import {
  FETCH_ALL_TODO,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO,
  REMOVE_ALL_TODOS,
} from './todoTypes'

const todoReducer = (todos = [], action) => {
  switch (action.type) {
    case FETCH_ALL_TODO:
      return action.payload.todos
    case ADD_TODO:
      return [...todos, action.payload.todo]
    case REMOVE_TODO:
      return todos.filter((td) => td.id !== action.payload.todo.id)
    case UPDATE_TODO:
      return todos.map((td) =>
        td.id === action.payload.todo.id ? action.payload.todo : td
      )
    case REMOVE_ALL_TODOS:
      return todos.filter((td) => td.status !== 'completed')
    default:
      return todos
  }
}

export default todoReducer
