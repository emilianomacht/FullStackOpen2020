/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import Notification from './Notification';
import LoginForm from './LoginForm';

const LoginPage = () => (
  <div>
    <h2>log in to application</h2>
    <Notification isPositive={false} />
    <LoginForm />
  </div>
);

export default LoginPage;
