import './index.scss';
import * as storage from 'redux-storage'
import App from './components';
import React from 'react';
import ReactDOM from 'react-dom';
import createEngine from 'redux-storage-engine-indexed-db';
import filter from 'redux-storage-decorator-filter';
import rootReducer from './reducers/';
import thunk from 'redux-thunk';
import { ActionTypes } from './config/constants';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';

const reducer = storage.reducer(rootReducer);
const engine = filter(createEngine('tickets'), [
  ['tickets', 'nested'],
  ['tickets', 'flattened'],
]);

// Actions that trigger an IndexedDB update
const engineActions = [
  ActionTypes.TICKETS_REMOVE,
  ActionTypes.TICKETS_UPDATE,
];

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunk,
    storage.createMiddleware(engine, [], engineActions),
  ),
);

const load = storage.createLoader(engine);
load(store);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
