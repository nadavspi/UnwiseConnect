import React, { Component } from 'react';
import Item from './Item';
import ItemForm from './Item/Form';

class Budgets extends Component {
	constructor() {
		super();

    this.state = {
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

    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onAdd   = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onFormSubmit(item){
    this.onAdd(item);
  }

  onAdd(item){
    this.setState({ 
      items: [
        ...this.state.items,
        item,
      ],
    });
  }

  onEdit(item){
    console.log('Parent recieved: ' + item.summary);
    console.log('No action performed.');
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
            />
            <h2> Items </h2>
            {this.state.items.map(item => (
              <Item 
                item={item}
                onEdit={this.onEdit}
                onDelete={this.onDelete}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Budgets;
