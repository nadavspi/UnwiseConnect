import './index.css';
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
const engine = filter(createEngine('tickets'), ['tickets']);

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(
    thunk,
    storage.createMiddleware(engine, [], [ActionTypes.TICKETS_UPDATE]),
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
