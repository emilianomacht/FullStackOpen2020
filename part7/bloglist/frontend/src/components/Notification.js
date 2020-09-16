/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import '../styles/Notification.css';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const Notification = ({ isPositive }) => {
  const notification = useSelector((state) => state.notification);

  if (notification === null) {
    return null;
  }
  return (
    <div className={isPositive ? 'positive' : 'negative'}>
      <p>{notification}</p>
    </div>
  );
};

Notification.propTypes = {
  isPositive: PropTypes.bool.isRequired,
};

export default Notification;
