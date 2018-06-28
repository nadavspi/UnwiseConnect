import React, { Component } from 'react';
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
  }

  onFilter({ field = this.state.filter.field, value = this.state.filter.value }) {
    this.setState({
      items: this.state.items.map((item) => (
        {
          ...item,
          isVisible: item[field].toLowerCase().includes(value.toLowerCase()),
        }
      )),
      filter: {
        field,
        value,
      }
    });  
  }

  onFormSubmit(item){
    this.onAdd(item);
  }

  onAdd(item){
    item = {
      ...item,
      isVisible:item[this.state.filter.field].toLowerCase().includes(this.state.filter.value),
    }

    this.setState({ 
      items: [
        ...this.state.items,
        item,
      ],
    });
  }

  onEdit(updatedItem){
    updatedItem = {
      ...updatedItem,
      isVisible:updatedItem[this.state.filter.field].toLowerCase().includes(this.state.filter.value),
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
            <h2> Items </h2>
            <SearchBar 
              filter={this.state.filter}
              onFilter={this.onFilter}
            />
            {this.state.items.map(item => 
              item.isVisible && (
              <Item 
                item={item}
                fields={this.props.fields}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
                key={item.id}
              />
            ))}
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
      name: 'column',
      label: 'Team',
      type: 'text',
      group: 'budgetHours',
    },
    {
      name: 'value',
      label: 'Hours',
      type: 'number',
      group: 'budgetHours',
    },
    {
      name: 'workplan',
      label: 'Workplan description',
      type: 'text',
      group: 'descriptions',
      required: true,
    },
    {
      name: 'budget',
      label: 'Budget description',
      type: 'text',
      group: 'descriptions',
    },
    {
      name: 'assumptions',
      label: 'Assumptions',
      type: 'text',
      group: 'descriptions',
    },
    {
      name: 'exclusions',
      label: 'Exclusions',
      type: 'text',
      group: 'descriptions',
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
