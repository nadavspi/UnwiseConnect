import React from 'react';
import Select from 'react-select';

class SearchBar extends React.Component {
	constructor() {
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

	render() {
		let fields = this.props.fields.map((field) => ({
      ...field,
      value: field.name,
    }));

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
