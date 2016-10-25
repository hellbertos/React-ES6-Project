import React from 'react';
import {getFunName} from '../helpers';

class StorePicker extends React.Component {
	/* Bind a single instance to the component ref'ed by all
	 *
	 * Inline example below binds a single instance to each use
	 * killing performance if used many times
	 *
		constructor() {
			super();
			this.goToStore = this.goToStore.bind(this);
		}
	*/

	goToStore(event) {
		event.preventDefault();
		console.log('You chagned url');
		// get the text from the form field
		const storeId = this.storeInput.value;
		console.log('Going to '+storeId);
		//
		this.context.router.transitionTo('/store/'+storeId);

	}

	render() {
		return (
			<form className="store-selector" onSubmit={ (e) => this.goToStore(e)} >
				{/* Less verbose way to bind this to Parent Component
					 onSubmit={this.goToStore.bind(this)} 
				 */}
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" defaultValue={getFunName()} ref={(input) => {this.storeInput = input}} />
				<button type="submit">Visit a Store</button>
			</form>
			)
	}
}

/* Need to 'surface' the router from the Parent (App.js) to have
 * access to 'transitionTo()' method to change url
 *
*/
StorePicker.contextTypes = {
	router: React.PropTypes.object
}

export default StorePicker;