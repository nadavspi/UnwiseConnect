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
        <button 
          className="btn btn-default"
          onClick={this.expand}>
          Details
        </button>
        <Modal
          contentLabel="Notes Modal"
          isOpen={this.state.expanded}
          overlayClassName="modal-backdrop"
          onRequestClose={this.expand}
          shouldCloseOnOverlayClick={true}
        >
          <div class="modal-header">
            <nav className="navbar navbar-static-top">
              <ul className="nav nav-pills nav-settings">
                {this.props.tabs.map((tab,index) => (
                  <div key={index}>
                    <li>
                      <a
                        href="#"
                        onClick={e => this.show(tab.property)}
                        style={{borderColor: 'transparent'}}>
                        {tab.label}
                      </a>
                    </li>
                  </div>
                ))}
              </ul>
            </nav>
            <button
              className="close"
              onClick={this.expand}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            {this.state.currTab === 'notes' && (
              <Notes ticketNumber={this.props.ticketNumber} />
            )}
            {this.state.currTab === 'scheduleEntries' && (
              <ScheduleEntries ticketNumber={this.props.ticketNumber} />
            )}
            {this.state.currTab === 'timeEntries' && (
              <TimeEntries ticketNumber={this.props.ticketNumber} />
            )}
          </div>
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




