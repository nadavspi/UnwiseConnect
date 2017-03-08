import * as Table from 'reactabular-table';
import * as resolve from 'table-resolver';
import Pagination from './Pagination';
import React from 'react';
import Search from 'reactabular-search-field';
import { compose } from 'redux';
import { multipleColumns as searchMultipleColumns } from 'searchtabular';


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
  constructor() {
    super();

    this.state = {
      searchColumn: 'all',
      query: {},
      pagination: {
        page: 1,
        perPage: 20,
      },
      rows: [],
    };

    this.changePage = this.changePage.bind(this);
  }

  componentDidMount() {
    this.prepareRows();
  }

  componentDidReceiveProps(nextProps) {
    if (this.props.tickets.length !== nextProps.tickets.length) {
      this.prepareRows();
    }
  }

  prepareRows() {
    const { columns, tickets } = this.props;

    this.setState({
      rows: resolve.resolve({ columns, method: resolve.nested })(tickets),
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

  render() {
    const { columns } = this.props;
    const { query, pagination, rows } = this.state;
    const paginated = compose(
      paginate(pagination),
      searchMultipleColumns({ columns, query })
    )(rows);

    return (
      <div>
        <Search
          column={this.state.searchColumn}
          columns={columns}
          onChange={query => this.setState({ query })}
          onColumnChange={searchColumn => this.setState({ searchColumn })}
          query={this.state.query}
          rows={rows}
        />
        <Table.Provider
          className="table table-striped table-bordered"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rowKey="id" rows={paginated.rows} />
        </Table.Provider>
        <Pagination 
          changePage={this.changePage}
          paginated={paginated}
          pagination={pagination}
        />
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
    },
    {
      property: 'summary',
      header: {
        label: 'Name',
      },
    },
    {
      property: 'budgetHours',
      header: {
        label: 'Budget Hours',
      },
    },
    {
      property: 'actualHours',
      header: {
        label: 'Actual Hours',
      },
    },
    {
      property: 'status.name',
      header: {
        label: 'Status',
      },
    },
  ],
};
