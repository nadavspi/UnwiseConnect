import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

class SearchColumns extends React.Component {
  render() {
    return (
      <tr>
        {this.props.columns.map((column, i) => (
          <th key={`${column.property || i}-column-filter`} className="column-filter">
            {column && column.property ?
              this.renderFilter(column)
            : ''}
          </th>
        ))}
      </tr>
    );
  }

  renderFilter(column) {
    if (column.filterType === 'dropdown') {
      return this.renderDropdownFilter(column);
    } else if (column.filterType === 'none') {
      return '';
    } else if (column.filterType === 'custom') {
      return typeof column.customFilter === 'function' ? column.customFilter() : column.customFilter;
    }
    return this.renderTextFilter(column);
  }

  renderTextFilter(column) {
    const onQueryChange = (event) => {
      this.props.onChange({
        ...this.props.query,
        [event.target.name]: event.target.value,
      });
    };

    return (
      <input
        onChange={onQueryChange}
        className="column-filter-input"
        name={column.property}
        placeholder={column.filterPlaceholder || ''}
        value={this.props.query[column.property] || ''}
      />
    );
  }

  renderDropdownFilter(column) {
    const onQueryChange = (values) => {
      this.props.onChange({
        ...this.props.query,
        [column.property]: values.length ? values.map(option => option.value) : '',
      });
    };

    const rowValues = this.props.rows.map(row => row[column.property]);
    const options = [ ...new Set(rowValues) ].map(value => ({ value, label: value }));

    return (
      <div className="column-filter-dropdown">
        <Select
          multi={true}
          name={column.property}
          value={this.props.query[column.property] || []}
          onChange={onQueryChange}
          options={options}
        />
      </div>
    );
  }
}

SearchColumns.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onChange: React.PropTypes.func.isRequired,
  query: React.PropTypes.object,
  rows: React.PropTypes.arrayOf(React.PropTypes.object),
};
SearchColumns.defaultProps = {
  query: {},
};

export default SearchColumns;
