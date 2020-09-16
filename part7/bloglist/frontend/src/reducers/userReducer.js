import blogService from '../services/blogs';
import loginService from '../services/login';

// const initialState = {
//   user: null,
//   loginForm: {
//     username: '',
//     password: '',
//   },
// };

// Action creators
export const initializeUser = () => async (dispatch) => {
  const loggedUser = window.localStorage.getItem('loggedUser');
  if (loggedUser) {
    const user = JSON.parse(loggedUser);
    // setUser(user);
    dispatch({
      type: 'INIT_USER',
      data: user,
    });
    blogService.setToken(user.token);
  }
};

export const loginUser = (username, password) => async (dispatch) => {
  try {
    const user = await loginService.login({
      username, password,
    });
    window.localStorage.setItem('loggedUser', JSON.stringify(user));
    blogService.setToken(user.token);
    dispatch({
      type: 'LOGIN',
      data: user,
    });
  } catch (exception) {
    // dispatch(setNotification('Wrong username or password', 5));
  }
};

export const logoutUser = () => {
  window.localStorage.removeItem('loggedUser');
  window.location.reload();
  return {
    type: 'LOGOUT',
  };
};

// Main reducer
const reducer = (state = null, action) => {
  // const newState = { ...state };
  switch (action.type) {
    case 'INIT_USER':
      return action.data;
    case 'LOGIN':
      return action.data;
    case 'LOGOUT':
      return null;
    default:
      return state;
  }
};

export default reducer;
