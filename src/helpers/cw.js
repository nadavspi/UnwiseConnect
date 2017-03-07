import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';
require('es6-promise').polyfill();

export const fetchTickets = projectId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };

  return fetch(`${process.env.REACT_APP_API_URL}/v1/tickets/${projectId}`, { headers }).then(checkStatus).then(parseJSON);
}
