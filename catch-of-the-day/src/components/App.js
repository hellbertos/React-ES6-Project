import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

import base from '../base';

class App extends React.Component {
	constructor() {
		super();

		// Bind addFish method to App Class
		this.addFish = this.addFish.bind(this);

		this.updateFish = this.updateFish.bind(this);

		// Bind removeFish to App Class
		this.removeFish = this.removeFish.bind(this);

		// Bind loadSamples to App Class
		this.loadSamples = this.loadSamples.bind(this);

		// Bind addToOrder to App Class
		this.addToOrder = this.addToOrder.bind(this);

		// Bind removeFromOrder to App Class
		this.removeFromOrder = this.removeFromOrder.bind(this);




		// Set Initial State
		// Similar to getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
	}

// React Method - only invoked once
// Lifecycle Hook - hook in right before render to sync state
// Connect to Firebase via Rebase >> base
componentWillMount() {
	// Runs immediately before App is rendered
	this.ref = base.syncState(this.props.params.storeId+'/fishes',
			{
				context: this,
				state: 'fishes'
			}
		);
	// check if any Order data in localStorage
	const localStorageRef = localStorage.getItem('order-'+this.props.params.storeId);

	if(localStorageRef) {
		// Update App Order state
		this.setState({

			order: JSON.parse(localStorageRef)
		});
	}
}

// React Method
// Lifecycle Hook - unhook from previous binding
componentWillUnmount() {
	base.removeBinding(this.ref);
}


// Use Local Storage for Order state
// JSON stringify b/c localStorage doesn't accept objects
componentWillUpdate(nextProps, nextState) {
	localStorage.setItem('order-'+this.props.params.storeId, JSON.stringify(nextState.order));
}


addFish(fish) {
	// update fishes state

	// the '...' will 'spread' the data in to the new object
	// Basically it just makes a copy of the current state object
	const fishes = {...this.state.fishes};

	// add in our new fish
	// use time stamp for unique ID
	const timestamp = Date.now();
	fishes['fish-'+timestamp] = fish;

	// set new state
	// ES6 allows shorthand for ({fishes: fishes}) to below
	this.setState({fishes})
}

updateFish(key, updatedFish) {
	const fishes = {...this.state.fishes};
	fishes[key] = updatedFish;
	this.setState({ fishes });

}

removeFish(key) {
	const fishes = {...this.state.fishes};
	// Due to Firebase, must set the deleted fish (object) to null
	fishes[key] = null;
	this.setState({ fishes });
}

loadSamples() {
	this.setState({
		fishes: sampleFishes
	})
}

addToOrder(key) {
	// take a copy of state
	const order = {...this.state.order};
	// update or add number of fish ordered
	order[key] = order[key] + 1 || 1;
	// update state
	this.setState({ order });

}

removeFromOrder(key) {
	const order = {...this.state.order};
	// order[key] = null; Because not Firebase, can use 'delete'
	delete order[key];
	this.setState({ order });
}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
						<ul className="list-of-fishes">
							{/* Use Object.keys to get an array of entries from object
								Use "map() to loop over each item in resulting array
								Use details from React to access the inner object properties

								Use INDEX attr to pass KEY down to Fish component
								to use for dynamic state updates
							 */}
							{
								Object.keys(this.state.fishes)
								.map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} />)
							}
						</ul>
				</div>
				<Order fishes={this.state.fishes} order={this.state.order} params={this.props.params} removeFromOrder={this.removeFromOrder} />
				<Inventory 
					addFish={this.addFish}
					loadSamples={this.loadSamples}
					fishes={this.state.fishes} 
					updateFish={this.updateFish}
					removeFish={this.removeFish}
				/>
			</div>
		)
	}
}

export default App;