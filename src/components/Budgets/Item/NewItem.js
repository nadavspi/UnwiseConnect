import React, { Component } from 'react';

export default class NewItem extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// create a new item the append it to the list
	handleSubmit(event){
		event.preventDefault();
		console.log("Submit sent.");
	}

	render() {
		return (
			<div>
				<form onSubmit={this.handleSubmit}>
					<div><label>Item ID</label></div>
					<div className="input-group input-group-sm">
						<input 	id=""
										type=""
										className="form-control"
										placeholder="item"
										/>
						<input 	id=""
										type=""
										className="form-control"
										placeholder="item"
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
