import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'
import Login from './components/Login'
import RouteWrapper from './components/routeWrapper'
import Signin from './components/Signin'

import Todo from './components/Todo'

function App() {
  return (
    <div className="container">
      <ErrorBoundary>
        <Router>
          <Switch>
            <RouteWrapper exact path="/">
              <Todo />
            </RouteWrapper>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/signin">
              <Signin />
            </Route>
          </Switch>
        </Router>
      </ErrorBoundary>
    </div>
  )
}

export default App
