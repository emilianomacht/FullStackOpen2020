// import initialState from './initialState';
const initialState = 'Initial Notification';

// Action creators
export const setNotification = (message) => ({
  type: 'SET',
  msg: message,
});

// Main reducer
const reducer = (state = initialState, action) => {
  let newState = String.toString(state);
  switch (action.type) {
    case 'SET': {
      newState = action.msg;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
