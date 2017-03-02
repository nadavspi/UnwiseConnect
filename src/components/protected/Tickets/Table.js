import * as Table from 'reactabular-table';
import React from 'react';
import * as resolve  from 'table-resolver';
import { multipleColumns as searchMultipleColumns } from 'searchtabular';
import Search from 'reactabular-search-field';


export default class TicketsTable extends React.Component {
  constructor() {
    super();

    this.state = {
      searchColumn: 'all',
      query: {},
    };
  }

  render() {
    const { tickets, columns } = this.props;
    const { query } = this.state;
    const rows = resolve.resolve({ columns, method: resolve.nested })(tickets);
    const searchedRows = searchMultipleColumns({
      columns,
      query,
    })(rows);

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
          <Table.Body
            rowKey="id" 
            rows={searchedRows}
          />
        </Table.Provider> 
      </div>
    );
  } 
};

TicketsTable.defaultProps = {
  columns: [
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
    }
  ],
};

