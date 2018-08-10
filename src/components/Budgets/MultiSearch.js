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
    let values = [];
    const itemList = this.props.itemList;

    for (const item in itemList) {
      if(itemList.hasOwnProperty(item) && typeof itemList[item][this.props.column] !== 'undefined') {
        const currGroup = itemList[item][this.props.column].toString();
        values = [...values, ...currGroup.split(' ')];
      }
    }

    values = new Set(values);

    const options = [...values].map(value => ({
      value: value,
      label: value,
    }));
    return options;
  }

  onChange(value){
    this.setState({ value }, this.onFilter);
  }
  
  onFilter(){
    const selected = this.state.value.map((option) => (option.value));

    const query = {
      ...this.props.query,
      [this.props.column]: (selected.length !== 0) ? selected : ''
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
