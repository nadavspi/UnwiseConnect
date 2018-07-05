import CSVExport from './CSVExport';
import flatten from 'flat';
import Form from './Item/Form';
import List from './List';
import MultiSearch from './MultiSearch';
import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import Table from '../Tickets/Table';

class Budgets extends Component {
	constructor() {
		super();

    const inputData = {
      items: [
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
      ],
    };

    const defaultUserColumns = {
      summary: true,
      phase: true,
      feature: true,
      'budgetHours.column': true,
      'budgetHours.value': true,
      tags: true,
    };

    this.state = {
      items: inputData.items.map((item) => (
        item = {
          ...item,
          isVisible: true,
        })),
      filter: {
        field: 'summary',
        value: '',
      },
      query: {
        summary:'',
        phase:'',
        feature:'',
        'budgetHours.column': '',
        'budgetHours.value': '',  
        tags: '',
      },
      userColumns: defaultUserColumns,
    };

    this.onAdd    = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onFilter = this.onFilter.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.renderList = this.renderList.bind(this);
    this.search   = this.search.bind(this);
    this.toggleColumn = this.toggleColumn.bind(this);
  }

  betterIsVisible(item, query){
    let result = true;

    for (const property in query) {
      if(typeof property === 'string'){
        console.log(property, 'is', (typeof property));  
        if(query.property !== item.property){
          result = false;
        }
      } else {
        console.log(property, 'is not a string');
        // if(item.property.indexOf(query.property) === -1){
        //   result = false;
        // }
      }
    }
    
    console.log(query);
    return result;
  }

  isVisible(item, field = this.state.filter.field, value = this.state.filter.value) {
    let flatItem = flatten(item);
    const itemValue = (flatItem[field] + '').toLowerCase();
    const filterValue = (value + '').toLowerCase();
    
    return itemValue.includes(filterValue);
  }

  onFilter({ field = this.state.filter.field, value = this.state.filter.value }) {
    this.setState({
      items: this.state.items.map((item) => ({
          ...item,
          isVisible: this.isVisible(item, field, value),
        })
      ),  
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
    item = {
      ...item,
      isVisible: this.isVisible(item),
    }

    this.setState({ 
      items: [
        ...this.state.items,
        item,
      ],
    });
  }

  onCustomFilter(property){
    if(property === 'tags') {
      return (<MultiSearch 
              items={this.state.items}
              query={this.state.query}
              onFilter={this.search}
            />);
    }
  }

  onDelete(itemId) {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId),
    });
  }

  onEdit(updatedItem) {
    updatedItem = {
      ...updatedItem,
      isVisible: this.isVisible(updatedItem),
    }

    this.setState({
      items: this.state.items.map(item => updatedItem.id === item.id ? updatedItem : item),
    })
  }

  renderList() {
     return (
       <List
         items={this.state.items}
         filter={this.state.filter}
         fields={this.props.fields}
         onFilter={this.onFilter}
         onEdit={this.onEdit}
         onDelete={this.onDelete}
       />
     );
   }

   search(query){
     this.setState({
       items: this.state.items.map((item) => ({
         ...item,
         isVisible: this.betterIsVisible(item, query),
       })),
       query: query,
     });
   }

   toggleColumn(payload){
     const isVisible = this.state.userColumns[payload.columnName];
     this.setState({
       userColumns: {
         ...this.state.userColumns,
         [payload.columnName]: !isVisible,
       }
     });
   }


  render() {
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

    let userColumns = columns.map((field) => field = field.property);
    userColumns = userColumns.filter((column) => this.state.userColumns[column]);
    
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
              render={() => (
                <div>
                  <Table
                    id="table-search-items"
                    query={this.state.query}
                    search={this.search}
                    tickets={this.state.items}
                    toggleColumn={this.toggleColumn}
                    userColumns={userColumns}
                    columns={columns}
                  />
                  <CSVExport 
                    items={this.state.items}
                    columns={userColumns}/>
                </div>                        
              )}
            />
          </div>
        </div>
      </div>
    );
  }
}

Budgets.defaultProps = {
  fields: [
    {
      filterType: 'textfield',
      name: 'summary',
      label: 'Summary',
      type: 'text',
      required: true,
    },
    {
      filterType: 'textfield',
      name: 'phase',
      label: 'Phase',
      type: 'text',
      required: true,
    },
    {
      filterType: 'textfield',
      name: 'feature',
      label: 'Feature',
      type: 'text',
    },
    {
      filterType: 'textfield',
      name: 'budgetHours.column',
      label: 'Team',
      type: 'text',
    },
    {
      filterType: 'textfield',
      name: 'budgetHours.value',
      label: 'Hours',
      type: 'number',
    },
    {
      filterType: 'none',
      name: 'descriptions.workplan',
      label: 'Workplan description',
      type: 'text',
      required: true,
    },
    {
      filterType: 'none',
      name: 'descriptions.budget',
      label: 'Budget description',
      type: 'text',
    },
    {
      filterType: 'none',
      name: 'descriptions.assumptions',
      label: 'Assumptions',
      type: 'text',
    },
    {
      filterType: 'none',
      name: 'descriptions.exclusions',
      label: 'Exclusions',
      type: 'text',
    },
    {
      filterType: 'custom',
      name: 'tags',
      label: 'Tags',
      type: 'text',
      required: true,
    },
  ]
};

export default Budgets;
