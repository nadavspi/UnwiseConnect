import './dispatch.scss';
import * as UserActions from '../../actions/user';
import * as resolve from 'table-resolver';
import * as searchtabular from 'searchtabular';
import Fields from './Fields';
import JSONPretty from 'react-json-pretty';
import Queue from './Queue';
import React, { Component } from 'react';
import Table from '../Tickets/Table';
import arrayMove from 'array-move';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { customField } from '../../config/columns';
import { format as formatDate } from 'date-fns';
import { multiInfix } from '../../helpers/utils';
import { search, dispatch as dispatchTickets } from '../../actions/tickets';
import Summary from '../shared/Summary';
import ToggleProjects from '../Tickets/ToggleProjects';

const fields = [
  {
    id: 'memberIdentifier',
    label: 'Person to dispatch',
    value: '',
    values: (tickets, value) => {
      let resourcePopularity = {};
      if (value) {
        // Needed to account for custom values.
        resourcePopularity[value] = 0;
      }

      tickets.map(ticket => {
        const allResources = (ticket.resources || '') + ',' + (ticket.owner ? ticket.owner.identifier : '');
        const splitResources = allResources.split(/[ ]*,[ ]*/);
        return splitResources.map(resource => {
          if (resource !== '') {
            resourcePopularity[resource] = (resourcePopularity[resource] || 0) + 1;
          }
          return resource;
        });
      });

      let resourceList = Object.keys(resourcePopularity);
      resourceList.sort((a, b) => {
        // Popularity, descending.
        const popularity = resourcePopularity[b] - resourcePopularity[a];
        if (popularity === 0) {
          // Alphabetical, ascending.
          return a.localeCompare(b);
        }
        return popularity;
      });
      return resourceList;
    },
    type: 'react-select',
    required: true,
    allowCustom: true,
  },
  {
    id: 'Sprint',
    label: 'Sprint',
    type: 'text',
    value: '',
    isCustomField: true,
  },
  {
    id: 'startDate',
    label: 'Start date',
    value: formatDate(new Date(), 'yyyy-MM-dd'),
    type: 'date',
    required: true,
  },
  {
    id: 'endDate',
    label: 'End date',
    value: '',
    type: 'date',
    required: false,
  },
  {
    id: 'timezone',
    label: 'Timezone',
    values: [
      'America/New_York',
      'America/Phoenix',
      'America/Los_Angeles',
      'America/Chicago',
      'Europe/Kiev',
      'Europe/Moscow',
      'Asia/Kolkata',
    ],
    value: 'America/New_York',
    type: 'select',
    required: true,
  },
  {
    id: 'startHour',
    label: 'Start hour',
    value: 9,
    type: 'number',
    required: true,
  },
  {
    id: 'daily',
    label: 'Maximum daily hours',
    value: 8,
    type: 'number',
    required: true,
  },
  {
    id: 'capTotalHours',
    label: 'Total hours cap',
    value: undefined,
    type: 'number',
    required: false,
  },
  {
    id: 'skipByStatus',
    label: 'Skip tickets by status',
    value: true,
    type: 'boolean',
  },
  {
    id: 'skipDuplicateMode',
    label: 'Skip duplicate mode',
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
    label: 'Set Assigned ticket status',
    value: true,
    type: 'boolean',
  },
  {
    id: 'dry',
    label: 'Dry run',
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
  state = {
    fields, 
  };

  toggleColumn = (payload) => {
    this.props.dispatch(UserActions.toggleColumn(payload));
  }

  columns = (onChange) => {
    return [
      {
        // Using a random property because it's easier than adding a new one
        // to all the rows
        property: 'mobileGuid',
        header: {
          label: 'Action',
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
                  { this.isTicketSelected(rowData.id) ? 'Remove' : 'Add' }
                </button>
              );
            },
          ]
        },
        filterType: 'custom',
        customFilter: (
          <button
            type="button"
            onClick={this.addFiltered}
          >
            Add All
          </button>
        ),
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
        property: 'phase.path',
        header: {
          label: 'Phase',
        },
        visible: true,
        cell: {
          resolve: value => `(${value})`,
          formatters: [
            (value, { rowData }) => {
              const { name, path } = rowData.phase;
              return (
                <span title={path}>
                  {name}
                </span>
              );
            }
          ]
        },
      },
      {
        property: 'customFields',
        header: {
          label: 'Sprint',
        },
        cell: {
          ...customField('Sprint'),
        },
      },
      {
        property: 'impact',
        header: {
          label: 'Fixer',
        },
        cell: {
          ...customField('Fixer'),
        },
      },
      {
        property: 'summary',
        header: {
          label: 'Name',
        },
        cell: {
          resolve: value => value,
          formatters: [
            (value, { rowData }) => (<Summary company={rowData.company} summary={rowData.summary} value={value}/>)
          ]
        },
        visible: true,
      },
      {
        property: 'status.name',
        header: {
          label: 'Status',
        },
        visible: true,
        filterType: 'dropdown',
        extraOptions: [
          Table.makeAllOpenOption,
          Table.makeAllCompleteOption,
        ],
      },
    ] 
  }

  search = (query, incremental) => {
    let nextQuery = query;
    if (incremental) {
      nextQuery = {
        ...this.props.tickets.query,
        ...query,
      };
    }

    this.props.dispatch(search(nextQuery));
  }

  selectedTicketIds = () => {
    const tickets = this.state.fields.find(field => field.id === 'tickets');
    if (!tickets) {
      console.warn('No tickets field found.');
      return [];
    }

    return tickets.value.map(ticket => ticket.id);
  }

  selectedTickets = () => {
    return this.selectedTicketIds().map(id => {
      return this.props.tickets.flattened.find(ticket => String(ticket.id) === String(id));
    });
  }

  isTicketSelected = (ticketId) => {
    return this.selectedTicketIds().includes(ticketId);
  }

  resetTickets = () => {
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

  onTicketSelect = (id) => {
    const selectedIds = this.selectedTicketIds();
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

  moveTicket = (ticketId, prevIndex, nextIndex) => {
    this.setState({
      fields: this.state.fields.map(field => {
        if (field.id === 'tickets') {
          return {
            ...field,
            value: arrayMove(field.value, prevIndex, nextIndex),
          };
        }

        return field;
      }),
    });
  }

  addFiltered = (e) => {
    const columns = this.columns(this.onTicketSelect);
    const { query } = this.props.tickets;
    const tickets = this.props.tickets.flattened;

    const rows = resolve.resolve({
      columns,
      method: extra => compose(
        resolve.byFunction('cell.resolve')(extra),
        resolve.nested(extra),
      )
    })(tickets);
    const searchExecutor = searchtabular.multipleColumns({ columns, query, strategy: multiInfix });
    const filteredTickets = searchExecutor(rows);

    const currentSelected = this.selectedTicketIds();
    let newIdObjects = [];
    for (let ticket of filteredTickets) {
      if (!currentSelected.includes(ticket.id)) {
        newIdObjects.push({ id: ticket.id });
      }
    }

    if (newIdObjects.length) {
      // Adding a ticket
      this.setState({
        fields: this.state.fields.map(field => {
          if (field.id === 'tickets') {
            return {
              ...field,
              value: [
                ...field.value,
                ...newIdObjects,
              ],
            };
          }

          return field;
        }),
      });
    }
  }

  onFieldChange = (id, type, e) => {
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

  setTicketHours = (id, hours) => {
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

  dispatch = () => {
    const params = Object.assign(...this.state.fields.map(field => {
      if (field.isCustomField) {
        // We'll handle custom fields separately
        return false;
      }

      return {
        [field.id]: field.value,
      };
    }).filter(Boolean));

    const customFields = this.state.fields.filter(field => field.isCustomField).map(field => ({
      caption: field.id,
      value: field.value,
    }));

    this.props.dispatch(dispatchTickets({ 
      params: { 
        ...params,
        customFields,
      },
    }));
  }

  render() {
    const { inProgress, response } = this.props.tickets.dispatching;

    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Dispatch Center</h4>
            <div className="dispatch-ticket-update">
              <ToggleProjects />
            </div>
          </div>
          <div className="panel-body">
            <header className="dispatch-header">
              <form>
                <Fields 
                  fields={this.state.fields}
                  tickets={this.props.tickets.flattened}
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
            <Queue 
              moveTicket={this.moveTicket}
              onRemove={this.onTicketSelect}
              overrideHours={this.state.fields.find(field => field.id === 'tickets').value}
              resetTickets={this.resetTickets}
              selectedTickets={this.selectedTickets()} 
              setTicketHours={this.setTicketHours}
            />
            {this.props.tickets.flattened.length > 0 && (
              <Table
                id="table-dispatch-tickets"
                columns={this.columns(this.onTicketSelect)}
                query={this.props.tickets.query}
                search={this.search}
                tickets={this.props.tickets.flattened}
                selectedTicketIds={this.selectedTicketIds()}
                toggleColumn={this.toggleColumn}
                userColumns={this.props.userColumns}
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
  userColumns: state.user.columns,
});


export default connect(mapStateToProps)(Dispatch);
