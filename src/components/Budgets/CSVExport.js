import * as search from 'searchtabular';
import flatten from 'flat';
import jsonexport from 'jsonexport';
import React, { Component } from 'react';
import { compose } from 'redux';
import { multiInfix } from '../../helpers/utils';

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
    this.convertFileType(this.reformatColumns(this.filterItems(this.props.items, this.props.query)));
  }

  exportToBroswer(csv) {
    console.log(csv);
  }

  filterItems(items, query) {
    
    const { rows } = this.props;
    const columns = this.props.fields.map((field) => ({
      property: field.name,      
      header: {
        label: field.label,
      },
      filterType:field.filterType,
    }));

    const searchExecutor = search.multipleColumns({ 
      columns, 
      query, 
      strategy: multiInfix });
    const visibleItems = compose(searchExecutor)(rows);

    return visibleItems;
  }

  reformatColumns(items) {
    let reformattedList = {};

    // reformattedList = {
    //  ...reformattedList,
    //  newItem = {
    //    [flatItem['budgetHours.column']: existingItem[sameCol].value + flatItem['budgetHours.value'],
    //    total: existingItem[total] + flatItem['budgetHours.value'],
    //    description: existingItem.description + flatItem['descriptions.budget'],
    //    'descriptions.assumptions': existingItem['description.assumptions'] + flatItem['descriptions.assumptions'],
    //    'descriptions.exclusions': existingItem['description.exclusions'] + flatItem['descriptions.exclusions'],
    //  }
    // }

    // reformattedList[item.feature] = existingItem

    reformattedList = items.map((item) => {
      
      const flatItem = flatten(item, { maxDepth: 2 });

      const reformattedItem = {
        [flatItem['budgetHours.column']]: flatItem['budgetHours.value'],
        total: flatItem['budgetHours.value'],
        feature: flatItem.feature,
        description: flatItem['descriptions.budget'],
        'descriptions.assumptions': flatItem['descriptions.assumptions'],
        'descriptions.exclusions': flatItem['descriptions.exclusions'],
      };

      return reformattedItem;
    });

    console.log(reformattedList);

    return reformattedList;
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
    value:'descriptions.clientResponsibilities',
    label:'Client Responsibilities',
  },{
    value:'descriptions.exclusions',
    label:'Exclusions',
  },
  ]  
}


export default CSVExport;
