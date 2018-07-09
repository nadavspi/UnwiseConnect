import flatten from 'flat';
import jsonexport from 'jsonexport';
import React, { Component } from 'react';

class CSVExport extends Component {
	constructor(){
		super();

		this.exportFile = this.exportFile.bind(this);
	}

	convertFileType(data){

		const options = {
			headers: this.props.columns.map((column) => (column.value)),
			rename: this.props.columns.map((column) => (column.label)),
		};
		
		jsonexport(data, options, (err,csv) => {
			if(err) {
				return console.log(err);
			}
			this.exportToBroswer(csv);
		});

	}

	exportFile() {
		this.convertFileType(this.reformatColumns(this.props.filterItems(this.props.items,this.props.query)));
	}

	exportToBroswer(csv) {
		console.log(csv);
	}

	reformatColumns(items) {

		// list = {
		// 	klevu: {
		// 		dev:,
		// 		total:,
		// 		exclusions:,
		// 	}
		// }

		// list = [{
		// 	feature: klevu,
		// 	dev:,
		// 	total:,
		// }, {
		// 	feature: exia,
		// 	dev:,
		// 	total:,
		// }
		// ]

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
		value:'descriptions.budget',
		label:'Description',
	},{
		value:'descriptions.assumptions',
		label:'Assumptions',
	},{
		value:'descriptions.clientResponsibilities',
		label:'Client Responsibilities',
	},{
		value:'descriptions.exclusions',
		label:'Exclusions',
	},
	]	 
}

export default CSVExport;