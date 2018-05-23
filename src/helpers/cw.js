import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';
require('es6-promise').polyfill();

const headers = {
  Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  'Content-Type': 'application/json',
};

export const fetchTickets = projectId => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/tickets/${projectId}`, { headers }).then(checkStatus).then(parseJSON);
}

export const dispatchTickets = params => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/dispatch`, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
};

export const updateTicketStatus = params => {
  console.log(params);
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticketStatus`, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
};
