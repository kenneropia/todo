import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './components/Login'
import Signin from './components/Signin'

import Todo from './components/Todo'

function App() {
  return (
    <div className="container">
      <Router>
        <Switch>
          <Route exact path="/">
            <Todo />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signin">
            <Signin />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App
