import React, { Component } from 'react';

// 一些和路由无关的组件可以放这里
export default class Wrap extends Component {
	render() {
		const { children } = this.props;
		return (
			<div>
				{children}
			</div>
		);
	}
}