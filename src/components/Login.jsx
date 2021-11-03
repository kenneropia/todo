import React from 'react'

function Login() {
  return (
    <div className="login">
      <header className="header-text">#login</header>
      <form className="login-form">
        <div>
          <label>Email:</label>
          <input type="text" placeholder="add email" />
        </div>
        <div>
          <label>password:</label>
          <input type="password" placeholder="add password" />
        </div>
        <button className="">Add</button>
      </form>
    </div>
  )
}

export default Login
