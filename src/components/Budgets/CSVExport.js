import flatten from 'flat';
import jsonexport from 'jsonexport';
import React, { Component } from 'react';
import { CSVLink } from 'react-csv';

class CSVExport extends Component {
	constructor(){
		super();

		this.exportFile = this.exportFile.bind(this);
	}

	convertFileType(data) {

		const options = {
			headers: this.props.columns.map((column) => (column.value)),
			rename: this.props.columns.map((column) => (column.label)),
		};
		
		jsonexport(data, options, (err,csv) => {
			if(err) {
				return console.log(err);
			}
			return csv;
		});
	}

	exportFile() {
		return this.reformatColumns(this.props.visibleItems);
	}

	reformatColumns(items) {

		const flatList = items.map((item) => flatten(item, { maxDepth: 2 }));
		
		// convert columns
		const reformattedList = flatList.map((item) => {
			let reformattedItem = {
				[item['budgetHours.column']]: item['budgetHours.value'],
				total: item['budgetHours.value'],
				feature: item.feature,
			};

			for (const property in item) {
				if(Array.isArray(item[property])) {
					reformattedItem[property] = item[property];
				}
			}

			return reformattedItem;
		});

		let concatObj = {};

		// combine on feature
		reformattedList.map((item) => {
			if(typeof concatObj[item.feature] === 'undefined') {
				concatObj[item.feature] = item;
			} else {
				for (const property in item) {
					if(Array.isArray(item[property])) {
						concatObj[item.feature][property] = [...concatObj[item.feature][property], ...item[property]];
					} else if(typeof item[property] === 'number') {
						concatObj[item.feature][property] = concatObj[item.feature][property] + item[property] || item[property];
					} 
				}
			}
		});

		// convert concatObj from properties to array elements
		let concatList = [];
		for (const element in concatObj) {
			concatList = [...concatList, concatObj[element]];
		}

		return concatList;
	}

	render() {

		return (
			<div>
				<CSVLink
					data={this.exportFile()}
					headers={this.props.columns}
					filename={'Budget.csv'}
					className="btn btn-primary">
					Export to CSV
				</CSVLink>
			</div>
		);
	}
}

CSVExport.defaultProps = {
	columns: [{
		key:'feature',		
		value:'feature',
		label:'Page/Feature',
	},{
		key:'t&m',
		value:'t&m',
		label:'T&M',
	},{
		key:'Discovery',
		value:'Discovery',
		label:'Disc',
	},{
		key:'Design',
		value:'Design',
		label:'Design',
	},{
		key:'Dev',
		value:'Dev',
		label:'Dev',
	},{
		key:'Testing',
		value:'Testing',
		label:'Testing',
	},{
		key:'Remediation',
		value:'Remediation',
		label:'Remediation',
	},{
		key:'Deploy',
		value:'Deploy',
		label:'Deploy',
	},{
		key:'PM',
		value:'PM',
		label:'PM',
	},{
		key:'total',
		value:'total',
		label:'Total',
	},{
		key:'descriptions.budget',
		value:'descriptions.budget',
		label:'Description',
	},{
		key:'descriptions.assumptions',
		value:'descriptions.assumptions',
		label:'Assumptions',
	},{
		key:'descriptions.clientResponsibilities',
		value:'descriptions.clientResponsibilities',
		label:'Client Responsibilities',
	},{
		key:'descriptions.exclusions',
		value:'descriptions.exclusions',
		label:'Exclusions',
	},
	]	 
}

export default CSVExport;