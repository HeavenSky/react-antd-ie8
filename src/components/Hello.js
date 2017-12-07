import React, { Component } from 'react';
import { DatePicker, Button, Icon, Table } from 'antd';
import { verIE } from '../utils/fns';

export default class Hello extends Component {
	componentWillMount() {
		this.state = {
			list: [],
			loading: false,
		};
		this.load();
	}
	componentDidMount() {
		const res = verIE(); // 获取IE版本信息,返回值 {ver:IE版本,mod:文档模式版本}
		if (res) {
			if (res.ver < 9 || res.mod < 9) {
				$('.ant-table-scroll .ant-table-body')
					.on('scroll', e => {
						const ev = e || window.event;
						const el = $(e.target || e.srcElement);
						const left = el.scrollLeft();
						el.siblings('.ant-table-header').scrollLeft(left);
					});
				$('.ant-table-fixed-left .ant-table-body-inner,.ant-table-scroll .ant-table-body,.ant-table-fixed-right .ant-table-body-inner')
					.on('scroll', e => {
						const ev = e || window.event;
						const el = $(e.target || e.srcElement);
						const top = el.scrollTop();
						const table = el.parents('.ant-table').eq(0);
						table.find('.ant-table-fixed-left .ant-table-body-inner').scrollTop(top);
						table.find('.ant-table-scroll .ant-table-body').scrollTop(top);
						table.find('.ant-table-fixed-right .ant-table-body-inner').scrollTop(top);
					});
			}
		}
	}
	load = e => {
		this.setState({ loading: true });
		$.get('/askme/getinfo.php').done(
			({ data, info, success, type }) =>
				success && data && data.length && this.setState({ list: data })
		).always(e => this.setState({ loading: false }))
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
					title: x,
					dataIndex: x,
					key: x,
				});
			}
		}
		columns.push({
			title: '操作',
			key: 'action',
			render: (v, record, idx) => <span>
				<Icon type='info-circle primary' />
				<Icon type='check-circle primary' />
				<Icon
					type='cross-circle danger'
					onClick={e =>
						this.setState({ data: data.splice(idx, 1).slice() })
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
				<DatePicker />
				<DatePicker.RangePicker />
				<DatePicker.RangePicker showTime format='yyyy/MM/dd HH:mm:ss' />
				<Button type='primary' disabled={loading} onClick={this.load}>重新加载</Button>
				<Table loading={loading} columns={this.cols(list)} dataSource={list} scroll={{ x: 800, y: 200 }} />
			</div>
		);
	}
}