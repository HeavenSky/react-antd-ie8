import React, { Component } from 'react';
import { Button, Icon, Table } from 'antd';
import { shimAntdTable } from '../utils/fns';
import SVC from '../utils/service';

export default class Hello extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			loading: false,
		};
	}
	componentDidMount = () => this.load()
	componentDidUpdate = shimAntdTable
	load = e => {
		this.setState({ loading: true });
		SVC.askme().done(
			({ data }) => this.setState({ list: data || [] })
		).always(e => this.setState({ loading: false }));
	}
	cols = data => {
		const columns = [{
			title: '序号',
			key: 'index',
			render: (v, record, idx) => idx + 1
		}];
		if (data && data.length) {
			for (let x in data[0]) {
				columns.push({
					title: 'title:' + x,
					dataIndex: x,
					key: 'key-' + x,
				});
			}
		}
		columns.push({
			title: '操作',
			key: 'action',
			render: (v, record, idx) => <span>
				<Icon type='copy primary' />
				<Icon type='edit primary' />
				<Icon
					type='delete danger'
					onClick={
						e => {
							const list = data.slice();
							list.splice(idx, 1);
							this.setState({ list });
						}
					} />
			</span>
		});
		if (columns.length) {
			columns[0].fixed = 'left';
			columns[columns.length - 1].fixed = 'right';
		}
		return columns;
	}
	render() {
		const { list, loading } = this.state;
		return (
			<div>
				<Button type='primary' disabled={loading} onClick={this.load}>重新加载</Button>
				<Table loading={loading} columns={this.cols(list)} dataSource={list} scroll={{ x: 800, y: 200 }} />
			</div>
		);
	}
}