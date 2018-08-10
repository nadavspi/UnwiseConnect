import CSVExport from './CSVExport';
import EditColumn from './EditColumn';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import TicketTable from '../Tickets/Table';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';
  
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
          id="table-search-items"
          query={this.props.query}
          search={this.props.search}
          tickets={this.props.itemArray}
          toggleColumn={this.props.toggleColumn}
          userColumns={userColumns}
          columns={columns}
        />
        <CSVExport 
          visibleItems={this.props.visibleItems}
        />
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  itemArray: convertToList(state.budgets.itemList),
  fields: state.budgets.fields,
  query: state.budgets.query,
  userColumns: state.budgets.userColumns,
  visibleItems: convertToList(state.budgets.visibleItemList),
});

export default connect(mapStateToProps)(Table);
