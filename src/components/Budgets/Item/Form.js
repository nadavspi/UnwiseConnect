import React, { Component } from 'react';
import nanoid from 'nanoid';

export default class ItemForm extends Component {
	constructor(props) {
		super(props);
		this.setItemValues = this.setItemValues.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

    this.state = {
      item: props.item,
    };  
	}

  setItemValues() {
		const item = this.props.editItem;
		
		console.log("set item value: " + item.budgetHours.column);

		this.setState({
			  summary: item.summary,
        phase: item.phase,
        feature: item.feature,
        budgetColumn: item.budgetHours.column,
        budgetValue: item.budgetHours.value,
        workplan: item.descriptions.workplan,
        budget: item.descriptions.budget,
        assumptions: item.descriptions.assumptions,
        exclusions: item.descriptions.exclusions,
        tags: item.descriptions.tags,
      });

		console.log("set item value: " + item.feature);		
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
        name: 'budgetColumn',
        label: 'Team',
        type: 'text',
      },
      {
        name: 'budgetValue',
        label: 'Hours',
        type: 'number',
      },
      {
        name: 'workplan',
        label: 'Workplan description',
        type: 'text',
        required: true,
      },
      {
        name: 'budget',
        label: 'Budget description',
        type: 'text',
      },
      {
        name: 'assumptions',
        label: 'Assumptions',
        type: 'text',
      },
      {
        name: 'exclusions',
        label: 'Exclusions',
        type: 'text',
      },
      {
        name: 'tags',
        label: 'Tags',
        type: 'text',
        required: true,
      },
    ];

    const submitBtnLabel = this.props.activeEdit ? 'Edit Item' : 'Add Item';

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
  },
};
