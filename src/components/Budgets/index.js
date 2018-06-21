import React, { Component } from 'react';
import Table from './Table';
import Item from './Item/Item';
import NewItem from './Item/NewItem';
import classnames from 'classnames';
import { connect } from 'react-redux';

class Budgets extends Component {
	constructor() {
		super();
	}

	render(){

		return (
			<div>
				<div className="panel-uc panel panel-default">
					<div className="panel-uc__heading panel-heading clearfix">
						<h4> Center (temp title) 
						</h4>
						<div className="panel-uc__manage">

						</div>
					</div>
				</div>
				<div className="row panel-body">
					<NewItem />
					<div className="panel-body projects__wrapper">
						<h2> Features (temp title) </h2>
				</div>
					<div className="panel-body projects__wrapper">
						<Item summary="This is a summary"/>
					</div>
				</div>
			</div>
		);
	}
}

export default connect()(Budgets);