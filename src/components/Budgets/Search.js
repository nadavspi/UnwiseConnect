import React from 'react';
import Select from 'react-select';

class SearchBar extends React.Component {
	constructor(){
		super();

		this.state={
			field: "summary",
			filter: "",
		};
	
		this.onChange = this.onChange.bind(this);
		this.onSelectChange = this.onSelectChange.bind(this);
	}

	onChange(name, value){
		this.setState({
			[name]: value
		}, () => {this.props.onFilter(this.state.field, this.state.filter)});		
	}

	onSelectChange(value){
		this.setState({
			field: value
		}, () => {this.props.onFilter(this.state.field, this.state.filter)});		
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
					value={this.state.field}
					options={fields}
					onChange={this.onSelectChange}
				/>
				<input
					value={this.state.filter}
					onChange={e => this.onChange("filter",e.target.value)}
				/>
			</div>
		)
	}
}

export default SearchBar;