import React from 'react';

export default class Clock extends React.Component {
	constructor(){
		super()
		this.state = {
			now: new Date().toString()
		}
	}

	componentWillMount() {
		var _this = this;
		this.timer = setInterval(function(){
			_this.setState({
				now: new Date().toString()
			})
		}, 1000)
	}

	componentWillUnmount() {
		clearInterval(this.timer)
	}

	render() {
		return (
			<div>{this.state.now}</div>
		)
	}
}