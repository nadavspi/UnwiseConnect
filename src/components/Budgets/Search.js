import React from 'react';

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
		if(this.state.field != null && this.state.fitler != null){
			this.props.onFilter(this.state.field.value, this.state.filter);
		}
	}

	onFilterChange(value){
		this.setState({
			filter: value
		})
		console.log(this.state.filter);
		console.log(this.state.field);
		if((this.state.field != null)){
			this.props.onFilter(this.state.field, this.state.filter);
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
				<select 
					value={this.state.field}
					onChange={e => this.onFieldChange(e.target.value)}>

					{fields.map( field => (
						<option value={field.value}>{field.value}
						</option>
					))}
				</select>
				<input
					onChange={e => this.onFilterChange(e.target.value)}
					value={this.state.filter}
				/>
			</div>
		)
	}
}

export default SearchBar;