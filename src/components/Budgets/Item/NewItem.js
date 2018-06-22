import React, { Component } from 'react';

export default class NewItem extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);

    this.state = {};
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
        name: 'phase',
        label: 'Phase',
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
                  value={this.state[field.name]}
                />
              </div>
            ))}
						<div className="input-group-btn">
							<button type="submit" className="btn btn-primary">Add Item</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
