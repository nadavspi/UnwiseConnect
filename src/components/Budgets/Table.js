import CSVExport from './CSVExport';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import TicketTable from '../Tickets/Table';
import { connect } from 'react-redux';
  
class Table extends Component {
  onCustomFilter(property) {
    if (property === 'tags') {
      return (
        <MultiSearch 
          items={this.props.items}
          query={this.props.query}
          onFilter={this.props.search}
        />
      );
    }
  }

  render() {
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
        <TicketTable
          id="table-search-items"
          query={this.props.query}
          search={this.props.search}
          tickets={this.props.items}
          toggleColumn={this.props.toggleColumn}
          userColumns={userColumns}
          columns={columns}
        />
        <CSVExport 
          items={this.props.items}
          fields={this.props.fields}
          query={this.props.query}
          visibleItems={this.props.visibleItems}
        />
      </div> 
    );
  }
}

const mapStateToProps = state => ({
  items: state.budgets.items,
  fields: state.budgets.fields,
  query: state.budgets.query,
  userColumns: state.budgets.userColumns,
  visibleItems: state.budgets.visibleItems,
});

export default connect(mapStateToProps)(Table);
