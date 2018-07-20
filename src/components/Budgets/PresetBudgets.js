import React, { Component } from 'react';
import Select from 'react-select';
import { addBudget } from '../../actions/budgets';
import { connect } from 'react-redux';

class PresetBudgets extends Component {
  constructor() {
    super();

    this.state = {
      name: 'testBudget',
      preset: '',
    }
    
    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangePreset = this.onChangePreset.bind(this);
  }

  onAdd(e) {
    e.preventDefault();
    const payload = {
      name: this.state.name,
      query: this.props.query,
    };

    this.props.dispatch(addBudget(payload));

    this.setState({
      ...this.state,
      name: '',
    })
  }

  onChange(property, value) {
    this.setState({
      ...this.state,
      [property]: value,
    });
  }

  onChangePreset(preset) {
    this.setState({
      ...this.state,
      preset: preset,
    })
  }

  render () {
    return (
      <div>
        <h3>Load Budget</h3>
        <label>Load:</label>
        <Select 
          className="select-bar"
          onChange={this.onChangePreset}
          options={this.props.presets}
          value={this.state.preset}
        />
        <button 
          className="btn btn-primary">
          Update
        </button>
        <form onSubmit={this.onAdd}>
          <label>Save As:</label>
          <input
            onChange={e => this.onChange('name', e.target.value)}
            value={this.state.name}
          >
          </input>
          <button 
            className="btn btn-primary"
            type="submit">
            Save New
          </button>
        </form>
      </div>
    );
  }
}

const mapPropsToState = state => ({
  presets: state.budgets.presets,
  query: state.budgets.query,
});

export default connect(mapPropsToState)(PresetBudgets);
