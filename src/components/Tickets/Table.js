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

function paginate({ page, perPage }) {
  return (rows = []) => {
    // adapt to zero indexed logic
    const p = page - 1 || 0;

    const amountOfPages = Math.ceil(rows.length / perPage);
    const startPage = p < amountOfPages ? p : 0;

    return {
      amount: amountOfPages,
      rows: rows.slice(startPage * perPage, startPage * perPage + perPage),
      page: startPage,
    };
  };
}

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

  onBodyRow = (row) => {
    const actualHours = row.actualHours;
    const budgetHours = row.budgetHours;
    let rowClass = null;

    if (typeof budgetHours === 'undefined' || typeof actualHours === 'undefined') {
      return;
    }

    if (actualHours > budgetHours) {
      // over 100% of the budget is already used
      rowClass = 'ticket--overbudget';
    } else if (actualHours / budgetHours >= .9) {
      // over 90% of the budget is already used
      rowClass = 'ticket--nearbudget';
    }

    return {
      className: rowClass
    };
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
    const paginated = compose(
      paginate(pagination),
      searchExecutor
    )(rows);
    const visibleColumns = columns.filter(column => this.props.userColumns.includes(column.property));
    const TableFooter = ({ columns, rows }) => {
      return (
        <tfoot className="table-bordered__foot">
          <tr>
            {columns.map((column, i) =>
              <td key={`footer-${i}`} className="col--budget">{column.showTotals ? this.footerSum(paginatedAll, column.property) : null}</td>
            )}
          </tr>
        </tfoot>
      );
    };

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
        <Table.Provider
          className="table table-striped table-bordered"
          columns={visibleColumns}
        >
          <Table.Header>
            <SearchColumns
              query={query}
              columns={visibleColumns}
              onChange={this.search}
              rows={rows}
            />
          </Table.Header>
          <Table.Body rowKey="id" rows={paginated.rows} onRow={this.onBodyRow} />
          <TableFooter columns={visibleColumns} rows={paginated.rows} />
        </Table.Provider>
        {paginated.amount > 1 && (
          <Pagination
            changePage={this.changePage}
            paginated={paginated}
            pagination={pagination}
            topHtmlId={this.getHtmlId()}
          />
        )}
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
    },
    {
      property: 'project.name',
      header: {
        label: 'Project',
      },
    },
    {
      property: 'id',
      header: {
        label: 'ID',
      },
      cell: {
        formatters: [
          (value) => {
            return (
              <div>
                <TicketLink ticketNumber={value} />
                <DetailsModal ticketNumber={value} />
              </div>
            );
          }
        ]
      },
      props: {
        style: {
          width: 115,
        },
      },
    },
    {
      // Using a random property because it's easier than adding a new one
      // to all the rows
      property: 'mobileGuid',
      header: {
        label: 'Toggl',
      },
      cell: {
        resolve: value => `(${value})`,
        formatters: [
          (value, { rowData }) => {
            return (
              <StartTimer ticket={rowData} />
            );
          }
        ]
      },
      props: {
        style: {
          width: 60,
        },
      },
      filterType: 'none',
    },
    {
      property: 'phase.path',
      header: {
        label: 'Phase',
      },
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
      cell: {
        formatters: [
          (value, { rowData }) => (<Summary summary={rowData.summary} company={rowData.company} value={value}/>)
        ],
      },
      props: {
        style: {
          width: 300,
        },
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
      props: {
        style: {
          width: 100,
        },
      },
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
      props: {
        style: {
          width: 100,
        },
      },
    },
    {
      property: 'budgetHours',
      header: {
        label: 'Budget Hours',
      },
      props: {
        className: 'col--budget',
        style: {
          width: 75,
          textAlign: 'right',
        },
      },
      showTotals: true,
    },
    {
      property: 'actualHours',
      header: {
        label: 'Actual Hours',
      },
      props: {
        className: 'col--budget',
        style: {
          width: 75,
          textAlign: 'right',
        },
      },
      showTotals: true,
    },
    {
      property: 'status.name',
      header: {
        label: 'Status',
      },
      props: {
        style: {
          width: 200,
        },
      },
      filterType: 'dropdown',
      extraOptions: [
        TicketsTable.makeAllOpenOption,
        TicketsTable.makeAllCompleteOption,
      ],
      cell: {
        formatters: [
          (value, { rowData }) => {
            return (
              <UpdateStatus 
                projectId={rowData.project.id}
                ticket={rowData.id} 
                value={value}
              />
            );
          }
        ],
      },
    },
    {
      property: 'billTime',
      header: {
        label: 'Billable',
      },
    },
    {
      property: 'resources',
      header: {
        label: 'Assigned',
      },
    },
  ],
};
