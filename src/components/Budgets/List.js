import CSVExport from './CSVExport';
import React, { Component } from 'react';
import Item from './Item';
import SearchBar from './Search';
import { connect } from 'react-redux';
import { convertToList } from '../../helpers/reformat';

class List extends Component {
        
  render() {
    return (
      <div>
       <h2> List View </h2>
       <SearchBar 
          filter={this.props.filter}
          fields={this.props.fields}
          onFilter={this.props.onFilter}
        />
        {this.props.visibleItems.map(item => 
          <Item 
            item={item}
            onEdit={this.props.onEdit}
            onDelete={this.props.onDelete}
            key={item.id}
          />
        )}
        <CSVExport 
          visibleItems={this.props.visibleItems}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  fields: state.budgets.fields,
  visibleItems: convertToList(state.budgets.visibleItemList),
});

export default connect(mapStateToProps)(List);
