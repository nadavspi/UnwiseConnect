import PropTypes from 'prop-types';
import React from 'react';
import Select from 'react-select';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory, { PaginationProvider, PaginationListStandalone } from 'react-bootstrap-table2-paginator';
import filterFactory, { textFilter, selectFilter } from 'react-bootstrap-table2-filter';
import { Type } from 'react-bootstrap-table2-editor';

class SearchColumns extends React.Component {
  state = {
    columns: [],
    rows: []
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.columns !== this.props.columns) {
      this.compileColumns();
    }
  }

  evaluateExtraOption(column, uniqueRowValues, option) {
    if (typeof option === 'function') {
      const currentValue = this.props.query[column.property] || [];
      return option(column, uniqueRowValues, currentValue);
    }
    return option;
  }

  compileColumns = () => {
    let columns = [];

    this.props.columns.map(column => {
      const extraOptions = (column.extraOptions || []).map(this.evaluateExtraOption.bind(this, column, this.props.rows));
      const statusOptions = extraOptions.filter(option => option.label == 'All Complete');
      const options = (statusOptions[0] && statusOptions[0].value) || [];
      let dropdownOptions = [];

      const defaultColumnData = {
        classes: column.className,
        dataField: column.property,
        editable: false,
        footer: () => column.showTotals ? this.props.footerSum(this.props.paginatedAll, column.property) : null,
        formatter: column.formatter,
        headerStyle: () => {
          return { width: `${column.width}px` || 'auto'};
        },
        sort: column.allowSort == false ? false : true,
        style: {'width': `${column.width}px`, textAlign: column.textAlign || 'left'},
        text: column.header.label,
      }

      options.map(option => {
        dropdownOptions.push({
          value: option,
          label: option,
        })
      })

      if (column.filterType === 'dropdown') {
        columns.push({
          ...defaultColumnData,
          filter: selectFilter({
            delay: 0,
            options: { ...options },
            placeholder: '',
          }),
          editor: {
            type: Type.SELECT,
            options: [...dropdownOptions],
          }
        })
      } else if (column.filterType == 'none') {
        columns.push({
          dataField: column.property,
          text: column.header.label,
        })
      } else {
        columns.push({
          ...defaultColumnData,
          filter: textFilter({
            delay: 0,
            placeholder: ' ',
          })
        });
      }
    });

    this.compileRows();
    this.setState({
      columns,
    });

    return columns;
  }

  compileRows = () => {
    const rows = this.props.rows.map(row => {
      return {
        'mobileGuid': row.mobileGuid,
        'phase.path': row.phase.path,
        'company.name': row['company.name'],
        'project.name': row['project.name'],
        'actualHours': row.actualHours,
        'billTime': row.billTime,
        'resources': row.resources,
        'projectId': row.project.id,
        'id': row.id,
        'summary': row.summary,
        'impact': row.impact,
        'budgetHours': row.budgetHours || '',
        'actualHours': row.actualHours || '',
        'status.name': row['status.name'],
        'customFields': row.customFields,
      }
    });

    const uniqueRowValues = [ ...new Set(rows) ];

    this.setState({
      rows: uniqueRowValues
    });
  }

  rowClasses = (row, rowIndex) => {
    const actualHours = row.actualHours;
    const budgetHours = row.budgetHours;
    let rowClass = null;

    if (typeof budgetHours === 'undefined' || typeof actualHours === 'undefined') {
      return;
    }

    if (actualHours > budgetHours) {
      // over 100% of the budget is already used
      rowClass = 'ticket--overbudget';
    } else if (actualHours / budgetHours >= .9) {
      // over 90% of the budget is already used
      rowClass = 'ticket--nearbudget';
    }

    return rowClass;
  };

  render() {
    const paginationOption = {
      custom: true,
      sizePerPage: 25,
    };

    return (
      <React.Fragment>
        {this.state.columns.length > 0 && (
          <PaginationProvider pagination={paginationFactory(paginationOption)}>
            {({ paginationProps, paginationTableProps }) => (
              <>
                <BootstrapTable
                  classes="table table-striped table-bordered"
                  columns={this.state.columns}
                  data={this.state.rows}
                  filter={filterFactory()}
                  keyField='id'
                  pagination={paginationFactory()}
                  {...paginationTableProps}
                  rowClasses= {this.rowClasses}
                />
                <PaginationListStandalone
                  { ...paginationProps }
                />
              </>
            )}
          </PaginationProvider>
        )}
      </React.Fragment>
    );
  }
}

SearchColumns.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  onChange: PropTypes.func.isRequired,
  query: PropTypes.object,
  rows: PropTypes.arrayOf(PropTypes.object),
};
SearchColumns.defaultProps = {
  query: {},
};

export default SearchColumns;
