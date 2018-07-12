import React from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

class Search extends React.Component {
	constructor(){
		super();

		this.state = {};

		this.onChange = this.onChange.bind(this);
		this.onFilter = this.onFilter.bind(this);
	  this.createOptions = this.createOptions.bind(this);
	}

  createOptions() {
  	let tags = [];

  	for (const item in this.props.itemList) {
  		if(this.props.itemList.hasOwnProperty(item)) {
  			const tagGroup = this.props.itemList[item][this.props.column];
  			tags = [...tags, ...tagGroup.split(' ')];
  		}
  	}

  	tags = new Set(tags);

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
		const tagList = this.state.value.map((tag) => (tag.value));

		const query = {
			...this.props.query,
			tags: (tagList.length !== 0) ? tagList : ''
		};

		this.props.onFilter(query);
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

const mapStateToProps = state => ({
	itemList: state.budgets.itemList,
	query: state.budgets.query,
});

export default connect(mapStateToProps)(Search);
