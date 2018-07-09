import jsonexport from 'jsonexport';
import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { reformatColumns } from '../../helpers/reformat';

class CSVExport extends Component {
	constructor(){
		super();

		this.exportFile = this.exportFile.bind(this);
	}

	exportFile() {
		return reformatColumns(this.props.visibleItems);
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
