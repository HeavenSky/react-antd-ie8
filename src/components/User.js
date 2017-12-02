import React, { Component } from 'react';
import { Input, InputNumber, Select } from 'antd';
import signature from './img/signature.png';

export default class User extends Component {
	render() {
		return (
			<div>
				<span>User...</span>
				<img src={signature} alt='signature' />
				<Input />
				<InputNumber />
				<Select />
			</div>
		);
	}
}