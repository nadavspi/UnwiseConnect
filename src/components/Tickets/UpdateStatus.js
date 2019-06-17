import 'react-select/dist/react-select.css';
import * as TicketsActions from '../../actions/tickets';
import React, { PureComponent } from 'react';
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


class UpdateStatus extends PureComponent {
  state = {
    status: undefined,
  }

  componentDidUpdate(prevProps) {
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
      <div style={{ display: 'flex' }}>
        <select 
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

const mapStateToProps = state => ({
  pending: state.tickets.pending,
  statuses: [...new Set(state.tickets.flattened.map(ticket => ticket.status.name))],
});

export default connect(mapStateToProps)(UpdateStatus);
