import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import * as search from 'searchtabular';
import Pagination from './Pagination';
import React from 'react';
import Search from 'reactabular-search-field';
import StartTimer from './StartTimer';
import TicketLink from './TicketLink';
import VisibilityToggles from 'react-visibility-toggles';
import cloneDeep from 'lodash.clonedeep';
import { compose } from 'redux';

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

export default class TicketsTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchColumn: 'all',
      pagination: {
        page: 1,
        perPage: 20,
      },
      rows: [],
      columns: props.columns,
    };

    this.changePage = this.changePage.bind(this);
    this.search = this.search.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
  }

  componentDidMount() {
    this.prepareRows();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.tickets.length !== nextProps.tickets.length) {
      this.prepareRows(nextProps.tickets);
    }
  }

  prepareRows(tickets = this.props.tickets) {
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

  changePage(page) {
    this.setState({
      pagination: {
        ...this.state.pagination,
        page,
      },
    });
  }

  search(query) {
    this.props.search(query);
  }

  toggleColumn({ columnIndex }) {
    const columns = cloneDeep(this.state.columns);
    columns[columnIndex].visible = !columns[columnIndex].visible;
    this.setState({ columns });
  }

  onBodyRow(row) {
    const actualHours = row.actualHours;
    const budgetHours = row.budgetHours;
    let rowClass = null;

    if (typeof budgetHours == 'undefined' || typeof actualHours == 'undefined') {
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

  footerSum(rows, property) {
    return rows.reduce(function (a, b) {
      return (typeof b[property] != 'undefined')? a + b[property] : a;
    }, 0);
  }

  render() {
    const { query } = this.props;
    const { columns, pagination, rows } = this.state;
    const paginated = compose(
      paginate(pagination),
      search.multipleColumns({ columns, query })
    )(rows);
    const visibleColumns = columns.filter(column => column.visible);
    const TableFooter = ({ columns, rows }) => {
      return (
        <tfoot className="table-bordered__foot">
          <tr>
            {columns.map((column, i) =>
              <td key={`footer-${i}`}>{column.showTotals ? this.footerSum(rows, column.property) : null}</td>
            )}
          </tr>
        </tfoot>
      );
    };

    return (
      <div>
        <div className="panel-body col-md-6">
          <h2>Search Tickets</h2>
          <Search
            column={this.state.searchColumn}
            columns={columns}
            onChange={this.search}
            onColumnChange={searchColumn => this.setState({ searchColumn })}
            query={query}
            rows={rows}
          />
          <button
            className="btn-link"
            onClick={this.search.bind(this, {})}
            type="button"
            style={{ marginBottom: '20px' }}
          >
            Clear Search
          </button>
        </div>

        <VisibilityToggles
          className="panel-body visibility-toggles"
          columns={columns}
          onToggleColumn={this.toggleColumn}
        />

        <Table.Provider
          className="table table-striped table-bordered"
          columns={visibleColumns}
        >
          <Table.Header>
            <search.Columns
              query={query}
              columns={visibleColumns}
              onChange={this.search}
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
          />
        )}
      </div>
    );
  }
}

TicketsTable.defaultProps = {
  columns: [
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
      cell: {
        formatters: [
          (value) => {
            return (
              <TicketLink ticketNumber={value} />
            );
          }
        ]
      },
    },
    {
      // Using a random property because it's easier than adding a new one
      // to all the rows
      property: 'mobileGuid',
      header: {
        label: 'Toggl',
      },
      visible: true,
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
    {
      property: 'budgetHours',
      header: {
        label: 'Budget Hours',
      },
      visible: true,
      props: {
        className: 'col--budget',
      },
      showTotals: true,
    },
    {
      property: 'actualHours',
      header: {
        label: 'Actual Hours',
      },
      visible: true,
      props: {
        className: 'col--budget',
      },
      showTotals: true,
    },
    {
      property: 'status.name',
      header: {
        label: 'Status',
      },
      visible: true,
    },
    {
      property: 'billTime',
      header: {
        label: 'Billable',
      },
      visible: false,
      showTotals: true,
    },
    {
      property: 'resources',
      header: {
        label: 'Assigned',
      },
      visible: false,
    },
  ],
};
