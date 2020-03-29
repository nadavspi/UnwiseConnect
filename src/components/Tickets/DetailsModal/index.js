import Modal from 'react-modal';
import React, { Component } from 'react';
import ScheduleEntries from './ScheduleEntries';
import TimeEntries from './TimeEntries';
import Notes from './Notes';

class DetailsModal extends Component {
  constructor() {
    super();

    this.state = { 
        expanded: false,
      currTab: 'notes',
    };

    this.expand = this.expand.bind(this);
    this.show = this.show.bind(this);
  }

  componentWillMount() {
    Modal.setAppElement('body');
  }

  expand() {
    const willExpand = !this.state.expanded;
    this.setState({
      ...this.state,
      expanded: willExpand,
    });
  }

  show(tabName) {
    this.setState({
      ...this.state,
      currTab: tabName,
    })
  }

  render () {
    return (
      <div>
        <a
          className="glyphicon glyphicon-new-window"
          onClick={this.expand}>
        </a>
        <Modal
          contentLabel="Notes Modal"
          isOpen={this.state.expanded}
          overlayClassName="modal-overlay"
          onRequestClose={this.expand}
          shouldCloseOnOverlayClick={true}
        >
          <nav className="navbar navbar-static-top">
            <ul className="nav nav-settings">
              {this.props.tabs.map((tab,index) => (
                <div key={index}>
                  <li>
                    <a
                      className="btn btn-modal-nav"
                      onClick={e => this.show(tab.property)}
                      style={{borderColor: 'transparent'}}>
                      {tab.label}
                    </a>
                  </li>
                </div>
              ))}

              <li>
                <a
                  className="glyphicon glyphicon-remove-circle"
                  onClick={this.expand}>
                </a>
              </li>
            </ul>
          </nav>
          {this.state.currTab === 'notes' && (
            <Notes ticketNumber={this.props.ticketNumber} />
          )}
          {this.state.currTab === 'scheduleEntries' && (
            <ScheduleEntries ticketNumber={this.props.ticketNumber} />
          )}
          {this.state.currTab === 'timeEntries' && (
            <TimeEntries ticketNumber={this.props.ticketNumber} />
          )}
        </Modal>
      </div>        
    );
  }
}

DetailsModal.defaultProps = {
  tabs: [
    {
      label: 'Notes',
      property: 'notes',
    },
    {
      label: 'Schedule Entries',
      property: 'scheduleEntries',
    },
    {
      label: 'Time Entries',
      property: 'timeEntries',
    },
  ],
}

export default DetailsModal;




