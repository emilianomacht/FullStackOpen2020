import { createStore } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducers/anecdoteReducer';

const store = createStore(reducer, composeWithDevTools());

export default store;
