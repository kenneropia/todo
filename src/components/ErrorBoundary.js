import { useSelector, useDispatch } from 'react-redux'
import { REMOVE_ERROR } from '../redux/error/errorTypes'
function ErrorBoundary({ children }) {
  return (
    <>
      <ErrorMessage />
      {children}
    </>
  )
}

function ErrorMessage() {
  const error = useSelector((state) => state.error)
  const dispatch = useDispatch()

  if (error.message) {
    setTimeout(() => {
      dispatch({ type: REMOVE_ERROR })
    }, 10000)
    return <p className="error"> {error.message}</p>
  }
  return null
}

export default ErrorBoundary
