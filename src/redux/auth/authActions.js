import { userLogin } from '../api'
import { SET_ERROR } from '../error/errorTypes'
import { LOG_IN } from './authTypes'

// export const signin = (formData, router) => async (dispatch) => {
//   try {
//     const { data } = await signup(formData)

//     dispatch({ type: AUTH, data })

//     router.push('/')
//   } catch (error) {
//     console.log(error)
//   }
// }

export const login = (formData) => async (dispatch) => {
  let user
  try {
    user = await userLogin(formData)
    dispatch({ type: LOG_IN, payload: user })
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
