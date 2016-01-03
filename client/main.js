// TODO: routing
import React from 'react';
import ReactDOM from 'react-dom';
import reducer from './hours/reducer.js'
import { Provider } from 'react-redux';
import App from './app.js';

import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
//import rootReducer from './reducers/index';

// create a store that has redux-thunk middleware enabled
const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

const store = createStoreWithMiddleware(reducer);

import View from './hours/view.jsx';

ReactDOM.render(
  <Provider store={store}><App/></Provider>,
  document.getElementById('content'));
