const initialState = {
  isVisible: false,
  username: '',
  password: '',
};

// Action creators
export const toggleVisibility = () => ({
  type: 'TOGGLE_VISIBILITY',
});

export const setUsername = (value) => ({
  type: 'SET_USERNAME',
  data: value,
});

export const setPassword = (value) => ({
  type: 'SET_PASSWORD',
  data: value,
});

// Main reducer
const reducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case 'TOGGLE_VISIBILITY':
      newState.isVisible = !newState.isVisible;
      return newState;
    case 'SET_USERNAME':
      newState.username = action.data;
      return newState;
    case 'SET_PASSWORD':
      newState.password = action.data;
      return newState;
    default:
      return state;
  }
};

export default reducer;
