import React, { Component } from "react";
import { Button, Icon, Table, Cascader } from "antd";
import { shimAntdTable } from "../utils/antd";
import { $get } from "../utils/fns";

class Hello extends Component {
	state = {
		list: [],
		loading: false,
		options: [],
	};
	cols = data => {
		const columns = [{
			key: "idx",
			title: "序号",
			fixed: "left",
			render: (v, r) => data.indexOf(r) + 1,
		}, {
			key: "act",
			title: "操作",
			fixed: "right",
			render: (v, r) => <span>
				<Icon type="copy primary" />
				<Icon type="edit primary" />
				<Icon
					type="delete danger"
					onClick={
						e => {
							const i = data.indexOf(r);
							const list = data.slice();
							list.splice(i, 1);
							this.setState({ list });
						}
					} />
			</span>,
		}];
		if (data && data[0]) {
			for (let x in data[0]) {
				columns.splice(-1, 0, {
					title: x,
					dataIndex: x,
					key: x,
				});
			}
		}
		return columns;
	};
	load = () => {
		this.setState({ loading: true });
		$get("static/patent.json").done(
			list => this.setState({ list })
		).always(
			() => this.setState({ loading: false })
		);
	};
	componentDidMount() {
		$get("static/division.json").done(
			options => this.setState({ options })
		);
		this.load();
	};
	componentDidUpdate = shimAntdTable;
	render() {
		const { list, loading, options } = this.state;
		return <div>
			<Cascader className="wd200" options={options} showSearch />
			<Button
				className="offset"
				type="primary"
				disabled={loading}
				onClick={this.load}
			>重新加载</Button>
			<Table
				loading={loading}
				columns={this.cols(list)}
				dataSource={list}
				scroll={{ x: 800, y: 200 }}
			/>
		</div>;
	};
};
export default Hello;