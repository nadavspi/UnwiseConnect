import React from 'react';
import Select from 'react-select';
import { flattenArray } from '../../helpers/utils';

class Search extends React.Component {
	constructor(){
		super();

		this.state = {};

		this.onChange = this.onChange.bind(this);
		this.onFilter = this.onFilter.bind(this);
    this.createOptions = this.createOptions.bind(this);
	}

  createOptions() {
    const tags = new Set(flattenArray(this.props.items.map(item => {
      if (!item.tags) {
        return '';
      }

      return item.tags.split(' ');
    }))); 

    const options = [...tags].map(tag => ({
      value: tag,
      label: tag,
    }));
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
