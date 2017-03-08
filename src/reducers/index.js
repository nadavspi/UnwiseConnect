import app from './app';
import tickets from './tickets';
import user from './user';
import { combineReducers } from 'redux';

export default combineReducers({
  app,
  tickets,
  user,
});
