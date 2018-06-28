import React from 'react';
import Select from 'react-select';

class SearchBar extends React.Component {
	constructor(){
		super();
	
		this.onValueChange = this.onValueChange.bind(this);
		this.onFieldChange = this.onFieldChange.bind(this);
	}

	onValueChange(value) {
    this.props.onFilter({
      value
    });
	}

	onFieldChange(field) {
    this.props.onFilter({
      field: field.value
    });
	}

	render(){
		const fields = [
      {
        value: 'summary',
        label: 'Summary',
        type: 'text',
        required: true,
      },
      {
        value: 'phase',
        label: 'Phase',
        type: 'text',
        required: true,
      },
      {
        value: 'feature',
        label: 'Feature',
        type: 'text',
      },
      {
        value: 'column',
        label: 'Column',
        type: 'text',
        group: 'budgetHours',
      },
      {
        value: 'value',
        label: 'Hours',
        type: 'number',
        group: 'budgetHours',
      },
      {
        value: 'workplan',
        label: 'Workplan description',
        type: 'text',
        group: 'description',
        required: true,
      },
      {
        value: 'budget',
        label: 'Budget description',
        type: 'text',
        group: 'description',
      },
      {
        value: 'assumptions',
        label: 'Assumptions',
        type: 'text',
        group: 'description',
      },
      {
        value: 'exclusions',
        label: 'Exclusions',
        type: 'text',
        group: 'description',
      },
      {
        value: 'tags',
        label: 'Tags',
        type: 'text',
        required: true,
      },
    ];

		return (
			<div className="section">
				<h2>SearchBar</h2>
				<Select 
					name="field"
					value={this.props.filter.field}
					options={fields}
					onChange={this.onFieldChange}
				/>
				<input
					value={this.props.filter.value}
					onChange={e => this.onValueChange(e.target.value)}
				/>
			</div>
		)
	}
}

export default SearchBar;
