import React from 'react';
import Home from '../../views/Home/Home';

export default class App extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		return (
			<div>
				<h2>Hello World</h2>
				<Home />
			</div>
		)
	}
}