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

export const fetchTicketNotes = ticketId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket/${ticketId}/notes`, { headers }).then(checkStatus).then(parseJSON);  
}

export const fetchTicketById = ticketId => {
  const headers = {
    Authorization: `Basic ${process.env.REACT_APP_API_KEY}`,
  };
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket/${ticketId}`, { headers }).then(checkStatus).then(parseJSON);  
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
};

export const dispatchTickets = params => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/dispatch`, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
};

export const updateTicketStatus = params => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticketStatus`, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
};

export const updateTicketDetails = params => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket/${params.ticketId}`, {
    headers,
    method: 'PATCH',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
};

export const createTicket = params => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/ticket`, {
    headers,
    method: 'POST',
    body: JSON.stringify(params),
  }).then(checkStatus).then(parseJSON);
};

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
};

export const searchTimesheets = params => {
  return fetch(`${process.env.REACT_APP_API_URL}/v1/timesheets/${params.members}`, {
    headers,
    method: 'GET',
  }).then(checkStatus).then(parseJSON);
};
