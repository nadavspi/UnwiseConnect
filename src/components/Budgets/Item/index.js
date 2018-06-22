import React from 'react';
import PropTypes from 'prop-types';

class Item extends React.Component {

	render() {
		return (
			<div>
				<h3>Item/Task(ID): {this.props.summary}</h3>
				<ul> 
					<li>Summary: {this.props.summary}</li>
					<li>Phase: {this.props.phase}</li>
					<li>Feature: {this.props.feature}</li>
					<h3>Budget Hours</h3>
					<ul>
						<li>Phase: {this.props.budgetHours.column}</li>
						<li>Hours: {this.props.budgetHours.value}</li>
					</ul>
					<h3>Descriptions</h3>
					<ul>
						<li>
							Workplan: {this.props.descriptions.workplan}
						</li>
						<li>
							Budget: {this.props.descriptions.budget}
						</li>
						<li>
							Assumptions: {this.props.descriptions.assumptions}
						</li>  
						<li>
							Exclusions: {this.props.descriptions.exclusions}
						</li>
					</ul>
					<li>Tags: {this.props.tags}</li>
				</ul>
			</div> 
		)
	}
}

Item.propTypes = {
	summary: PropTypes.string.isRequired,
	phase: PropTypes.string.isRequired,
	feature: PropTypes.string.isRequired,
	tags: PropTypes.string.isRequired, 
}



export default Item;
