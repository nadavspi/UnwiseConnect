import React from 'react';
import ItemForm from './Form';
import PropTypes from 'prop-types';

class Item extends React.Component {
	constructor(){
		super();

		this.onEdit = this.onEdit.bind(this);
		this.onDelete = this.onDelete.bind(this);
			
    this.state = {
      isEditing: false,
    };
	}

	onEdit(){
    this.setState({ isEditing: true });
	}

	onDelete(){
		this.props.onDelete(this.props.item.itemId);
	}

	render() {
		return (
			<div>
				<h3>Item/Task(ID): {this.props.item.summary}</h3>
				<ul> 
					<li>Summary: {this.props.item.summary}</li>
					<li>Phase: {this.props.item.phase}</li>
					<li>Feature: {this.props.item.feature}</li>
					<h3>Budget Hours</h3>
					<ul>
						<li>Phase: {this.props.item.budgetHours.column}</li>
						<li>Hours: {this.props.item.budgetHours.value}</li>
					</ul>
					<h3>Descriptions</h3>
					<ul>
						<li>
							Workplan: {this.props.item.descriptions.workplan}
						</li>
						<li>
							Budget: {this.props.item.descriptions.budget}
						</li>
						<li>
							Assumptions: {this.props.item.descriptions.assumptions}
						</li>  
						<li>
							Exclusions: {this.props.item.descriptions.exclusions}
						</li>
					</ul>
					<li>Tags: {this.props.item.tags}</li>
				</ul>
				<button onClick={this.onEdit} className="btn btn-primary">Edit Item</button>
				<button onClick={this.onDelete} className="btn btn-primary">Delete Item</button>
        {this.state.isEditing && (
          <ItemForm 
            item={this.props.item}
          />
        )}
			</div> 
		)
	}
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
}



export default Item;
