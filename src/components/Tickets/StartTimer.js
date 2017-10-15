import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { startTimer } from '../../actions/toggl';

class StartTimer extends Component {
  constructor() {
    super();

    this.state = {
      expanded: false,
      description: '',
    };

    this.startCustomTimer = this.startCustomTimer.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.toggle = this.toggle.bind(this);
  }

  startTimer(summary = this.props.ticket.summary, id = this.props.ticket.id) {
    const description = `${summary} (#${id})`;
    this.props.dispatch(startTimer({ description }));
  }

  startCustomTimer(e) {
    e.preventDefault();
    this.startTimer(this.state.description);
    this.setState({ expanded: false });
  }

  toggle() {
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
          Start
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <div className="dropdown-menu">
          <form onSubmit={this.startCustomTimer}>
            <label htmlFor="description">Description</label>
            <input 
              id="description"
              onChange={e => this.setState({ description: e.target.value })}
              ref={ref => { this.input = ref }}
              type="text"
              value={this.state.description}
            />
            <button 
              className="btn btn-default"
              type="submit"
            >
              Start
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default connect()(StartTimer);
