import Fields from '../Dispatch/Fields';
import Select from 'react-select';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';

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
    const tags = this.props.query.tags;
    const parents = this.state.parents;
    const children = this.state.children;

    const params = {};

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

    console.log('Creating...');
    console.log('Payload', payload);
  }

  render () {
    const fields = convertToList(this.props.flags).filter(flag => {
      return (!flag.hasParent || this.state.parents[flag.parentProperty])
    }).map(flag => {
      const newFlag = flag;
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
            required={true}
            value={this.state.project}
            options={this.props.testProjects}
            onChange={this.onChangeProject}
          />
          <button
            type="submit"
            className="btn btn-primary">
            Create Workplan
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
  testProjects: [
    {
      value: 13,
      label: 'Firebase Project',
    },
    {
      value: 13,
      label: 'Another Project',
    },
    {
      value: 13,
      label: 'Project M',
    },
  ],
};

const mapPropsToState = state => ({
  query: state.budgets.query,
  projects: state.projects,
});

export default connect(mapPropsToState)(CreatePlan);
