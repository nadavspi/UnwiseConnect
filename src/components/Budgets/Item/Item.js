
import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Componenet {

	render() {
		return (
			<div>
				<h1> Summary: {this.props.summary}</h1>
			</div>
		)
	}
}

Item.propTypes = {
	summary: PropTypes.string.isRequired
}
export default Item