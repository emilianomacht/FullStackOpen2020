// import initialState from './initialState';
const initialState = 'Initial Notification';

// Action creators
export const setNotification = (message, seconds) => async (dispatch) => {
  dispatch({
    type: 'SET',
    msg: message,
  });

  setTimeout(() => {
    dispatch({
      type: 'CLEAR',
    });
  }, seconds * 1000);
};

// Main reducer
const reducer = (state = initialState, action) => {
  let newState = String.toString(state);
  switch (action.type) {
    case 'SET': {
      newState = action.msg;
      return newState;
    }
    case 'CLEAR':
      return '';
    default:
      return state;
  }
};

export default reducer;
