import React, { Component } from 'react';


class TicketLink extends Component {
  state = {
    copySuccess: false
  }

  copyToClipboard = (e) => {
    e.preventDefault();
    let textField = document.createElement('textarea');
    textField.innerText = this.props.ticketNumber;
    document.body.appendChild(textField);
    textField.select();
    this.setState({copySuccess: document.execCommand('copy')}, () => {
      setTimeout(() => { this.setState({copySuccess: false}); }, 500);
    });
    textField.remove();
  }

  render() {
    const value = this.props.ticketNumber;
    const copy = <span className="glyphicon glyphicon-copy"></span>;
    const success = <span className="glyphicon glyphicon-ok"></span>;

    return (
      <div className="ticket-link">
        <a href={process.env.REACT_APP_CONNECTWISE_SERVER_URL + "/services/system_io/Service/fv_sr100_request.rails?service_recid=" + value} target="_blank" rel="noopener">#{value}</a>
        <button onClick={this.copyToClipboard} className="ticket-copy">
          {this.state.copySuccess ? success : copy}
          <span className="sr-only">Copy Ticket Number</span>
        </button>
      </div>
    );
  }
}

export default TicketLink;
