import Modal from 'react-modal';
import React, { Component } from 'react';
import ScheduleEntries from './ScheduleEntries';
import TimeEntries from './TimeEntries';
import Notes from './Notes';
import { connect } from 'react-redux';

class DetailsModal extends Component {
  state = { 
    expanded: false,
    currTab: 'notes',
  };

  componentWillMount = () => {
    Modal.setAppElement('body');
  }

  expand = () => {
    const willExpand = !this.state.expanded;
    this.setState({
      ...this.state,
      expanded: willExpand,
    });
  }

  show = (tabName) => {
    this.setState({
      ...this.state,
      currTab: tabName,
    })
  }

  render () {
    return (
      <div>
        <button
          className="btn btn-default glyphicon glyphicon-info-sign"
          title="Ticket Details"
          onClick={this.expand}>
        </button>
        <Modal
          contentLabel="Notes Modal"
          isOpen={this.state.expanded}
          overlayClassName={`modal-overlay ${this.props.theme}-modal`}
          onRequestClose={this.expand}
          shouldCloseOnOverlayClick={true}
        >
          <nav className="navbar navbar-static-top">
            <ul className="nav modal-navbar-settings">
              {this.props.tabs.map((tab,index) => (
                <li key={index}>
                  <button
                    className="btn btn-modal-nav"
                    title={tab.label}
                    onClick={e => this.show(tab.property)}>
                    {tab.label}
                  </button>
                </li>
              ))}

              <li>
                <button
                  className="btn btn-modal-nav glyphicon glyphicon-remove-circle"
                  title="Close"
                  onClick={this.expand}>
                </button>
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

const mapStateToProps = state => ({
  theme: state.app.theme
});

export default connect(mapStateToProps)(DetailsModal);




