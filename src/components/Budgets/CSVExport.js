import flatten from 'flat';
import React, { Component } from 'react';
import jsonexport from 'jsonexport';

class CSVExport extends Component {
	constructor(){
		super();

		this.exportFile = this.exportFile.bind(this);
	}

	convertFileType(data){

		const values = this.props.columns.map((column) => (column.value));
		const labels = this.props.columns.map((column) => (column.label));

		const options = {
			headers: values,
			rename: labels,
		};
		
		jsonexport(data, options, (err,csv) => {
			if(err) {
				return console.log(err);
			}
			this.exportToBroswer(csv);;
		});

	}

	exportFile() {
		console.log(this.props.items);
	
		this.convertFileType(this.reformatColumns(this.filterItems()));
	}

	exportToBroswer(csv) {
		console.log(csv);
	}

	filterItems() {
		
		let filteredItems = this.props.items.filter((item) => item.isVisible);
		filteredItems = filteredItems.map((item) => ({
			...flatten({ ...item }, { maxDepth:2})
		}));

		console.log('FlAT', filteredItems)

		return filteredItems;
	}

	reformatColumns(items) {
		let reformattedItems = {};
		console.log(items);

		reformattedItems = items.map((item) => ({
			feature: item.feature,
			[item['budgetHours.column']]: item['budgetHours.value'],
			total: item['budgetHours.value'],
			description: item['descriptions.budget'],
			'descriptions.assumptions': item['descriptions.assumptions'],
			'descriptions.exclusions': item['descriptions.exclusions'],
		}));

		console.log(reformattedItems);

		return reformattedItems;
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
		value:'feature',
		label:'Page/Feature',
	},{
		value:'t&m',
		label:'T&M',
	},{
		value:'Discovery',
		label:'Disc',
	},{
		value:'Design',
		label:'Design',
	},{
		value:'Dev',
		label:'Dev',
	},{
		value:'Testing',
		label:'Testing',
	},{
		value:'Remediation',
		label:'Remediation',
	},{
		value:'Deploy',
		label:'Deploy',
	},{
		value:'PM',
		label:'PM',
	},{
		value:'total',
		label:'Total',
	},{
		value:'description',
		label:'Description',
	},{
		value:'descriptions.assumptions',
		label:'Assumptions',
	},{
		value:'',
		label:'Client Responsibilities',
	},{
		value:'descriptions.exclusions',
		label:'Exclusions',
	},
	]
		 
}

export default CSVExport;