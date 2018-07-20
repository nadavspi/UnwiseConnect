import React, { Component } from 'react';
import Select from 'react-select';
import { connect } from 'react-redux';

class PresetBudgets extends Component {
  render () {
    return (
      <div>
        <h3>Load Budget</h3>
        <label>Load:</label>
        <Select 
          className="select-bar"
          // options={this.props.presets}
        />
        <button className="btn btn-primary">Update</button>
        <label>Save As:</label>
        <input>
        </input>
        <button className="btn btn-primary">Save New</button>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  // presets: state.budgets.presets
  query: state.budgets.query
});

export default connect(mapPropsToState)(PresetBudgets);
