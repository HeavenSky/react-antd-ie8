import React, { Component } from 'react';
import { Select, Table } from 'antd';
import { THEBUDDY_COL } from '../constants/columns';
import SVC from '../utils/service';

export default class Test extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			type: 'news',
			lang: 'cn',
			loading: false,
		};
	}
	componentDidMount = () => this.load()
	load = () => {
		this.setState({ loading: true });
		SVC.action(this.state).done(
			({ data }) => this.setState({ list: data || [] })
		).always(e => this.setState({ loading: false }));
	}
	switch = key => e => {
		this.state[key] = e && e.target ? e.target.value : e;
		this.load();
	}
	render() {
		const { list, type, lang, loading } = this.state;
		return (
			<div>
				类型：
				<Select
					disabled={loading}
					value={type}
					onChange={this.switch('type')}
				>
					<Select.Option value='news'>新闻</Select.Option>
					<Select.Option value='case'>案例</Select.Option>
					<Select.Option value='info'>资讯</Select.Option>
				</Select>
				语言：
				<Select
					disabled={loading}
					value={lang}
					onChange={this.switch('lang')}
				>
					<Select.Option value='cn'>中文</Select.Option>
					<Select.Option value='en'>英文</Select.Option>
				</Select>
				<Table
					loading={loading}
					columns={THEBUDDY_COL}
					dataSource={list}
				/>
			</div>
		);
	}
}