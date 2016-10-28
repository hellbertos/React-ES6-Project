import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';

class App extends React.Component {
	constructor() {
		super();

		// Bind addFish method to App Class
		this.addFish = this.addFish.bind(this);

		// Bind loadSamples to App Class
		this.loadSamples = this.loadSamples.bind(this);


		// Set Initial State
		// Similar to getInitialState
		this.state = {
			fishes: {},
			order: {}
		};
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

loadSamples() {
	this.setState({
		fishes: sampleFishes
	})
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
							 */}
							{
								Object.keys(this.state.fishes)
								.map(key => <Fish key={key} details={this.state.fishes[key]} />)
							}
						</ul>
				</div>
				<Order />
				<Inventory addFish={this.addFish} loadSamples={this.loadSamples} />
			</div>
		)
	}
}

export default App;