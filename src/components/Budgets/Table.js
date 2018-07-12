import memoize from 'memoize-one';
import CSVExport from './CSVExport';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import TicketTable from '../Tickets/Table';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';
  
const filterfun = (len) => {
  console.log('run search query');
  return len;
};

const filter = memoize(filterfun);

class Table extends Component {
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
          tickets={this.props.itemArray}
          toggleColumn={this.props.toggleColumn}
          userColumns={userColumns}
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
