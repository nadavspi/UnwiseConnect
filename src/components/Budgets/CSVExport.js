import XLSX from 'xlsx';
import React, { Component } from 'react';
import { CSVLink } from 'react-csv';
import { reformatColumns } from '../../helpers/reformat';

class CSVExport extends Component {
  constructor(){
    super();

    this.exportXlsx = this.exportXlsx.bind(this);
    this.exportFile = this.exportFile.bind(this);
  }

  exportFile() {
    return reformatColumns(this.props.visibleItems);
  }

  unravel(array){
    let string = '';
    
    if (Array.isArray(array)) { 
      array.map((element) => {
        string += element + '\n';
        return element;
      });
    } else {
      string = array;
    }

    return string;
  }

  exportXlsx() {
    const items = reformatColumns(this.props.visibleItems);
    
    // reformat columns for xlsx
    const rows = items.map((item) => {
      const row = {
        ...this.props.defaultRow, 
      };

      for (const property in item) {
        if (item.hasOwnProperty(property)) {
          const column = this.props.columns.find((element) => {
            return element.key === property;
          });
          if (typeof column !== 'undefined') {
            row[column.label] = (property.indexOf('descriptions.') > -1) ? this.unravel(item[property]) : item[property];
          }
        }
      }

      return row;
    });

    const bufferRows = new Array(15);

    const header = this.props.columns.map((column) => (column.label));

    const rowOffset = 5;
    const footerPos = rowOffset + rows.length + bufferRows.length;
    const tailPos = footerPos - 1;
    
    const footer = this.props.footer;
    for (const col in footer) {
      if (footer.hasOwnProperty(col) && footer[col].hasOwnProperty('function')) {
        footer[col].function = footer[col].function.replace(new RegExp('{rowOffset}', 'g'), rowOffset);
        footer[col].function = footer[col].function.replace(new RegExp('{tailPos}', 'g'), tailPos);
        footer[col].function = footer[col].function.replace(new RegExp('{footerPos}', 'g'), footerPos);
      }
    }
    
    // creates workbook
    const wb = XLSX.utils.book_new();

    // creates worksheet
    const ws = XLSX.utils.json_to_sheet(
      [
        ...rows, 
        ...bufferRows,
        footer,
      ],
      { 
        header:header,
        origin: 'A4',
      }
    );

    // adds functions to rows
    for(let i = rowOffset; i < rows.length + rowOffset; i++){
      for (const property in rows[i - rowOffset]) {
        if (rows[i - rowOffset].hasOwnProperty(property)) {
          const prop = rows[i - rowOffset][property];

          if (typeof prop === 'object' && !Array.isArray(prop)) {
            const formula = prop.function.replace(new RegExp('{row}', 'g'), (i));
            
            const cell = { f: formula, t:'n'};
            const cell_ref = XLSX.utils.encode_cell({ c:prop.col, r:(i - 1) });
            ws[cell_ref] = cell;  
          }
        }
      }
    }

    // adds functions to footer
    for (const property in footer) {
      if (footer.hasOwnProperty(property)) {
        const prop = footer[property];
        if (typeof prop === 'object' && !Array.isArray(prop)) {
          const formula = prop.function;
          
          const cell = { f: formula, t:'n'};
          const cell_ref = XLSX.utils.encode_cell({ c:prop.col, r:(rowOffset + rows.length + bufferRows.length - 1) });
          ws[cell_ref] = cell;  
        }
      }
    }

    // adds constants
    this.props.constants.map((constant) => {
      const cell = {v: constant.value, t: constant.type}
      const cell_ref = XLSX.utils.encode_cell({c: constant.col, r: constant.row});
      ws[cell_ref] = cell;  
      return constant;
    });
    
    XLSX.utils.book_append_sheet(wb,ws,'Budget');

    XLSX.writeFile(wb, 'Budget.xlsx');
  }

  render() {
    return (
      <div>
        <button
          onClick={this.exportXlsx}
          className="btn btn-primary">
          Export to Xlsx
        </button>
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
  columns: [
    {
      key:'feature',  
      label:'Feature',
    },{
      key:'t&m',
      label:'T&M',
    },{
      key:'Discovery',
      label:'Disc',
    },{
      key:'Design',
      label:'Design',
    },{
      key:'Dev',
      label:'Dev',
    },{
      key:'Testing',
      label:'Testing',
    },{
      key:'Remediation',
      label:'Remediation',
    },{
      key:'Deploy',
      label:'Deploy',
    },{
      key:'PM',
      label:'PM',
    },{
      key:'total',
      label:'Total',
    },{
      key:'descriptions.budget',
      label:'Description',
    },{
      key:'descriptions.assumptions',
      label:'Assumptions',
    },{
      key:'descriptions.clientResponsibilities',
      label:'Client Responsibilities',
    },{
      key:'descriptions.exclusions',
      label:'Exclusions',
    },
  ],
  defaultRow: {
    Testing: {
      function: 'SUM(E{row})*F$2',
      col: 5,
    },
    Remediation: {
      function: 'SUM(E{row})*G$2',
      col: 6,
    },
    PM: {
      function: 'SUM(C{row}:H{row})*I$2',
      col: 8,
    },
    Total: {
      function: 'SUM(C{row}:I{row})',
      col: 9,
    },
  },
  constants: [
    {
      label: 'Testing',
      value: 0.2,
      type: 'n',
      col: 5,
      row: 1,
    },{
      label: 'Remediation',
      value: 0.4,
      type: 'n',
      col: 6,
      row: 1,
    },{
      label: 'PM',
      value: 0.2,
      type: 'n',
      col: 8,
      row: 1,
    },
  ],
  footer: {
    Feature: 'Estimated Total Hours',
      Disc: {
        function: 'SUM(C{rowOffset}:C{tailPos})',
        col: 2,
      },
      Design: {
        function: 'SUM(D{rowOffset}:D{tailPos})',
        col: 3,
      },
      Dev: {
        function: 'SUM(E{rowOffset}:E{tailPos})',
        col: 4,
      },
      Testing: {
        function: 'SUM(F{rowOffset}:F{tailPos})',
        col: 5,
      },
      Remediation: {
        function: 'SUM(G{rowOffset}:G{tailPos})',
        col: 6,
      },
      Deploy: {
        function: 'SUM(H{rowOffset}:H{tailPos})',
        col: 7,
      },
      PM: {
        function: 'SUM(I{rowOffset}:I{tailPos})',
        col: 8,
      },
      Total: {
        function: 'SUM(C{footerPos}:I{footerPos})',
        col: 9,
      },
  },
}

export default CSVExport;
