import React from 'react'
import '../styles/Notification.css'

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

export default Notification