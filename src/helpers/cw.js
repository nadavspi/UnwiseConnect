import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';
require('es6-promise').polyfill();

export const fetchTickets = projectId => {
  return fetch(`http://127.0.0.1:3434/v1/tickets/${projectId}`).then(checkStatus).then(parseJSON);
}
