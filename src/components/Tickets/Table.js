import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as search from 'searchtabular';
import DetailsModal from './DetailsModal';
import Pagination from './Pagination';
import React from 'react';
import SearchColumns from './SearchColumns';
import StartTimer from './StartTimer';
import TicketLink from './TicketLink';
import UpdateStatus from './UpdateStatus';
import VisibilityToggles from 'react-visibility-toggles';
import { compose } from 'redux';
import { customField } from '../../config/columns';
import { multiInfix } from '../../helpers/utils';
import Summary from "../shared/Summary";
import EditTicketForm from '../Tickets/EditTicketForm'

function difference(arr1, arr2) {
  return arr1.filter(val => !arr2.includes(val));
}

export default class TicketsTable extends React.Component {
  state = {
    searchColumn: 'all',
    pagination: {
      page: 1,
      perPage: 20,
    },
    rows: [],
    columns: this.props.columns,
    showEmptyColumnsAlert: false,
  };

  componentDidMount = () => {
    this.prepareRows();

    setTimeout(() => {
      if (!this.props.userColumns.length) {
        this.setState({
          showEmptyColumnsAlert: true
        });
      }
    }, 1000);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userColumns.length && !this.props.userColumns.length) {
      this.setState({
        showEmptyColumnsAlert: true
      });
    }

    if (!prevProps.userColumns.length && this.props.userColumns.length) {
      this.setState({
        showEmptyColumnsAlert: false
      });
    }
  }

  componentWillReceiveProps = (nextProps) => {
    // Using a string compare to reduce re-rendering.
    let selectedChanged = (this.props.selectedTicketIds || []).join(',') !== (nextProps.selectedTicketIds || []).join(',');
    if (selectedChanged) {
      let rows = this.state.rows.map(row => {
        return {
          ...row,
          selected: nextProps.selectedTicketIds.includes(row.id),
        };
      });

      this.setState({
        rows,
      });
    } else {
      this.prepareRows(nextProps.tickets);
    }
  }

  prepareRows = (tickets = this.props.tickets) => {
    const { columns } = this.state;

    this.setState({
      rows: resolve.resolve({
        columns,
        method: extra => compose(
          resolve.byFunction('cell.resolve')(extra),
          resolve.nested(extra),
        )
      })(tickets),
    });
  }

  changePage = (page) => {
    this.setState({
      pagination: {
        ...this.state.pagination,
        page,
      },
    });
  }

  search = (query) => {
    this.props.search(query);
  }

  toggleColumn = ({ column }) => {
    const columnName = column.property;
    this.props.toggleColumn({ columnName });
  }

  footerSum = (rows, property) => {
    let sum = 0;

    sum = rows.map(row => row[property]).reduce((a, b) => {
      if (!b) {
        return a;
      }

      return a + b;
    }, 0);

    return Math.round(sum * 100) / 100;
  }

  getHtmlId = () => {
    let htmlId = this.props.id || this.state.htmlId;
    if (!htmlId) {
      htmlId = 'table-' + Math.random().toString(36).substr(2, 9);
      this.setState({ htmlId });
    }
    return htmlId;
  }

  render() {
    const { query } = this.props;
    const { columns, pagination, rows } = this.state;
    const searchExecutor = search.multipleColumns({ columns, query, strategy: multiInfix });
    const paginatedAll = compose(searchExecutor)(rows);
    const visibleColumns = columns.filter(column => this.props.userColumns.includes(column.property));

    return (
      <div id={this.getHtmlId()}>
        <VisibilityToggles
          className="panel-body visibility-toggles"
          isVisible={({ column }) => this.props.userColumns.includes(column.property)}
          columns={columns}
          onToggleColumn={this.toggleColumn}
        />
        {this.state.showEmptyColumnsAlert && (
          <div className="alert alert-warning">
            You haven't selected any columns above. That's why you don't see any tickets.
          </div>
        )}
        <SearchColumns
          columns={visibleColumns}
          footerSum={this.footerSum}
          onChange={this.search}
          paginatedAll={paginatedAll}
          query={query}
          rows={rows}
          ticketCount={this.props.tickets.length}
        />
      </div>
    );
  }
}

TicketsTable.closedTicketStatuses = [
  'Canceled',
  'Client UAT',
  'Closed',
  'Completed',
  'Passed Code Review',
  'Pending Code Review',
  'Ready for QA',
  'Ready for QA/Review',
];

function makeUnselectedOption(option, currentValues) {
  if (Array.isArray(currentValues)) {
    // If there are no unselected values, skip the option.
    if (!difference(option.value, currentValues).length) {
      return null;
    }
  }

  return option;
}

TicketsTable.makeAllOpenOption = (column, rowValues, currentValues) => {
  const closedValues = TicketsTable.closedTicketStatuses;
  const openValues = difference(rowValues, closedValues);

  return makeUnselectedOption({
    label: 'All Open',
    value: openValues,
  }, currentValues);
};

TicketsTable.makeAllCompleteOption = (column, rowValues, currentValues) => {
  const closedValues = TicketsTable.closedTicketStatuses;

  return makeUnselectedOption({
    label: 'All Complete',
    value: closedValues,
  }, currentValues);
};

TicketsTable.defaultProps = {
  columns: [
    {
      property: 'company.name',
      header: {
        label: 'Company',
      },
      width: 95,
    },
    {
      property: 'project.name',
      header: {
        label: 'Project',
      },
      width: 95,
    },
    {
      property: 'id',
      header: {
        label: 'ID',
      },
      formatter: (cell, row) => <TicketLink ticketNumber={row.id} />,
      width: 75,
    },
    {
      property: 'phase.path',
      header: {
        label: 'Phase',
      },
      width: 100,
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
      property: 'summary',
      header: {
        label: 'Name',
      },
      width: 180,
    },
    {
      property: 'customFields',
      header: {
        label: 'Sprint',
      },
      cell: {
        ...customField('Sprint'),
      },
      width: 60,
    },
    {
      // Using a random property because it's easier than adding a new one
      // to all the rows
      property: 'impact',
      header: {
        label: 'Fixer',
      },
      cell: {
        ...customField('Fixer'),
      },
      width: 80,
    },
    {
      property: 'budgetHours',
      header: {
        label: 'Budget Hours',
      },
      className: 'col--budget',
      width: 60,
      textAlign: 'right',
      showTotals: true,
    },
    {
      property: 'actualHours',
      header: {
        label: 'Actual Hours',
      },
      className: 'col--budget',
      width: 60,
      textAlign: 'right',
      showTotals: true,
    },
    {
      property: 'status.name',
      header: {
        label: 'Status',
      },
      allowSort: false,
      width: 120,
      filterType: 'dropdown',
      extraOptions: [
        TicketsTable.makeAllOpenOption,
        TicketsTable.makeAllCompleteOption,
      ],
      formatter: (cell, row) => (
        <UpdateStatus 
          projectId={row.projectId}
          ticket={row.id} 
          value={row['status.name']}
        />
      ),
    },
    {
      property: 'billTime',
      header: {
        label: 'Billable',
      },
      width: 80,
    },
    {
      property: 'resources',
      header: {
        label: 'Assigned',
      },
      width: 90,
    },
    {
      property: 'mobileGuid',
      allowSort: false,
      width: 90,
      header: {
        label: 'Actions',
      },
      formatter: (cell, row) => (
        <div className="column-actions">
          <StartTimer ticket={row.id} summary={row.summary} />
          <DetailsModal ticketNumber={row.id} />
          <EditTicketForm ticketNumber={row.id} />
        </div>
      ),
      width: 120,
    },
  ],
};
