import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router';
import flatten from 'flat';
import List from './List';
import Table from './Table';
import Item from './Item';
import ItemForm from './Item/Form';
import SearchBar from './Search';

class Budgets extends Component {
	constructor() {
		super();

    let inputData = {
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

    this.state = {
      items: inputData.items.map((item) => (
        item = {
          ...item,
          isVisible: true,
        })),
      filter: {
        field: 'summary',
        value: '',
      }
    };

    this.onFilter = this.onFilter.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onAdd    = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.toggleView = this.toggleView.bind(this);
  }

  isVisible(item, field = this.state.filter.field, value = this.state.filter.value) {
    let flatItem = flatten(item);
    return (flatItem[field] + '').toLowerCase().includes((value + '').toLowerCase());
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
      toggleView:false
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

  onEdit(updatedItem) {
    updatedItem = {
      ...updatedItem,
      isVisible: this.isVisible(updatedItem),
    }

    this.setState({
      items: this.state.items.map(item => updatedItem.id === item.id ? updatedItem : item),
    })
  }

  onDelete(itemId) {
    this.setState({
      items: this.state.items.filter(item => item.id !== itemId),
    });
  }

  // <BrowserRouter>
  //   <div>
  //     <ul>
  //       <li>
  //         <Link to={'${match.url}/list'}>List View</Link>
  //       </li>
  //       <li>
  //         <Link to={'${match.url}/table'}>List View</Link>       
  //       </li>
  //     </ul>
  //     <Route path={'${match.url}/list'} component={ListView}/>
  //     <Route path={'${match.url}/table'} component={TableView}/>
  //   </div>
  // </BrowserRouter>

  toggleView(){
    this.setState({
      toggleView: !this.state.toggleView
    });
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
            <ItemForm
              onSubmit={this.onFormSubmit}
              fields={this.props.fields}
            />
            <button onClick={this.toggleView}>Switch View</button>
            {!this.state.toggleView && (
              <List
                items={this.state.items}
                filter={this.state.filter}
                fields={this.props.fields}
                onFilter={this.onFilter}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            )}
            {this.state.toggleView && (
              <Table
                items={this.state.items}
                fields={this.props.fields}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

Budgets.defaultProps = {
  fields: [
    {
      name: 'summary',
      label: 'Summary',
      type: 'text',
      required: true,
    },
    {
      name: 'phase',
      label: 'Phase',
      type: 'text',
      required: true,
    },
    {
      name: 'feature',
      label: 'Feature',
      type: 'text',
    },
    {
      name: 'budgetHours.column',
      label: 'Team',
      type: 'text',
    },
    {
      name: 'budgetHours.value',
      label: 'Hours',
      type: 'number',
    },
    {
      name: 'descriptions.workplan',
      label: 'Workplan description',
      type: 'text',
      required: true,
    },
    {
      name: 'descriptions.budget',
      label: 'Budget description',
      type: 'text',
    },
    {
      name: 'descriptions.assumptions',
      label: 'Assumptions',
      type: 'text',
    },
    {
      name: 'descriptions.exclusions',
      label: 'Exclusions',
      type: 'text',
    },
    {
      name: 'tags',
      label: 'Tags',
      type: 'text',
      required: true,
    },
  ]
};

export default Budgets;
