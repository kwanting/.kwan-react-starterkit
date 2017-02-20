import React from 'react';
import ReactDom from 'react-dom';

function WelcomeF() {
	return (
		<h1>Hello World! from a functional component</h1>
	);
}

class WelcomeC extends React.Component {
	constructor() {
		super();
	}

	ComponentWillMount() {

	}

	componentDidMount() {

	}

	ComponentWillUnmunt() {
		
	}

	render() {
		return (
			<h1>Hello World! from a class component</h1>
		);
	}
}

ReactDom.render(
	<div>
		<WelcomeF />
		<WelcomeC />
	</div>,
	document.getElementById("app")
);