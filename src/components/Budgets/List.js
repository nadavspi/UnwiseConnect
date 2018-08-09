import * as search from 'searchtabular';
import React, { Component } from 'react';
import Item from './Item';
import SearchBar from './Search';
import { compose } from 'redux';
import { multiInfix } from '../../helpers/utils';

class List extends Component {

        
  render() {
    const { query, rows } = this.props;
    const columns = this.props.fields.map((field) => ({
      property: field.name,      
      header: {
        label: field.label,
      },
      filterType:field.filterType,
    }));

    const searchExecutor = search.multipleColumns({ 
      columns, 
      query, 
      strategy: multiInfix });
    const visibleItems = compose(searchExecutor)(rows);

    return (
      <div>
       <h2> List View </h2>
       <SearchBar 
          filter={this.props.filter}
          fields={this.props.fields}
          onFilter={this.props.onFilter}
        />
        {visibleItems.map(item => 
          <Item 
            item={item}
            fields={this.props.fields}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            key={item.id}
          />
        )}
      </div>
    );
  }
}

export default List;
