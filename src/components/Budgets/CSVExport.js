import flatten from 'flat';
import React, { Component } from 'react';
import Json2csv2Parser from 'json2csv';

class CSVExport extends Component {
	constructor(){
		super();

		this.exportFile = this.exportFile.bind(this);
	}

	convertFileType(){

		const fields = ['car', 'price', 'color'];
		const myCars = [
		  {
		    "car": "Audi",
		    "price": 40000,
		    "color": "blue"
		  }, {
		    "car": "BMW",
		    "price": 35000,
		    "color": "black"
		  }, {
		    "car": "Porsche",
		    "price": 60000,
		    "color": "green"
		  }
		];
		
		const json2csvParser = new Json2csv2Parser({ fields });
		const csv = json2csvParser.parse(myCars);
	
		console.log(csv);
	
	}

	exportFile() {
		console.log(this.props.columns);
		console.log(this.props.items);

		this.reformatColumns(this.reduceItemColumns());
		
		
		this.convertFileType();
		// this.exportToBroswer();
	}

	reduceItemColumns() {
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

	reformatColumns(items) {
		let reformattedItems = {};

		reformattedItems = items.map((item) => ({
			feature: item.feature,
			[item['budgetHours.column']]: item['budgetHours.value'],
			description: item['descriptions.budget'],
			assumptions: item['descriptions.assumptions'],
			exclusions: item['descriptions.exclusions'],
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
		value:'',
		label:'T&M',
	},{
		value:'Disc',
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
		value:'',
		label:'PM',
	},{
		value:'',
		label:'Total',
	},{
		value:'',
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