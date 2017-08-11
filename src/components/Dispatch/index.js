import Fields from './Fields';
import React, { Component } from 'react';
import Table from '../Tickets/Table';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { search } from '../../actions/tickets';

class Dispatch extends Component {
  constructor() {
    super();

    this.state = {
      fields: [
        {
          id: 'memberIdentifier',
          value: '',
          type: 'text',
          required: true,
        },
        {
          id: 'startDate',
          value: '2017-08-09',
          type: 'text',
          required: true,
        },
        {
          id: 'endDate',
          value: '2017-08-10',
          type: 'text',
          required: false,
        },
        {
          id: 'timezone',
          values: [
            'America/New_York',
            'America/Los_Angeles',
          ],
          value: 'America/New_York',
          type: 'select',
          require: true,
        },
        {
          id: 'startHour',
          value: 9,
          type: 'number',
          require: true,
        },
        {
          id: 'daily',
          value: 9,
          type: 'number',
          required: true,
        },
        {
          id: 'capTotalHours',
          value: undefined,
          type: 'number',
          required: false,
        },
        {
          id: 'skipByStatus',
          value: true,
          type: 'boolean',
        },
        {
          id: 'skipDuplicateMode',
          value: 'subtract',
          values: [
            'subtract',
            'skip',
          ],
          type: 'select',
          required: false,
        },
        {
          id: 'setAssigned',
          value: true,
          type: 'boolean',
        },
        {
          id: 'dry',
          value: true,
          type: 'boolean',
        },
        {
          id: 'tickets',
          type: 'tickets',
          value: [
            { id: "343893" },
            { id: "343899" },
          ],
          required: true,
        }
      ]
    };

    this.search = this.search.bind(this);
  }

  search(query, incremental) {
    let nextQuery = query;
    if (incremental) {
      nextQuery = {
        ...this.props.tickets.query,
        ...query,
      };
    }

    this.props.dispatch(search(nextQuery));
  }

  render() {
    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Dispatch Center</h4>
          </div>
          <div className="panel-body">
            <Fields 
              fields={this.state.fields} 
              onChange={(e) => console.log(e.target.value)}
            />
            {this.props.tickets.flattened.length > 0 && (
              <Table
                query={this.props.tickets.query}
                search={this.search}
                tickets={this.props.tickets.flattened}
                columns={[
                  {
                    property: 'company.name',
                    header: {
                      label: 'Company',
                    },
                    visible: true,
                  },
                  {
                    property: 'project.name',
                    header: {
                      label: 'Project',
                    },
                    visible: true,
                  },
                  {
                    property: 'id',
                    header: {
                      label: 'ID',
                    },
                    visible: true,
                  },
                  {
                    property: 'phase.name',
                      header: {
                        label: 'Phase',
                      },
                      visible: false,
                  },
                  {
                    property: 'summary',
                    header: {
                      label: 'Name',
                    },
                    visible: true,
                  },
                ]}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  tickets: state.tickets,
});


export default connect(mapStateToProps)(Dispatch);
