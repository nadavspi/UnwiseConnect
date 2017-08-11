import Fields from './Fields';
import React, { Component } from 'react';
import Table from '../Tickets/Table';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { search } from '../../actions/tickets';


const fields = [
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
      { id: '343893' },
      { id: '343899' },
      { id: 338406 },
    ],
    required: true,
  }
];

class Dispatch extends Component {
  constructor() {
    super();

    this.state = {
      fields, 
    };

    this.onSelect = this.onSelect.bind(this);
    this.columns = this.columns.bind(this);
    this.search = this.search.bind(this);
    this.selectedTickets = this.selectedTickets.bind(this);
  }

  columns(selectedTickets, onChange) {
    return [
      {
        // Using a random property because it's easier than adding a new one
        // to all the rows
        property: 'mobileGuid',
        header: {
          label: '',
        },
        visible: true,
        cell: {
          resolve: value => value,
          formatters: [
            (value, { rowData }) => {
              console.log({ checked });
              const checked = selectedTickets.indexOf(rowData.id) > -1;
              return (
                <input 
                  checked={checked} 
                  onChange={e => onChange(rowData.id, e.target.checked)}
                  type="checkbox"
                />
              );
            }
          ]
        },
      },
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
        visible: true,
      },
      {
        property: 'summary',
        header: {
          label: 'Name',
        },
        visible: true,
      },
      {
        property: 'status.name',
        header: {
          label: 'Status',
        },
        visible: true,
      },
    ] 
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

  selectedTickets() {
    const tickets = this.state.fields.find(field => field.id === 'tickets');
    if (!tickets) {
      console.warn('No tickets field found.');
      return [];
    }

    return tickets.value.map(ticket => ticket.id);
  }

  onSelect(id, checked) {
    if (checked) {
      this.setState({
        fields: this.state.fields.map(field => {
          if (field.id === 'tickets') {
            return {
              ...field,
              value: [
                ...field.value,
                { id },
              ],
            };
          }

          return field;
        }),
      });
    } else {
      this.setState({
        fields: this.state.fields.map(field => {
          if (field.id === 'tickets') {
            return {
              ...field,
              value: field.value.filter(ticket => ticket.id !== id),
            };
          }

          return field;
        }),
      });
    }
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
            <p>{this.selectedTickets().length} tickets selected.</p>
            {this.props.tickets.flattened.length > 0 && (
              <Table
                columns={this.columns(this.selectedTickets(), this.onSelect)}
                query={this.props.tickets.query}
                search={this.search}
                tickets={this.props.tickets.flattened}
                key={this.selectedTickets().length}
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
