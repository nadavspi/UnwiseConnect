import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { startTimer } from '../../actions/toggl';

class StartTimer extends Component {
  state = {
    expanded: false,
    description: '',
  };

  startTimer = (summary = this.props.ticket.summary, id = this.props.ticket.id) => {
    const description = `${summary} (#${id})`;
    this.props.dispatch(startTimer({ description }));
  }

  startCustomTimer = (e) => {
    e.preventDefault();
    this.startTimer(this.state.description);
    this.setState({ expanded: false });
  }

  toggle = () => {
    const willExpand = !this.state.expanded;

    this.setState({
      expanded: willExpand,
    }, () => {
      if (willExpand) {
        this.input.focus();
      }
    });
  }

  render() {
    const className = classnames('btn-group', {
      'open': this.state.expanded,
    });

    return (
      <div className={className}>
        <button
          className="btn btn-default dropdown-toggle"
          onClick={this.toggle}
          type="button"
        >
          <span className="glyphicon glyphicon-time"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu toggl-description">
          <form onSubmit={this.startCustomTimer}>
            <div className="form-group">
              <label htmlFor="description">Timer Description</label>
              <textarea
                id="description"
                onChange={e => this.setState({ description: e.target.value })}
                className="form-control"
                ref={ref => { this.input = ref }}
                value={this.state.description}
              />
            </div>
            <button
              className="btn btn-success"
              type="submit"
            >
              Start Timer
            </button>
            <button
              className="btn btn-link"
              onClick={this.toggle}
              type="button"
            >
              Cancel
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(StartTimer);
