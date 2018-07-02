import React from 'react';
import Select from 'react-select';

class Search extends React.Component {
	constructor(){
		super();

		this.state = {};

		this.onChange = this.onChange.bind(this);
		this.onFilter = this.onFilter.bind(this);
	}


	createOptions(){
		// separates tags into arrays
		let items = this.props.items.map((item) => 
			item.tags.split(' ')
		);

		let tagList = [];
		let counter = 0;
		
		// flattens arrays to one long array
		for(let i = 0; i < items.length; i++){
			for(let j = 0; j < items[i].length; j++){
				tagList[counter] = (items[i][j]);
				counter++;
			}
		}

		// find unique values for tags
		let options = tagList.filter((item, index) =>
			tagList.indexOf(item) === index
		);

		// add labels and values
		options = options.map((item) => ({
				value: item,
				label: item,
			})
		);

		return options;
	}


	onChange(value){
		this.setState({ value }, this.onFilter);
	}
	
	onFilter(){
		this.props.onFilter(this.state.value);
	}
	
	render() {
		const options = this.createOptions();
		
		return (
			<Select
				multi
				onChange={this.onChange}
				options={options}
				value={this.state.value}
			/>
		);
	}

}

export default Search;
