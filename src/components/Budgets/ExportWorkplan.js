import Select from 'react-select';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';

class ExportWorkplan extends Component {
  constructor() {
    super();

    this.state = {};

    this.exportPlan = this.exportPlan.bind(this);
    this.onChangeProject = this.onChangeProject.bind(this);
  }

  exportPlan() {
    console.log('Exporting...');
    console.log('Plan:', this.props.visibleItems);
  }

  onChangeProject(project) {
    this.setState({
      project: project,
    });
  }

  render () {
    return (
      <div>
        <h3>Export Workplan</h3>
          <Select
          />
          <button
          onClick={this.exportPlan}
          className="btn btn-primary">
          Export Workplan
        </button>
      </div>
      );
  }
}

ExportWorkplan.defaultProps = {
  flags: {

  }
};

const mapPropsToState = state => ({
  visibleItems: convertToList(state.budgets.visibleItemList),
  projects: state.projects,
});

export default connect(mapPropsToState)(ExportWorkplan);
