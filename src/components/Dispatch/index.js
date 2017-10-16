import './dispatch.css';
import Fields from './Fields';
import JSONPretty from 'react-json-pretty';
import Queue from './Queue';
import React, { Component } from 'react';
import Table from '../Tickets/Table';
import { connect } from 'react-redux';
import { format as formatDate } from 'date-fns';
import { search, dispatch as dispatchTickets } from '../../actions/tickets';

const fields = [
  {
    id: 'memberIdentifier',
    value: '',
    type: 'text',
    required: true,
  },
  {
    id: 'startDate',
    value: formatDate(new Date(), 'YYYY-MM-DD'),
    type: 'text',
    required: true,
  },
  {
    id: 'endDate',
    value: formatDate(new Date(), 'YYYY-MM-DD'),
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
    required: true,
  },
  {
    id: 'startHour',
    value: 9,
    type: 'number',
    required: true,
  },
  {
    id: 'daily',
    value: 8,
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
      'ignore',
      'skip',
      'subtract',
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
    value: false,
    type: 'boolean',
  },
  {
    id: 'tickets',
    type: 'tickets',
    value: [],
    required: true,
  }
];

class Dispatch extends Component {
  constructor() {
    super();

    this.state = {
      fields,
    };

    this.columns = this.columns.bind(this);
    this.dispatch = this.dispatch.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.onTicketSelect = this.onTicketSelect.bind(this);
    this.resetTickets = this.resetTickets.bind(this);
    this.search = this.search.bind(this);
    this.selectedTickets = this.selectedTickets.bind(this);
    this.setTicketHours = this.setTicketHours.bind(this);
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
              return (
                <button
                  type="button"
                  onClick={e => onChange(rowData.id)}
                >
                  Add/remove
                </button>
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

    return tickets.value.map(ticket => ticket.id).map(id => {
      return this.props.tickets.flattened.find(ticket => ticket.id == id);
    });
  }

  resetTickets() {
    this.setState({
      fields: this.state.fields.map(field => {
        if (field.id === 'tickets') {
          return {
            ...field,
            value: [],
          };
        }

        return field;
      }),
    });
  }

  onTicketSelect(id) {
    const selectedIds = this.selectedTickets().map(ticket => ticket.id);
    if (selectedIds.indexOf(id) === -1) {
      // Adding a ticket
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
      // Removing a ticket
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

  onFieldChange(id, type, e) {
    let { value } = e.target;
    if (type === 'boolean') {
      value = e.target.checked;
    }

    this.setState({
      fields: this.state.fields.map(field => {
        if (field.id === id) {
          return {
            ...field,
            value,
          };
        }

        return field;
      }),
    });
  }

  setTicketHours(id, hours) {
    this.setState({
      fields: this.state.fields.map(field => {
        if (field.id === 'tickets') {
          return {
            ...field,
            value: field.value.map(ticket => {
              if (ticket.id === id) {
                return {
                  ...ticket,
                  hours,
                };
              }

              return ticket;
            }),
          };
        }

        return field;
      }),
    });
  }

  dispatch() {
    const params = Object.assign(...this.state.fields.map(field => (
      { [field.id]: field.value }
    )));

    this.props.dispatch(dispatchTickets({ params }));
  }

  render() {
    const { inProgress, response } = this.props.tickets.dispatching;

    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Dispatch Center</h4>
          </div>
        </div>
        <div className="col-sm-12">
          <div className="panel-uc panel panel-default">
            <div className="panel-body">
              <header className="dispatch-header">
                <form>
                  <Fields
                    fields={this.state.fields}
                    onChange={this.onFieldChange}
                  />
                  <button
                    className="btn btn-primary"
                    disabled={inProgress}
                    onClick={this.dispatch}
                    type="button"
                  >
                    {inProgress ? 'Submitting…' : 'Submit'}
                  </button>
                </form>
                {response != null && (
                  <JSONPretty
                    className="dispatch-response"
                    id="dispatch-response"
                    json={response}
                    style={{ marginTop: '20px' }}
                  />
                )}
              </header>
            </div>
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
