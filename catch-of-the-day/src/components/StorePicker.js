import React from 'react';

class StorePicker extends React.Component {
	render() {
		return (
			<form className="store-selector">
				{/* Commenting in JSX biatches - must be child of returned element */}
				<h2>Please Enter A Store</h2>
				<input type="text" required placeholder="Store Name" />
				<button type="submit">Visit Store</button>
			</form>
			)
	}
}

export default StorePicker;