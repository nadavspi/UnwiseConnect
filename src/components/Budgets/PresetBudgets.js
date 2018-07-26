import 'bootstrap/dist/css/bootstrap.css';
import flatten from 'flat';
import nanoid from 'nanoid';
import React, { Component } from 'react';
import Select from 'react-select';
import { addPreset, removePreset, subscribePresets, updatePreset } from '../../actions/budgets';
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
    this.onDelete = this.onDelete.bind(this);
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
        editHistory: [
          {
            date: (new Date()).toString(),
          },
        ],
      },
    };
    this.props.dispatch(addPreset(flatten.unflatten({ ...payload })));

    this.setState({
      ...this.state,
      name: '',
    });
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

  onDelete() {
    if(this.state.preset === null) {
      return;
    }

    const payload = {
      elementId: this.state.preset.id,
    };
    this.props.dispatch(removePreset(payload));

    this.setState({
      ...this.state,
      preset: null,
    });
  }

  onLoad() {
    if(this.state.preset === null) {
      this.props.search({});
      return;
    }
    
    const preset = this.props.presets.filter(preset => preset.id === this.state.preset.id)[0];
    const maintainedProps = this.props.maintainDepth.map((property) => preset.value[property]);
    let query = {...preset.value};
    let newQuery = {};
    
    this.props.maintainDepth.map((property) => {
      query[property] = undefined;
    });

    newQuery = flatten(query);
    this.props.maintainDepth.map((property, index) => {
      newQuery[property] = maintainedProps[index];
    });

    this.props.search(newQuery);
  }

  onUpdate() {
   
    const payload = {
      preset: {
        label: this.state.preset.label,
        value: this.props.query,
        id: this.state.preset.id,
        editHistory: [
          {
            date: new Date().toString(),
          },
          ...convertToList(this.state.preset.editHistory),
        ],
      },
    };
    this.props.dispatch(updatePreset(flatten.unflatten({ ...payload })));
  }

  render () {
    const options = this.props.presets.sort((a,b) => new Date(b.editHistory[0].date) - new Date(a.editHistory[0].date));
    return (
      <div>
        <div>
          <h3>Load Budget</h3>
          <label>Load:</label>
          <Select 
            className="select-bar"
            onChange={this.onChangePreset}
            options={options}
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
          <button 
            className="btn btn-primary" 
            onClick={this.onDelete}>
            Delete
          </button>
        </div>
        <div>
          <form onSubmit={this.onAdd}>
            <label>Save As:</label>
            <input
              onChange={e => this.onChange('name', e.target.value)}
              required={true}
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
      </div>
    );
  }
}

PresetBudgets.defaultProps = {
  maintainDepth: [
    'tags',
  ],
};

const mapPropsToState = state => ({
  presets: convertToList(state.budgets.presets),
  query: state.budgets.query,
});

export default connect(mapPropsToState)(PresetBudgets);
