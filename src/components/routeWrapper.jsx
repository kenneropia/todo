import { useSelector } from 'react-redux'
import { Route, Redirect } from 'react-router-dom'

function RouteWrapper({ children, ...rest }) {
  const user = useSelector((state) => {
    return state.auth.user
  })

  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children
        }

        if (!user) {
          return (
            <Redirect
              to={{
                pathname: '/login',
              }}
            />
          )
        }
        return null
      }}
    />
  )
}

export default RouteWrapper
