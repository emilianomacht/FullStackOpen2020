/* eslint-disable react/prop-types */
import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  handleLogin,
  handleUsername,
  handlePassword,
  username,
  password
}) => {

  return (
    <>
      {/* <Notification message={notificationMessage} isPositive={false} /> */}
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input type="text" id="username" value={username} onChange={handleUsername} />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" id="password" value={password} onChange={handlePassword} />
        </div>
        <button type='submit' onClick={handleLogin} id="login-button">log in</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm