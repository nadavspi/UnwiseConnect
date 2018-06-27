import React from 'react';
import Select from 'react-select';

class SearchBar extends React.Component {
	constructor(){
		super();

		this.state={
			field: null,
			filter: null,
		};

		this.onFieldChange = this.onFieldChange.bind(this);
		this.onFilterChange = this.onFilterChange.bind(this);
	}

	onFieldChange(value){
		this.setState({
			field: value
		});
	}

	onFilterChange(value){
		this.setState({
			filter: value
		})
		if(this.state.field == null){
			
		}
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
					options={fields}
					onChange={this.onFieldChange}
					value={this.state.field}
				/>
				<input
					onChange={e => this.onFilterChange(e.target.value)}
					value={this.state.filter}
				/>
			</div>
		)
	}
}

export default SearchBar;