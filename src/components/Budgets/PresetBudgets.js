import nanoid from 'nanoid';
import React, { Component } from 'react';
import Select from 'react-select';
import { addPreset, subscribePresets, updatePreset } from '../../actions/budgets';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';

class PresetBudgets extends Component {
  constructor() {
    super();

    this.state = {
      name: '',
      preset: '',
    }
    
    this.onAdd = this.onAdd.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangePreset = this.onChangePreset.bind(this);
    this.onLoad = this.onLoad.bind(this);
    this.onUpdate = this.onUpdate.bind(this);
  }

  componentDidMount() {
    this.props.dispatch(subscribePresets());
  }

  onAdd(e) {
    e.preventDefault();
    const payload = {
      budget: {
        label: this.state.name,
        value: this.props.query,
        id: nanoid(),
      },
    };

    this.props.dispatch(addPreset(payload));

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
    });
  }

  onLoad() {
    if(this.state.preset === null) {
      this.props.search({});
      return;
    }
    this.props.search(this.state.preset.value);
  }

  onUpdate() {
    const payload = {
      preset: {
        label: this.state.preset.label,
        value: this.props.query,
        id: this.state.preset.id,
      }
    };
    this.props.dispatch(updatePreset(payload));
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
          className="btn btn-primary"
          onClick={this.onLoad}>
          Load
        </button><button 
          className="btn btn-primary"
          onClick={this.onUpdate}>
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
  presets: convertToList(state.budgets.presets),
  query: state.budgets.query,
});

export default connect(mapPropsToState)(PresetBudgets);
