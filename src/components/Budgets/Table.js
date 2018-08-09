import memoize from 'memoize-one';
import CSVExport from './CSVExport';
import EditColumn from './EditColumn';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import TicketTable from '../Tickets/Table';
  
class Table extends Component {
  constructColumns() {
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

      if (field.isInteractive) {
        column.cell = this.onInteractive(field.name);
      }

      return column;
    });

    return columns;
  }

  onCustomFilter(property) {
    switch(property) {
      case 'tags':
        return (
          <MultiSearch 
            column={property}
            onFilter={this.props.search}
          />
        );
      case 't&m':
        return (
          <MultiSearch
            column={property}
            onFilter={this.props.search}
          />
        );
      default:
        console.warn('Could not find filter for property ' + property);
    }
  }

  onInteractive(name) {
    switch (name) {
      case 'edit':
        return ({
          resolve: value => `(${value})`,
          formatters: [
            (value, { rowData }) => {
              return (
                <EditColumn
                  onDelete={this.props.onDelete}
                  onEdit={this.props.onEdit} 
                  row={rowData}
                />
              );
            }
          ]
        });
      default:
        return;
    }
  }

  render() {
    const columns = this.constructColumns();
    const userColumns = columns.map((field) => field.property).filter((column) => this.props.userColumns[column]);

    return (
      <div>
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
