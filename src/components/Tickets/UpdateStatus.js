import 'react-select/dist/react-select.css';
import * as TicketsActions from '../../actions/tickets';
import React from 'react';
import { connect } from 'react-redux';

const Icon = ({ pending }) => {
  // No response yet
  if (pending.inProgress) {
    return <span className="glyphicon glyphicon-refresh" aria-hidden="true"></span>;
  }

  if (pending.response) {
    if (pending.response.status === 200) {
      return <span className="glyphicon glyphicon-ok" aria-hidden="true"></span>;
    }

    if (pending.response.status === 400) {
      return <span className="glyphicon glyphicon-remove" aria-hidden="true"></span>;
    }
  }

  return null;
};


const UpdateStatus = ({ 
  dispatch,
  pending,
  projectId,
  statuses,
  ticket,
  value,
}) => {   
  const updateStatus = (status) => {
    dispatch(TicketsActions.updateStatus({ params: { ticket, status, projectId }}));
  };

  const isPending = pending.find(item => {
    return item.params.ticket === ticket;
  });

  return (
    <div style={{ display: 'flex' }}>
      <select 
        disabled={isPending && isPending.inProgress}
        onChange={e => updateStatus(e.target.value)}
        value={value}
      >
        {statuses.map(status => (
          <option value={status} key={status}>{status}</option>
        ))}
      </select>
      {isPending && <Icon pending={isPending} /> }
    </div>
  )
};

const mapStateToProps = state => ({
  pending: state.tickets.pending,
  statuses: state.tickets.statuses,
});

export default connect(mapStateToProps)(UpdateStatus);
