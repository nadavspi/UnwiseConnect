require('es6-promise').polyfill();
import fetch from 'isomorphic-fetch';

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
  }
}

function parseJSON(response) {
  return response.json();
}

export const fetchTickets = projectId => {
  return fetch(`http://127.0.0.1:3434/v1/tickets/${projectId}`).then(checkStatus).then(parseJSON);
}
