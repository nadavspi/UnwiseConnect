import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter } from 'react-bootstrap-table2-filter';

class SearchColumns extends React.Component {
  state = {
    columns: [],
    rows: []
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.columns !== this.props.columns) {
      this.compileColumns();
    }
  }

  compileColumns = () => {
    let columns = [];
    this.props.columns.map(column => {
      columns.push({
        dataField: column.property,
        text: column.header.label,
        sort: true,
        sortCaret: (order, column) => {
          if (!order || order === 'asc') return (<span className="sorting-arrow">Up</span>);
          else if (order === 'desc') return (<span className="sorting-arrow down-arrow">Down</span>);
          return null;
        },
        filter: textFilter(),
      })
    });

    this.setState({
      columns
    });
    this.compileRows();

    return columns;
  }

  compileRows = () => {
    const rows = this.props.rows.map(row => {
      return {
        'mobileGuid': row.mobileGuid,
        'phase.path': row.phase.path,
        'company.name': row['company.name'],
        'id': row.id,
        'summary': row.summary,
        'impact': row.impact,
        'budgetHours': row.budgetHours || '',
        'status.name': row['status.name'],
      }
    })
    const uniqueRowValues = [ ...new Set(rows) ];
    this.setState({
      rows: uniqueRowValues
    });
  }

  render() {
    return (
      this.state.columns.length > 0 && (
        <BootstrapTable pagination={paginationFactory()} filter={filterFactory()} classes="table table-striped table-bordered" keyField='id' data={ this.state.rows } columns={ this.state.columns } />
      )
    )
  }
}

SearchColumns.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object,
  rows: PropTypes.arrayOf(PropTypes.object),
};
SearchColumns.defaultProps = {
  query: {},
};

export default SearchColumns;
