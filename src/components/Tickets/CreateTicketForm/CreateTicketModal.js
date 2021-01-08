import React, { PureComponent } from 'react';
import Modal from 'react-modal';
import { connect } from 'react-redux';

class CreateTicketModal extends PureComponent {
  render() {
    return (
      <Modal
        contentLabel="Create Ticket Modal"
        isOpen={this.props.expanded}
        onRequestClose={this.props.toggleCreateTicketForm}
        overlayClassName={`modal-overlay ticket-modal ${this.props.theme}-modal`}
        shouldCloseOnOverlayClick={true}
      >
        {this.props.children}
      </Modal>
    )
  }
}

const mapStateToProps = state => ({
  theme: state.app.theme
});

export default connect(mapStateToProps)(CreateTicketModal);
