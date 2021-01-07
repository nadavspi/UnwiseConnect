import * as TicketsActions from '../../actions/tickets';
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import memoize from 'memoizee';

const Icon = ({ pending }) => {
  // No response yet
  if (pending.inProgress) {
    return <div className="glyphicon glyphicon-refresh text-info" aria-hidden="true"></div>;
  }

  if (pending.response) {
    if (pending.response.status === 200) {
      return <div className="glyphicon glyphicon-ok" aria-hidden="true"></div>;
    }

    if (pending.response.status === 400) {
      return <div className="glyphicon glyphicon-remove text-danger" aria-hidden="true"></div>;
    }
  }

  return null;
};


class UpdateStatus extends PureComponent {
  state = {
    status: undefined,
  }

  componentDidUpdate = (prevProps) => {
    const { ticket } = this.props;
    const isPending = this.props.pending.find(item => {
      return item.params.ticket === ticket;
    });

    if (!isPending || !isPending.response) {
      return;
    }

    if (this.state.status && isPending.response.status === 400) {
      // The request failed. Let's reset our optimism.
      this.setState({ status: undefined });
    }
  }

  render() {
    const { 
      dispatch,
      pending,
      projectId,
      statuses,
      ticket,
      value,
    } = this.props;
    const updateStatus = (status) => {
      dispatch(TicketsActions.updateStatus({ params: { ticket, status, projectId }}));
      // Optimistically update the status in the UI
      this.setState({ status });
    };

    const isPending = pending.find(item => {
      return item.params.ticket === ticket;
    });

    return (
      <div>
        <select 
          className="form-control"
          disabled={isPending && isPending.inProgress}
          onChange={e => updateStatus(e.target.value)}
          value={this.state.status || value}
        >
          {statuses.map(status => (
            <option value={status} key={status}>{status}</option>
          ))}
        </select>
        {isPending && <Icon pending={isPending} /> }
      </div>
    )
  }
};

const uniqueStatuses = memoize((flattened) => {
  return [...new Set(flattened.map(ticket => ticket.status.name).sort())];
}, { max: 2 });

const mapStateToProps = state => ({
  pending: state.tickets.pending,
  statuses: uniqueStatuses(state.tickets.flattened),
});

export default connect(mapStateToProps)(UpdateStatus);
