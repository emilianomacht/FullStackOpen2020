import React from "react";

const Notification = ({ message, isSuccesful }) => {
  if (message === null) {
    return null;
  }

  return (
    <div className={`notification ${isSuccesful ? "succesful" : "error"}`}>
      {message}
    </div>
  );
};

export default Notification;
