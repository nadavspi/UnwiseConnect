import React from 'react';

class SearchColumns extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const onQueryChange = (event) => {
      this.props.onChange({
        ...this.props.query,
        [event.target.name]: event.target.value
      });
    };

    return (
      <tr>
        {this.props.columns.map((column, i) => (
          <th key={`${column.property || i}-column-filter`} className="column-filter">
            {column && column.property ?
              <input
                onChange={onQueryChange}
                className="column-filter-input"
                name={column.property}
                placeholder={column.filterPlaceholder || ''}
                value={this.props.query[column.property] || ''}
              />
            : ''}
          </th>
        ))}
      </tr>
    );
  }
};

SearchColumns.propTypes = {
  columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  onChange: React.PropTypes.func.isRequired,
  query: React.PropTypes.object
};
SearchColumns.defaultProps = {
  query: {}
};

export default SearchColumns;
