import * as BudgetsActions from '../../actions/budgets';
import CSVExport from './CSVExport';
import Form from './Item/Form';
import List from './List';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import Table from '../Tickets/Table';
import { connect } from 'react-redux';
import { Route, Link } from 'react-router-dom';

class Budgets extends Component {
	constructor(props) {
		super();

    const inputData = [
        {
          id: 1,
          summary: "Klevu discovery & calls",
          phase: "dev/Klevu",
          feature: "Klevu",
          budgetHours: { 
            column: "Discovery",
            value: 6,
          },
          descriptions: {
            workplan: [
              "Time for communication with Klevu.",
            ],
            budget: [],
            assumptions: [
              "Accounts for one onboarding call."
            ],
            exclusions: [],
          },
          tags: "klevu",
        },
        {
          id: 2,
          summary: "Install Klevu extension",
          phase: "dev/Klevu",
          feature: "Klevu",
          budgetHours: { 
            column: 'Dev',
            value: 4,
          },
          descriptions: {
            workplan: [
              "Install Klevu extension using composer.",
            ],
            assumptions: [
              "Install extension once using code provided by Klevu."
            ],
          },
          tags: "klevu",
        },
        {
          id: 3,
          summary: "Configure Klevu flyout",
          phase: "dev/Klevu",
          feature: "Klevu",
          budgetHours: { 
            column: 'Dev',
            value: 4,
          },
          descriptions: {
            workplan: [
              "Use Klevu control panel to choose between autocomplete and faceted.",
            ],
            assumptions: [
              "Use one of out of box options provided by Klevu (autocomplete or faceted) without customization.",
            ],
          },
          tags: "klevu",
        },
        {
          id: 10,
          summary: "Development meetings",
          phase: "dev",
          feature: "Build",
          budgetHours: { 
            column: "Development",
            value: 20,
          },
          descriptions: {
            workplan: [],
            budget: [],
            assumptions: [],
            exclusions: [],
          },
          tags: "build",
        },
    ];

    const defaultUserColumns = {
      summary: true,
      phase: true,
      feature: true,
      'budgetHours.column': true,
      'budgetHours.value': true,
      tags: true,
    };
    
    props.dispatch(BudgetsActions.subscribe(inputData));

    for (const column in defaultUserColumns) {
      props.dispatch(BudgetsActions.toggleColumn(column));
    }

    this.state = {
      filter: {
        field: 'summary',
        value: '',
      },
    };    

    this.onAdd    = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderList = this.renderList.bind(this);
    this.renderTable = this.renderTable.bind(this);
    this.search   = this.search.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
  }

  onFilter({ field = this.state.filter.field, value = this.state.filter.value }) {
    this.setState({
      filter: {
        field,
        value,
      },
    });  
  }

  onFormSubmit(item) {
    this.onAdd(item);
  }

  onAdd(item) {
    this.props.dispatch(BudgetsActions.addItem(item));
  }

  onCustomFilter(property){
    if(property === 'tags') {
      return (<MultiSearch 
                items={this.props.items}
                query={this.props.query}
                onFilter={this.search}
              />);
    }
  }

  onDelete(itemId) {
    this.props.dispatch(BudgetsActions.removeItem(itemId));
  }

  onEdit(updatedItem) {
    this.props.dispatch(BudgetsActions.updateItem(updatedItem));
  }

  renderList() {

     return (
       <List
         items={this.props.items}
         filter={this.state.filter}
         fields={this.props.fields}
         onFilter={this.onFilter}
         onEdit={this.onEdit}
         onDelete={this.onDelete}
         query={this.props.query}
         rows={this.props.items}
       />
     );
   }

   renderTable() {
      
      const columns = this.props.fields.map((field) => {
      const column = {
        property: field.name,      
        header: {
          label: field.label,
        },
        filterType: field.filterType,
      };

      if (field.filterType === 'custom') {
        column.customFilter = () => {
          return this.onCustomFilter(field.name);
        }
      }

        return column;
      });

      let userColumns = columns.map((field) => field.property);
      userColumns = userColumns.filter((column) => this.props.userColumns[column]);

      return (
        <div>
          <Table
            id="table-search-items"
            query={this.props.query}
            search={this.search}
            tickets={this.props.items}
            toggleColumn={this.toggleColumn}
            userColumns={userColumns}
            columns={columns}
          />
          <CSVExport items={this.props.items} />
        </div> 
      );
   }

   search(query) {
     this.props.dispatch(BudgetsActions.search(query));
   }

   toggleColumn(payload){
     this.props.dispatch(BudgetsActions.toggleColumn(payload.columnName));
   }


  render() {

    return (
      <div>
        <div className="panel-uc panel panel-default">
          <div className="panel-uc__heading panel-heading clearfix">
            <h4>Budget Tool</h4>
          </div>
        </div>
        <div className="row panel-body">
          <div className="panel-body projects__wrapper">
            <Form
              onSubmit={this.onFormSubmit}
              fields={this.props.fields}
            />
            <h3>View Selection</h3>
            <ul>
              <li>
                <Link to={this.props.match.url + '/list'}>List</Link>
              </li>
              <li>
                <Link to={this.props.match.url + '/table'}>Table</Link>
              </li>
            </ul>
            <Route 
              exact path={this.props.match.url} 
              render={this.renderList}
            />
            <Route 
              path={this.props.match.url + '/list'} 
              render={this.renderList}
            />
            <Route 
              path={this.props.match.url + '/table'} 
              render={this.renderTable}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  items: state.budgets.items,
  fields: state.budgets.fields,
  query: state.budgets.query,
  userColumns: state.budgets.userColumns,
})

export default connect(mapStateToProps)(Budgets);
