import React, { Component } from 'react';
import * as Table from 'reactabular-table';
import flatten from 'flat';
import Item from './Item';
import SearchBar from './Search';

class ItemTable extends Component {

  // <SearchBar 
  //   filter={this.props.filter}
  //   fields={this.props.fields}
  //   onFilter={this.props.onFilter}
  // />
  // {this.props.items.map(item => 
  //   item.isVisible && (
  //   <Item 
  //     item={item}
  //     fields={this.props.fields}
  //     onEdit={this.props.onEdit}
  //     onDelete={this.props.onDelete}
  //     key={item.id}
  //   />
  // ))}

	render() {
    const columns = this.props.fields.map((field) => field={
      property: field.name,      
      header: {
        label: field.label,
      },
    });

    const rows = this.props.items.map((item) => item={
      ...flatten({ ...item }, { maxDepth: 2 }),
    })

    console.log(columns);
    console.log(rows);

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