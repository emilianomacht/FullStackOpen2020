const initialState = 'Initial notification';

// Main reducer
const reducer = (state = initialState, action) => {
  const newState = [...state];
  switch (action.type) {
    case 'SET': {
      // something
      return newState;
    }
    default:
      return state;
  }
};

export default reducer;
