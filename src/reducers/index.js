import app from './app';
import projects from './projects';
import tickets from './tickets';
import user from './user';
import { combineReducers } from 'redux';

export default combineReducers({
  app,
  projects,
  tickets,
  user,
});
