import React, { Component } from 'react';
import nanoid from 'nanoid';

export default class ItemForm extends Component {
	constructor(props) {
		super(props);

    this.state = {
      item: props.item,
    };  

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleChange(name, value) {
    this.setState({ 
      item: {
        ...this.state.item,
        [name]: value,
      },
    });
	}
	
	handleSubmit(event){
		event.preventDefault();

    let item = this.state.item;

    item.budgetHours.column = item.column;
    item.budgetHours.value = item.value;

    item.descriptions.workplan = item.workplan;
    item.descriptions.assumptions = item.assumptions;
    item.descriptions.exclusions = item.exclusions;
    item.descriptions.budget = item.budget;

    // item: {
    //   item,
    //   [group]: {
    //     [name]: item[name],
    //   }
    // }
  
		this.props.onSubmit(this.state.item);
	}

	render() {
    const fields = [
      {
        name: 'summary',
        label: 'Summary',
        type: 'text',
        required: true,
      },
      {
        name: 'phase',
        label: 'Phase',
        type: 'text',
        required: true,
      },
      {
        name: 'feature',
        label: 'Feature',
        type: 'text',
      },
      {
        name: 'column',
        label: 'Team',
        type: 'text',
        group: 'budgetHours',
      },
      {
        name: 'value',
        label: 'Hours',
        type: 'number',
        group: 'budgetHours',
      },
      {
        name: 'workplan',
        label: 'Workplan description',
        type: 'text',
        group: 'description',
        required: true,
      },
      {
        name: 'budget',
        label: 'Budget description',
        type: 'text',
        group: 'description',
      },
      {
        name: 'assumptions',
        label: 'Assumptions',
        type: 'text',
        group: 'description',
      },
      {
        name: 'exclusions',
        label: 'Exclusions',
        type: 'text',
        group: 'description',
      },
      {
        name: 'tags',
        label: 'Tags',
        type: 'text',
        required: true,
      },
    ];

    const submitBtnLabel = this.props.isEditing ? 'Save Edit' : 'Add Item';

		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div className="input-group input-group-sm">						
            {fields.map(field => (
              <div>
                <label htmlFor={field.name}>{field.label}</label>
                <input 
                  onChange={e => this.handleChange(field.name, e.target.value)}
                  type={field.type}
                  value={this.state.item[field.name]}
                  required={field.required}
                />
              </div>
            ))}
						<button type="submit" className="btn btn-primary">{submitBtnLabel}</button>
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
  },
  isEditing: false,
};
