import React, { Component } from 'react';
import { Carousel, Select, Table } from 'antd';
import { THEBUDDY_COL } from '../constants/columns';

const Option = Select.Option;
const rowSelection = {
	onChange(selectedRowKeys, selectedRows) { },
	onSelect(record, selected, selectedRows) { },
	onSelectAll(selected, selectedRows, changeRows) { },
};

export default class Test extends Component {
	componentWillMount() {
		this.state = {
			list: [],
			type: 'news',
			lang: 'cn',
			loading: false,
		};
		this.load();
	}
	load = () => {
		this.setState({ loading: true });
		const { type, lang } = this.state;
		$.ajax({
			url: '/action/ajax.php',
			data: { type, lang, show: 'json' }
		}).done(
			({ data, info, success, type }) =>
				success && data && data.length && this.setState({ list: data })
			).always(e => this.setState({ loading: false }))
	}
	switch = key => e => {
		this.state[key] = e && e.target ? e.target.value : e;
		this.load();
	}
	render() {
		const { list, type, lang, loading } = this.state;
		return (
			<div>
				<span>Test...</span>
				<Carousel autoplay>
					<div><h3>1</h3></div>
					<div><h3>2</h3></div>
					<div><h3>3</h3></div>
					<div><h3>4</h3></div>
				</Carousel>
				类型：
				<Select disabled={loading} value={type} onChange={this.switch('type')}>
					<Option value='news'>新闻</Option>
					<Option value='case'>案例</Option>
					<Option value='info'>资讯</Option>
				</Select>
				语言：
				<Select disabled={loading} value={lang} onChange={this.switch('lang')}>
					<Option value='cn'>中文</Option>
					<Option value='en'>英文</Option>
				</Select>
				<Table rowSelection={rowSelection} loading={loading} columns={THEBUDDY_COL} dataSource={list} />
			</div>
		);
	}
}