import React from 'react';
import {formatPrice} from '../helpers';

class Fish extends React.Component {
	render() {
		const details = this.props.details;
		// ES6 "Destructuring" const {details} = this.props
		// Can do the same thing for addToOrder index
		
		const isAvailable = details.status === 'available';
		const buttonText = isAvailable ? 'Add To Order' : 'Sold Out';
		// ES6 "Destructuring" const {details} = this.props
		return (
			<li className="menu-fish">
				<img src={details.image} />
				<h3 className="fish-name">
					{details.name}
					<span className="price">{formatPrice(details.price)}</span>
				</h3>
				<p>{details.desc}</p>
				<button onClick={() => this.props.addToOrder(this.props.index)} disabled={!isAvailable}>{buttonText}</button>
			</li>
			)
	}
}

export default Fish;