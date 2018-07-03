import flatten from 'flat';
import React, { Component } from 'react';
import json2csv from 'json2csv';

class CSVExport extends Component {
	constructor(){
		super();

		this.exportFile = this.exportFile.bind(this);
	}

	exportFile(){
		console.log(this.props.columns);
		console.log(this.props.items);

		this.reduceItemColumns();
		// sendItemInfoToBeReformatted();
		// convertToCSV();
		// exportToBroswer();
	}

	reduceItemColumns(){
		const columns = this.props.columns;
		
		const reducedItems = this.props.items.map((item) => {
			const reducedItem = {};
			const flatItem = {...flatten({ ...item }, { maxDepth: 2})}

			for(let i = 0; i < columns.length; i++){
				reducedItem[columns[i]] = flatItem[columns[i]];
			}

			return reducedItem;
		});

		console.log(reducedItems);

		return reducedItems;
	}

	render() {
		return (
			<button 
				onClick={this.exportFile}
				className="btn btn-primary">
				Export
			</button>
		);
	}
}

CSVExport.defaultProps = {
	columns: [{
		property:'feature',
		label:'Page/Feature',
	},{
		property:'',
		label:'T&M',
	},{
		property:'budgetHours.column',
		label:'Disc',
	},{
		property:'budgetHours.column',
		label:'Design',
	},{
		property:'budgetHours.column',
		label:'Dev',
	},{
		property:'budgetHours.column',
		label:'Testing',
	},{
		property:'budgetHours.column',
		label:'Remediation',
	},{
		property:'budgetHours.column',
		label:'Deploy',
	},{
		property:'',
		label:'PM',
	},{
		property:'',
		label:'Total',
	},{
		property:'',
		label:'Description',
	},{
		property:'descriptions.assumptions',
		label:'Assumptions',
	},{
		property:'',
		label:'Client Responsibilities',
	},{
		property:'descriptions.exclusions',
		label:'Exclusions',
	},
	]
		 
}

export default CSVExport;