/* eslint-disable react/prop-types */
import React from 'react'

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
        <button type='submit' onClick={handleLogin}>log in</button>
      </form>
    </>
  )
}

export default LoginForm