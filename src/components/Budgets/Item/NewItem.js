import React, { Component } from 'react';

export default class NewItem extends Component {
	constructor() {
		super();
		this.handleSubmit = this.handleSubmit.bind(this);
		this.state={clicks: 1}
	}

	// create a new item the append it to the list
	handleSubmit(event){
		event.preventDefault();
		this.setState({clicks: this.state.clicks + 1});
		console.log(this.state.clicks + " submissions sent.");
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
