import React from 'react';
import * as Table from 'reactabular-table';
import { compose } from 'redux';
import * as resolve from 'table-resolver';
import './timesheets.scss';

const columns = [
  {
    property: 'member.name',
    header: {
      label: 'Person',
    },
    visible: true,
  },
  {
    property: 'company.name',
    header: {
      label: 'Company',
    },
    visible: true,
  },
  {
    property: 'timeStart',
    header: {
      label: 'Date',
    },
    visible: true,
  },
  {
    property: 'actualHours',
    header: {
      label: 'Hours',
    },
    visible: true,
  },
  {
    property: 'billableOption',
    header: {
      label: 'Billable',
    },
    visible: true,
  },
  {
    property: 'problems',
    header: {
      label: 'Problems',
    },
    cell: {
      resolve: value => value && value.join(', '),
    },
    visible: true,
  },
  {
    property: 'notes',
    header: {
      label: 'Notes',
    },
    props: {
      className: 'entries-table__notes',
    },
    visible: true,
  },
];

export default class TimeEntryTable extends React.PureComponent {
  render() {
    const rows = resolve.resolve({
      columns,
      method: extra => compose(
        resolve.byFunction('cell.resolve')(extra),
        resolve.nested(extra),
      )
    })(this.props.entries);

    return (
      <div id={this.props.id}>
        <Table.Provider
          className="table table-striped table-bordered"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rowKey="id" rows={rows} />
        </Table.Provider>
      </div>
    );
  }
};
