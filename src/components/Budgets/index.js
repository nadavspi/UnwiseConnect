import React, { Component } from 'react';
import Item from './Item';
import NewItem from './Item/NewItem';

class Budgets extends Component {
	constructor() {
		super();

    this.handleNewItemSubmit = this.handleNewItemSubmit.bind(this);
    this.onEdit = this.onEdit.bind(this);
    this.onDelete = this.onDelete.bind(this);

    this.state = {
      items: [
        {
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
  }

  handleNewItemSubmit(item){
    console.log('New Item: ', item);
    this.setState({ 
      items: [
        ...this.state.items,
        item,
      ],
    });
  }

  onEdit(key){
    console.log(key + ' edited');
  }

  onDelete(key){
    const currentList = [...this.state.items];

    // pick up here
    let newList = [];
    currentList.map(item => {
      if(item.summary !== key){
        newList = [
          ...newList,
          item
        ];
        return item;
      } 
    });

    
    this.setState({
      items: [
        ...newList
      ],
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
            <NewItem onSubmit={this.handleNewItemSubmit}/>
            <h2> Items </h2>
            {this.state.items.map(item => (
              <Item 
                budgetHours={item.budgetHours}
                descriptions={item.descriptions}
                feature={item.feature}
                key={item.summary}
                phase={item.phase}
                summary={item.summary} 
                tags={item.tags}
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
