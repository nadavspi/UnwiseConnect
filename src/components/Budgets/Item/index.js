import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';

class Item extends React.Component {
  constructor(){
    super();

    this.state = {
      isEditing: false,
    };
    
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);     
  }

  onFormSubmit(item){
    this.setState({ isEditing: false, });
    this.props.onEdit(item);
  }

  onEdit(){
    this.setState({ isEditing: true });
  }

  onDelete(){
    this.props.onDelete(this.props.item.id);
  }

  render() {
    const item = this.props.item;

    let fixedBudget;
    if(item.hasOwnProperty('t&m')) {
      fixedBudget = item['t&m'].toString();
    } 

    return (
      <div>
        <h3>Item/Task: {item.summary}</h3>
        <ul> 
          <li>Phase: {item.phase}</li>
          <li>Feature: {item.feature}</li>
          <li>T&M: {fixedBudget}</li>
          <h3>Budget Hours</h3>
          <ul>
            <li>Column: {item.budgetHours.column}</li>
            <li>Hours: {item.budgetHours.value}</li>
          </ul>
          <h3>Descriptions</h3>
          <ul>
            <li>
              Workplan: {item.descriptions.workplan}
            </li>
            <li>
              Budget: {item.descriptions.budget}
            </li>
            <li>
              Client Responsibilities: {item.descriptions.clientResponsibilities}
            </li>
            <li>
              Assumptions: {item.descriptions.assumptions}
            </li>  
            <li>
              Exclusions: {item.descriptions.exclusions}
            </li>
          </ul>
          <li>Tags: {item.tags}</li>
        </ul>
        {this.state.isEditing && (
          <Form 
            item={item}
            isEditing={this.state.isEditing}
            onSubmit={this.onFormSubmit}
          />
        )}
        {!this.state.isEditing && (
          <div>
            <button onClick={this.onEdit} className="btn btn-primary">Edit Item</button>
            <button onClick={this.onDelete} className="btn btn-primary">Delete Item</button>
          </div>
        )}
      </div> 
    )
  }
}

Item.propTypes = {
  item: React.PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
  fields: state.budgets.fields,
});


export default connect(mapStateToProps)(Item);
