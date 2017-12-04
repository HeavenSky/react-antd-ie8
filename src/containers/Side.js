import React, { Component } from 'react';
import { Menu, Icon } from 'antd';

import { NAV_COL } from '../constants/columns';

// 根据不同的路由显示状态
export default class Side extends Component {
	componentWillMount() {
		const { location: { pathname } } = this.props;
		const key = pathname.slice(1);
		this.state = { key: this.check(key) ? key : 'home' };
	}
	componentWillReceiveProps(nextProps) {
		const key = nextProps.location.pathname.slice(1);
		if (this.check(key)) {
			this.setState({ key });
		} else {
			this.setState({ key: 'home' });
		}
	}
	check = key => NAV_COL.find(v => v.key === key) && key !== 'home'
	switch = ({ key }) => {
		const { history } = this.props;
		if (this.check(key)) {
			history.push('/' + key);
			this.setState({ key });
		} else {
			history.push('/');
			this.setState({ key: 'home' });
		}
	}
	render() {
		const { key } = this.state;
		return (
			<Menu onClick={this.switch} selectedKeys={[key]} mode='horizontal' >
				{NAV_COL.map(
					({ key, title, icon, disabled }) => <Menu.Item key={key} disabled={disabled}>
						{icon && <Icon type={icon} />}
						{title}
					</Menu.Item>
				)}
			</Menu>
		);
	}
}