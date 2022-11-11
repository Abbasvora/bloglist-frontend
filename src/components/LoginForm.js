import React from 'react'
import PropTypes from 'prop-types'
const LoginForm = ({ username, password, handleUsernameChange, handlePasswordChange, handleSubmit }) => {
  return (
    <div>
      <h2>Login to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input type={'text'} id='username' value={username} onChange={handleUsernameChange} />
        </div>
        <div>
          password
          <input type={'password'} id='password' value={password} onChange={handlePasswordChange} />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
}

export default LoginForm