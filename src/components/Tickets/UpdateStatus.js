import 'react-select/dist/react-select.css';
import * as TicketsActions from '../../actions/tickets';
import React from 'react';
import { connect } from 'react-redux';

const statuses = [
  'Completed',
  'In Progress',
  'Open',
  'New',
];

const UpdateStatus = ({ ticket, value, dispatch }) => (
  <div>
    <select 
      value={value}
      onChange={e => dispatch(TicketsActions.updateStatus({ params: { ticket, status: e.target.value }}))}
    >
      {statuses.map(status => (
        <option value={status} key={status}>{status}</option>
      ))}
    </select>
  </div>
);


export default connect()(UpdateStatus);
