import memoize from 'memoize-one';
import CSVExport from './CSVExport';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import TicketTable from '../Tickets/Table';
  
const filterfun = (len) => {
  console.log('run search query');
  return len;
};

const filter = memoize(filterfun);

class Table extends Component {
  
  onCustomFilter(property){
    if(property === 'tags') {
      return (<MultiSearch 
                items={this.props.items}
                query={this.props.query}
                onFilter={this.props.search}
              />);
    }
  }

  log(value) {
    console.log('RENDERED');
  }

  render() {
    const value = filter(...this.props.visibleItems);

    const columns = this.props.fields.map((field) => {
      const column = {
        property: field.name,
        header: {
          label: field.label,
        },
        filterType: field.filterType,
      };

      if (field.filterType === 'custom') {
        column.customFilter = () => {
          return this.onCustomFilter(field.name);
        }
      }

      return column;
    });

    const userColumns = columns.map((field) => field.property).filter((column) => this.props.userColumns[column]);

    return (
      <div>
        {this.log(value)}
        <TicketTable
          columns={columns}
          id="table-search-items"
          query={this.props.query}
          search={this.props.search}
          tickets={this.props.items}
          toggleColumn={this.props.toggleColumn}
          userColumns={userColumns}
        />
        <CSVExport 
          items={this.props.items}
          fields={this.props.fields} 
          query={this.props.query}
          rows={this.props.items}
        />
      </div> 
    );
  }
}

export default Table;
