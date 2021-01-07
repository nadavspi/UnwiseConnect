import React, { PureComponent } from 'react';
import Modal from 'react-modal';

class CreateTicketModal extends PureComponent {
  render() {
    return (
      <Modal
        contentLabel="Create Ticket Modal"
        isOpen={this.props.expanded}
        onRequestClose={this.props.toggleCreateTicketForm}
        overlayClassName="modal-overlay ticket-modal"
        shouldCloseOnOverlayClick={true}
      >
        {this.props.children}
      </Modal>
    )
  }
}

export default CreateTicketModal;
