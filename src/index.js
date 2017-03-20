import React from 'react';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory, IndexRedirect} from 'react-router';
import { syncHistoryWithStore, routerReducer, routerMiddleware, push } from 'react-router-redux';
import thunk from 'redux-thunk';

import reducers from './reducers/index';
import App from './layout/App/App';

const store = createStore(reducers, applyMiddleware(thunk, routerMiddleware(browserHistory)))

ReactDOM.render(
  <Provider store={store}>
  		<App />
  </Provider>
  , document.querySelector('.container'));
