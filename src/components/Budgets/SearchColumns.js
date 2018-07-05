import MultiSearch from './MultiSearch';
import React from 'react';

class SearchColumns extends React.Component {
	
	renderColumn(column){
		if(column.filterType === 'dropdown'){
			return this.renderDropdownFilter(column);
		} else if(column.filterType === 'textfield'){
			return this.renderTextFilter(column)
		}
		return '';
	}

	renderTextFilter(column){
		const onQueryChange = (event) => {
			this.props.search({
				...this.props.query,
				[event.target.name]: event.target.value,
			})
		};



		return (
			<input
				className="column-filter-input"
				name={column.property}
				onChange={onQueryChange}
				value={this.props.query[column.property]}
			/>
		);
	}

	renderDropdownFilter(column){
		return (
			<MultiSearch 
        items={this.props.items}
        onFilter={this.props.onFilter}
      />
		);
	}

	render() {
		return (
			<tr>
				{this.props.columns.map((column) => (
					<th>
						{column.filterType != '' ?
							this.renderColumn(column)
							: ''}
					</th>
					))
				}
			</tr>
		);
	}
}

SearchColumns.propTypes = {
	columns: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
	rows: React.PropTypes.arrayOf(React.PropTypes.object),
}

export default SearchColumns;
