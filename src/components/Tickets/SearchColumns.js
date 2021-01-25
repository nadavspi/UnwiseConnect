import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';

class SearchColumns extends React.Component {
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
      })
    });
    return columns;
  }

  render() {
    return (
      <BootstrapTable data={this.compileColumns()} columns={this.compileColumns()} />
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
