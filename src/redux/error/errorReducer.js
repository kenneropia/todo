import { REMOVE_ERROR, SET_ERROR } from './errorTypes'

const initialUserState = { status: 0, message: '' }
export const errorReducer = (state = initialUserState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return { ...action.payload }
    case REMOVE_ERROR:
      return { error: null }
    default:
      return state
  }
}
