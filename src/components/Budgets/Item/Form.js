import React, { Component } from 'react';
import nanoid from 'nanoid';
import flatten from 'flat';

export default class ItemForm extends Component {
	constructor(props) {
		super(props);

    this.state = {
      item: {
        ...flatten({ ...props.item }, { maxDepth: 2 }),
      },   
    }; 

    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onCancel(){
    this.props.onSubmit(this.props.item);
  }

  onChange(name, value){
    this.setState({ 
      item: {
        ...this.state.item,
        [name]: value,
      },
    });
	}
	
	onSubmit(event){
		event.preventDefault();

    // Unflatten
		this.props.onSubmit(flatten.unflatten({ ...this.state.item }));
    this.setState( ItemForm.defaultProps );
    
    // Focus on the first input
    this.refs[this.props.fields[0].name].focus();
	}

	render() {
    const { fields } = this.props;
    const submitBtnLabel = this.props.isEditing ? 'Save Edit' : 'Add Item';

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="input-group input-group-sm">						
            {fields.map((field) => (
              <div>
                <label htmlFor={field.name}>{field.label}</label>
                <input 
                  ref={field.name}
                  onChange={e => this.onChange(field.name, e.target.value)}
                  type={field.type}
                  value={this.state.item[field.name]}
                  required={field.required}
                  key={field.name}
                />
              </div>
            ))}
						<button type="submit" className="btn btn-primary">{submitBtnLabel}</button>
            {this.props.isEditing && (
              <button onClick={this.onCancel} className="btn btn-primary">Cancel</button>
				    )}
          </div>
				</form>
			</div>
		)
	}
}

ItemForm.defaultProps = {
  item: {
    id: nanoid(),
    summary:  "",
    phase:    "",
    feature:  "",
    budgetHours: { 
      column: "",
      value: 0,
    },
    descriptions: {
      workplan: [],
      budget: [],
      assumptions: [],
      exclusions: [],
    },
    tags: "",

    'budgetHours.column': "",
    'budgetHours.value': 0,
    'descriptions.workplan': [],
    'descriptions.budget': [],
    'descriptions.assumptions': [],
    'descriptions.exclusions': [],  
  },
  isEditing: false,
};
