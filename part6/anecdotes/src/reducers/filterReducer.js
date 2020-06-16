const initialState = '';

// Action creators
export const setFilter = (filter) => ({
  type: 'SET_FILTER',
  msg: filter,
});

// Main reducer
const reducer = (state = initialState, action) => {
  let newState = String.toString(state);
  switch (action.type) {
    case 'SET_FILTER': {
      newState = action.msg;
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
