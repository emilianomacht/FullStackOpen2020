/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable react/prop-types */
import React from 'react';
// import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { toggleVisibility, setUsername, setPassword } from '../reducers/loginFormReducer';
import { loginUser } from '../reducers/userReducer';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginFormState = useSelector((state) => state.loginForm);

  const handleLogin = (event) => {
    event.preventDefault();
    dispatch(loginUser(loginFormState.username, loginFormState.password));
  };

  if (!loginFormState.isVisible) {
    return (
      <button type="button" onClick={() => dispatch(toggleVisibility())}>login</button>
    );
  }
  return (
    <>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor="username">username</label>
          <input
            type="text"
            id="username"
            value={loginFormState.username}
            onChange={(event) => dispatch(setUsername(event.target.value))}
          />
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            id="password"
            value={loginFormState.password}
            onChange={(event) => dispatch(setPassword(event.target.value))}
          />
        </div>
        <button type="submit" onClick={handleLogin} id="login-button">log in</button>
      </form>
      <button type="button" onClick={() => dispatch(toggleVisibility())}>cancel</button>
    </>
  );
};

// LoginForm.propTypes = {
//   handleLogin: PropTypes.func.isRequired,
//   handleUsername: PropTypes.func.isRequired,
//   handlePassword: PropTypes.func.isRequired,
//   username: PropTypes.string.isRequired,
//   password: PropTypes.string.isRequired,
// };

export default LoginForm;
