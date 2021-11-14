import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { login } from '../redux/auth/authActions'

function Login() {
  const history = useHistory()

  const dispatch = useDispatch()
  const [form, setForm] = useState({ email: '', password: '' })

  const handleSubmit = (e) => {
    e.preventDefault()

    dispatch(login(form))
    history.push('/')
  }
  return (
    <div className="login">
      <header className="header-text">#login</header>
      <form className="login-form">
        <div>
          <label>Email:</label>
          <input
            onChange={({ target }) =>
              setForm((state) => ({ ...state, email: target.value }))
            }
            value={form.email}
            type="text"
            placeholder="add email"
          />
        </div>
        <div>
          <label>password:</label>
          <input
            onChange={({ target }) =>
              setForm((state) => ({ ...state, password: target.value }))
            }
            value={form.password}
            type="password"
            placeholder="add password"
          />
        </div>
        <button onClick={handleSubmit} type="submit" className="">
          Add
        </button>
      </form>
    </div>
  )
}

export default Login
