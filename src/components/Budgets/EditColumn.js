import classnames from 'classnames';
import Form from './Item/Form';
import Modal from 'react-modal';
import React, { Component } from 'react';

class EditColumn extends Component {
  constructor() {
    super();

    this.state = { isEditing: false };

    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.toggleEdit = this.toggleEdit.bind(this);
  }
  
  componentWillMount() {
    Modal.setAppElement('body');
  }

  onDelete() {
    this.props.onDelete(this.props.row.id);
  }

  toggleEdit() {
    this.setState({ isEditing: true });
  }

  onEdit(item) {
    this.setState({ isEditing: false });

    this.props.onEdit(item);
  }

  render() {
    return (
      <div>
        <Modal
          contentLabel="Edit Item Modal"
          isOpen={this.state.isEditing}
          overlayClassName="modal-overlay"
          onRequestClose={this.onEdit}
          shouldCloseOnOverlayClick={true}
        >
          <Form
              item={this.props.row}
              onSubmit={this.onEdit}
              isEditing={this.state.isEditing}
            />
        </Modal>
        <button
          className="btn btn-default"
          onClick={this.toggleEdit}
        >
          Edit
        </button>
        <button
          className="btn btn-default"
          onClick={this.onDelete}
        >
          Delete
        </button>
      </div>
    );
  }
}

export default (EditColumn);
