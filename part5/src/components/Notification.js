import React from 'react'
import '../styles/Notification.css'
import PropTypes from 'prop-types'

const Notification = ({ message, isPositive }) => {
  if (message === null) {
    return null
  } else {
    return (
      <div className={isPositive ? 'positive' : 'negative'}>
        <p>{message}</p>
      </div>
    )
  }
}

Notification.propTypes = {
  message: PropTypes.string,
  isPositive: PropTypes.bool.isRequired
}

export default Notification