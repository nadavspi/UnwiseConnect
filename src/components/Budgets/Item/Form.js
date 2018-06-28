import React, { Component } from 'react';
import nanoid from 'nanoid';

export default class ItemForm extends Component {
	constructor(props) {
		super(props);

    let groups = this.flatten(props.item);

    this.state = {
      item: {
        ...props.item,
        ...groups,
      },   
    }; 

    this.clearState = this.clearState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);

  }

  flatten(item){
    const groups = {
        column: item.budgetHours.column,
        value: item.budgetHours.value,
        workplan: item.descriptions.workplan,
        assumptions: item.descriptions.assumptions,
        exclusions: item.descriptions.exclusions,
        budget: item.descriptions.budget,
    };

    return groups;    
  }

  clearState(){
    this.setState({ });
  }

  onCancel(){
    this.props.onSubmit(this.props.item);
  }

  onChange(name, value){
    this.setState({ 
      item: {
        ...this.state.item,
        [name]: value,
      },
    });
	}
	
	onSubmit(event){
		event.preventDefault();

    let nextItem = { ...this.state.item };
    
    nextItem.budgetHours.column = nextItem.column;
    nextItem.budgetHours.value = nextItem.value;

    nextItem.descriptions.workplan = nextItem.workplan;
    nextItem.descriptions.assumptions = nextItem.assumptions;
    nextItem.descriptions.exclusions = nextItem.exclusions;
    nextItem.descriptions.budget = nextItem.budget;

    // item: {
    //   item,
    //   [group]: {
    //     [name]: item[name],
    //   }
    // }
    
    
    // let field, group;
    // let groups = [];

    // for(let i = 0; i < fields.length; i++){
    //   field = fields[i];
    //   if(field.group != null){
    //     groups[field.group] = {
    //       groups[field.group],
    //       [field.name]: item[field.name],
    //     }; 
    //   }
    // }
    // console.log('Groups: ', groups);

    // this.setState({
    //   item: {
    //     ...item,
    //     groups,
    //   }
    // })
    
		this.props.onSubmit(this.state.item);
    this.clearState();
    // Focus on the first input
    this.refs[this.props.fields[0].name].focus();
	}

	render() {
    const { fields } = this.props;
    const submitBtnLabel = this.props.isEditing ? 'Save Edit' : 'Add Item';

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="input-group input-group-sm">						
            {fields.map((field) => (
              <div>
                <label htmlFor={field.name}>{field.label}</label>
                <input 
                  ref={field.name}
                  onChange={e => this.onChange(field.name, e.target.value)}
                  type={field.type}
                  value={this.state.item[field.name]}
                  required={field.required}
                  key={field.name}
                />
              </div>
            ))}
						<button type="submit" className="btn btn-primary">{submitBtnLabel}</button>
            {this.props.isEditing && (
              <button onClick={this.onCancel} className="btn btn-primary">Cancel</button>
				    )}
          </div>
				</form>
			</div>
		)
	}
}

ItemForm.defaultProps = {
  item: {
    id: nanoid(),
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

    column: "",
    value: 0,
    workplan: [],
    budget: [],
    assumptions: [],
    exclusions: [],  
  },
  isEditing: false,
};
