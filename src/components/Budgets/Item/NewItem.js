import React, { Component } from 'react';

export default class NewItem extends Component {
	constructor(props) {
		super(props);
		this.setItemValues = this.setItemValues.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

		this.state = {};  
	}

	setItemValues(){
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
      [name]: value,
    });
	}
	
	handleSubmit(event){
		event.preventDefault();
		const newItem = {
			summary: this.state.summary,
			phase: this.state.phase,
			feature: this.state.feature,
			budgetHours: {
				column: this.state.budgetColumn,
				value: this.state.budgetValue,
			},
			descriptions: {
				workplan: [ 
					this.state.workplan
				],
				budget: [ 
					this.state.budget
				],
				assumptions: [ 
					this.state.assumptions
				],
				exclusions: [ 
					this.state.exclusions
				],

			},
			tags: this.state.tags
		};
		this.props.onSubmit(newItem);
	}

	render() {
    const fields = [
      {
        name: 'summary',
        label: 'Summary',
        type: 'text',
      },
      {
        name: 'phase',
        label: 'Phase',
        type: 'text',
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
        label: 'Workplan',
        type: 'text',
      },
      {
        name: 'budget',
        label: 'Budget',
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
      },{
        name: 'tags',
        label: 'Tags',
        type: 'text',
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
                  value={this.props.editItem[field.name]}
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
