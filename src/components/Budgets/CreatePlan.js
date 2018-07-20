import Fields from '../Dispatch/Fields';
import Select from 'react-select';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';
import { createPlan } from '../../actions/budgets';

class CreatePlan extends Component {
  constructor() {
    super();

    this.state = {
      parents: {},
      children: {},
    };

    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
  }

  onChangeField(id, type, e) {   
    const field = this.props.flags[id];

    if(field.isParent) {
      const value = !this.state.parents[field.property];
      this.setState({
        ...this.state,
        parents: {
          ...this.state.parents,
          [field.property]: value,
        },      
      });
      return;
    }

    this.setState({
      ...this.state,
      children: {
        ...this.state.children,
        [field.id]: e.target.value,
      }
    });
  }

  onChangeProject(project) {
    this.setState({
      ...this.state,
      project: project,
    });
  }

  onSubmit(event) {
    event.preventDefault();

    const projectId = this.state.project.value;
    const tags = this.props.query.tags || '';
    const params = {};

    const parents = this.state.parents;
    const children = this.state.children;

    for (const parent in parents) {
      if(parents.hasOwnProperty(parent)) {
        switch (parent) {
          case 'dry':
            params.dry = parents.dry;
            break;
          case 'prefix':
            params.prefix = children.OldPrefix + '=' + children.NewPrefix;
            break;
          case 'sprint':
            params.sprint = children.SprintNumber;
            break;
          case 'site':
            params.site = children.SiteName;
            break;
          default:
            break;
        }}
      }

    const payload = {
      projectId,
      tags,
      params,
    };

    this.props.dispatch(createPlan(payload));
  }

  render () {
    const { inProgress } = this.props.dispatchingPlan;
    const fields = convertToList(this.props.flags).filter(flag => {
      return (!flag.hasParent || this.state.parents[flag.parentProperty])
    }).map(flag => {
      const newFlag = flag;
      // Prevents open children from being left blank
      if(newFlag.hasParent) {
        newFlag.required = true;
      }
      return newFlag;
    });

    return (
      <div>
        <h3>Create Workplan</h3>
        <h4>Flags</h4>
        <form onSubmit={this.onSubmit}>
          <Fields 
            fields={fields}
            onChange={this.onChangeField}
          />
          <h4>Project</h4>
          <Select
            className="select-bar"
            options={this.props.projects}
            onChange={this.onChangeProject}
            required={true}
            value={this.state.project}
          />
          <button
            type="submit"
            className="btn btn-primary">
            {inProgress ? 'Creating...' : 'Create Workplan'}
          </button>
        </form>
      </div>
    );
  }
}

CreatePlan.defaultProps = {
  flags: {
    Dry: {
      id: 'Dry',
      property: 'dry',
      type: 'boolean',
      isParent: true,
    },
    Sprint: {
      id: 'Sprint',
      property: 'sprint',
      type: 'boolean',
      isParent: true,
    },
    SprintNumber: {
      id: 'SprintNumber',
      hasParent: true,
      parentProperty: 'sprint',
      type: 'number',
    },
    Site: {
      id: 'Site',
      property: 'site',
      type: 'boolean',
      isParent: true,
    },
    SiteName: {
      id: 'SiteName',
      hasParent: true,
      parentProperty: 'site',
      type: 'text',
    },
    Prefix: {
      id: 'Prefix',
      property: 'prefix',
      type: 'boolean',
      isParent: true,
    },
    OldPrefix: {
      id: 'OldPrefix',
      hasParent: true,
      parentProperty: 'prefix',
      type: 'text',
    },
    NewPrefix: {
      id: 'NewPrefix',
      hasParent: true,
      parentProperty: 'prefix',
      type: 'text',
    },
  },
};

const mapPropsToState = state => ({
  dispatchingPlan: state.budgets.dispatchingPlan,
  query: state.budgets.query,
  projects: Object.keys(state.tickets.nested).map(projectId => ({
    value: projectId,
    label: state.tickets.nested[projectId][0].project.name,
  })),
});

export default connect(mapPropsToState)(CreatePlan);
