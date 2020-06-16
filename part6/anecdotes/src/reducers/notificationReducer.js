// import initialState from './initialState';
const initialState = 'Initial Notification';

let curTimeout = null;

// Action creators
export const setNotification = (message, seconds) => async (dispatch) => {
  // eslint-disable-next-line no-unused-expressions
  curTimeout ? clearTimeout(curTimeout) : null;

  dispatch({
    type: 'SET',
    msg: message,
  });

  curTimeout = setTimeout(() => {
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
