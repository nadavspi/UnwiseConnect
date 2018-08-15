import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';
require('es6-promise').polyfill();

export const fetchTickets = projectId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };

  return fetch(`${process.env.REACT_APP_API_URL}/v1/tickets/${projectId}`, { headers }).then(checkStatus).then(parseJSON);
}

export const dispatchTickets = params => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
    'Content-Type': 'application/json'
  };

  return fetch(`${process.env.REACT_APP_API_URL}/v1/dispatch`, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
}

export const createWorkplan = params => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
    'Content-Type': 'application/json',
  };

  return fetch(`${process.env.REACT_APP_API_URL}/v1/workplan`, {
    headers, 
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
}
