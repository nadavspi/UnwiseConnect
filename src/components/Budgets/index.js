import React, { Component } from 'react';
import Item from './Item';
import NewItem from './Item/NewItem';

class Budgets extends Component {
	constructor() {
		super();

    this.setEdit  = this.setEdit.bind(this);
    this.handleNewSubmit = this.handleNewSubmit.bind(this);
    this.onEdit   = this.onEdit.bind(this);
    this.onAdd   = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);

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
      activeEdit: false,
      editItem: {
          summary:  "",
          phase:    "",
          feature:  "",
          budgetHours: { 
            column: "",
            value: 0,
          },
          descriptions: {
            workplan: [],
            budget: [],
            assumptions: [],
            exclusions: [],
          },
          tags: "",
      },
    };
  }

  setEdit(bool, itemKey){
    const index = this.indexByKey(itemKey)
    const editItem = this.state.items[index];

    this.setState({
      activeEdit: bool,
      editItem: {
          summary:  editItem.summary,
          phase:    editItem.phase,
          feature:  editItem.feature,
          budgetColumn: editItem.budgetHours.column,
          budgetValue: editItem.budgetHours.value,
          workplan: [editItem.descriptions.workplan],
          budget: [editItem.descriptions.budget],
          assumptions: [editItem.descriptions.assumptions],
          exclusions: [editItem.descriptions.exclusions],
          tags: editItem.tags,
      },
    }); 
    console.log('Edit: ', this.state.activeEdit);
  }

  indexByKey(key){
    let index = -1;
    let i = 0;
    this.state.items.map(item => (item.summary == key) ? index = i : i++);
    
    return index;
  }

  handleNewSubmit(item){
    console.log('Item: ', item);
    if(this.state.activeEdit){
      this.onEdit(item);
    } else {
      this.onAdd(item);
    }
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
    const index = this.indexByKey(item.summary);

    this.setState({
        items: [
          ...this.state.items.slice(0,index),
          item,
          ...this.state.items.slice(index + 1)
        ],
        activeEdit: false,
        editItem: {
          summary:  "",
          phase:    "",
          feature:  "",
          budgetColumn: "",
          budgetValue: 0,
          workplan: [],
          budget: [],
          assumptions: [],
          exclusions: [],
          tags: "",
      },
      }
    )
    console.log(item.summary + ' edited');
  }

  onDelete(key){
    const index = this.indexByKey(key);
    
    this.setState({
      items: [
        ...this.state.items.slice(0, index),
        ...this.state.items.slice(index + 1),
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
            <NewItem  
              onSubmit={this.handleNewSubmit}
              activeEdit={this.state.activeEdit}
              editItem={this.state.editItem}
            />
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
                setEdit={this.setEdit}
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
