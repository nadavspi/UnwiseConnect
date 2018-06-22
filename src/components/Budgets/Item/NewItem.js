import React, { Component } from 'react';

export default class NewItem extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event){
		// const target = event.target;
		// const value = target.value;
		// const id = target.id;
		// console.log('ID: ' + id);
		// console.log('Value: ' + value);
		// this.setState({[id]: value});
	}
	
	handleSubmit(event){
		event.preventDefault();
		const data = new FormData(event.target);
		console.log("Before Upstream: " + data.get('summary'));
		const newItem = {
			summary: data.get('summary'),
			phase: data.get('phase'),
			feature: data.get('feature'),
			budgetHours: {
				column: data.get('budgetColumn'),
				value: data.get('budgetValue'),
			},
			descriptions: {
				workplan: [ 
					data.get('workplan')
				],
				budget: [ 
					data.get('budget')
				],
				assumptions: [ 
					data.get('assumptions')
				],
				exclusions: [ 
					data.get('exclusions')
				],

			},
			tags: data.get('tags')
		};
		this.props.onSubmit(newItem);
	}

						// <input name={this.attribute}
						// 				type="text"
						// 				className="form-control"
						// 				placeholder="item"
						// 				defaultValue="testSum"
						// 				onChange={this.handleChange}
						// />


	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div><label>Item ID</label></div>
					<div className="input-group input-group-sm">						
						<input 	name="summary"
										type="text"
										className="form-control"
										placeholder="item"
										defaultValue="testSum"
										onChange={this.handleChange}
						/>
						<input 	name="phase"
										type="text"
										className="form-control"
										placeholder="item"
										value="testPhase"
										onChange={this.handleChange}
						/>
						<input 	name="feature"
										type="text"
										className="form-control"
										placeholder="item"
										value="testFeat"
										onChange={this.handleChange}
						/>
						<input 	name="budgetColumn"
										type="text"
										className="form-control"
										placeholder="item"
										value="testColumn"
										onChange={this.handleChange}
						/>
						<input 	name="budgetHours"
										type="text"
										className="form-control"
										placeholder="item"
										value="testHours"
										onChange={this.handleChange}
						/>
						<input 	name="workplan"
										type="text"
										className="form-control"
										placeholder="item"
										value="testWork"
										onChange={this.handleChange}
						/>
						<input 	name="budget"
										type="text"
										className="form-control"
										placeholder="item"
										value="testBudget"
										onChange={this.handleChange}
						/>
						<input 	name="assumptions"
										type="text"
										className="form-control"
										placeholder="item"
										value="testAssump"
										onChange={this.handleChange}
						/>
						<input 	name="exclusions"
										type="text"
										className="form-control"
										placeholder="item"
										value="testExc"
										onChange={this.handleChange}
						/>
						<input 	name="tags"
										type="text"
										className="form-control"
										placeholder="item"
										value="testTag"
										onChange={this.handleChange}
						/>						

						<div className="input-group-btn">
							<button type="submit" className="btn btn-primary">Add Item</button>
						</div>
					</div>
				</form>
			</div>
		)
	}
}
