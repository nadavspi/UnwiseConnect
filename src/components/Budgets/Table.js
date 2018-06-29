import flatten from 'flat';
import React, { Component } from 'react';
import * as Table from 'reactabular-table';

class ItemTable extends Component {

	render() {
    const columns = this.props.fields.map((field) => field={
      property: field.name,      
      header: {
        label: field.label,
      },
    });

    const rows = this.props.items.map((item) => item={
      ...flatten({ ...item }, { maxDepth: 2 }),
    });

		return (
			<div>
				<h2> Table View </h2>
        <Table.Provider 
          className="table table-striped table-bordered"
          columns={columns}
        >
          <Table.Header />
          <Table.Body rows={rows} rowKey="id" />
        </Table.Provider>
			</div>
		);
	}
}

export default ItemTable;