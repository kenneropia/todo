import { LOG_IN, LOG_OUT } from './authTypes'

const initialUserState = { user: JSON.parse(localStorage.getItem('user')) } || {
  user: null,
}
export const authReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { user: action.payload }
    case LOG_OUT:
      localStorage.removeItem('user')
      return { ...state, user: null }
    default:
      return state
  }
}
