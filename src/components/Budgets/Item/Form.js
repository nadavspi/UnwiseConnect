import React, { Component } from 'react';
import nanoid from 'nanoid';

export default class ItemForm extends Component {
	constructor(props) {
		super(props);

    this.state = {
      item: {
        ...props.item,
        column: props.item.budgetHours.column,
        value: props.item.budgetHours.value,
        workplan: props.item.descriptions.workplan,
        assumptions: props.item.descriptions.assumptions,
        exclusions: props.item.descriptions.exclusions,
        budget: props.item.descriptions.budget,
      }
    };  

    this.flatten(this.state.item);

    // this.flatten = this.flatten.bind(this);
    this.clearState = this.clearState.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onCancel = this.onCancel.bind(this);

  }

  flatten(item){
    let flatItem = item;

    console.log('Flattened!');
    return flatItem;
  }

  clearState(){
    this.setState({
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
    });
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

    let item = this.state.item;
    
    item.budgetHours.column = item.column;
    item.budgetHours.value = item.value;

    item.descriptions.workplan = item.workplan;
    item.descriptions.assumptions = item.assumptions;
    item.descriptions.exclusions = item.exclusions;
    item.descriptions.budget = item.budget;

    // item: {
    //   item,
    //   [group]: {
    //     [name]: item[name],
    //   }
    // }
    
    // const fields = [
    //   {
    //     name: 'summary',
    //     label: 'Summary',
    //     type: 'text',
    //     required: true,
    //   },
    //   {
    //     name: 'phase',
    //     label: 'Phase',
    //     type: 'text',
    //     required: true,
    //   },
    //   {
    //     name: 'feature',
    //     label: 'Feature',
    //     type: 'text',
    //   },
    //   {
    //     name: 'column',
    //     label: 'Team',
    //     type: 'text',
    //     group: 'budgetHours',
    //   },
    //   {
    //     name: 'value',
    //     label: 'Hours',
    //     type: 'number',
    //     group: 'budgetHours',
    //   },
    //   {
    //     name: 'workplan',
    //     label: 'Workplan description',
    //     type: 'text',
    //     group: 'descriptions',
    //     required: true,
    //   },
    //   {
    //     name: 'budget',
    //     label: 'Budget description',
    //     type: 'text',
    //     group: 'descriptions',
    //   },
    //   {
    //     name: 'assumptions',
    //     label: 'Assumptions',
    //     type: 'text',
    //     group: 'descriptions',
    //   },
    //   {
    //     name: 'exclusions',
    //     label: 'Exclusions',
    //     type: 'text',
    //     group: 'descriptions',
    //   },
    //   {
    //     name: 'tags',
    //     label: 'Tags',
    //     type: 'text',
    //     required: true,
    //   },
    // ];
    
    // let field, group;
    // let groups = [];

    // for(let i = 0; i < fields.length; i++){
    //   field = fields[i];
      
    //   if(field.group != null){
    //     console.log('Field Name: ', field.name);
    //     console.log('Field Value: ', item[field.name]);
    //     group = field.group;
    //     if(groups[group] == null){
    //       console.log('new group', groups[group]);
    //       groups[group] = {
    //         [field.name]: item[field.name]
    //       };
    //     } else {
    //       console.log('existing group', groups[group]);
    //       groups[group] = {
    //         ...groups[group], 
    //         [field.name]: item[field.name],
    //       };
    //     }
    //     groups[field.group][field.name] = item[name];
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
	}

	render() {
    const fields = [
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
        label: 'Column',
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
        group: 'description',
        required: true,
      },
      {
        name: 'budget',
        label: 'Budget description',
        type: 'text',
        group: 'description',
      },
      {
        name: 'assumptions',
        label: 'Assumptions',
        type: 'text',
        group: 'description',
      },
      {
        name: 'exclusions',
        label: 'Exclusions',
        type: 'text',
        group: 'description',
      },
      {
        name: 'tags',
        label: 'Tags',
        type: 'text',
        required: true,
      },
    ];

    const submitBtnLabel = this.props.isEditing ? 'Save Edit' : 'Add Item';

		return (
			<div>
				<form onSubmit={this.onSubmit}>
					<div className="input-group input-group-sm">						
            {fields.map((field) => (
              <div>
                <label htmlFor={field.name}>{field.label}</label>
                <input 
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
