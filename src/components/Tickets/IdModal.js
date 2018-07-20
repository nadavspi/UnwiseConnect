import classnames from 'classnames';
import React, { Component } from 'react';

class IdModal extends Component {
  constructor() {
    super();

    this.state = { expanded: false };

    this.expand = this.expand.bind(this);
  }

  expand() {
    const willExpand = !this.state.expanded;
    this.setState({
      expanded: willExpand,
    });
    console.log('Expand?', willExpand);
    
  }

  render () {
    const className = classnames('btn-group', {
      'open': this.state.expanded,
    });

    return (
      <div className={className}>
        <button 
          className="btn btn-default dropdown-toggle"
          onClick={this.expand}>
          notes
        </button>
        <div className="dropdown-menu">
          <h3>Notes</h3>
        </div>
      </div>
    );
  }
}

export default IdModal;
