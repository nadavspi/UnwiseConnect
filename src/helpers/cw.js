import fetch from 'isomorphic-fetch';
import { checkStatus, parseJSON } from './utils';
require('es6-promise').polyfill();

export const fetchTickets = projectId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };

  return fetch(`${process.env.REACT_APP_API_URL}/v1/tickets/${projectId}`, { headers }).then(checkStatus).then(parseJSON);
}

export const fetchTicketNotes = ticketId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket/${ticketId}/notes`, { headers }).then(checkStatus).then(parseJSON);  
}

export const fetchTicketScheduleEntryIds = ticketId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket/${ticketId}/scheduleentries`, { headers }).then(checkStatus).then(parseJSON);  
}

export const fetchScheduleEntryById = entryId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/schedule/entries/${entryId}`, { headers }).then(checkStatus).then(parseJSON);  
}

export const fetchTicketTimeEntryIds = ticketId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket/${ticketId}/timeentries`, { headers }).then(checkStatus).then(parseJSON);  
}

export const fetchTimeEntryById = entryId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/time/entries/${entryId}`, { headers }).then(checkStatus).then(parseJSON);  
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

export const dispatchPlan = params => {
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
