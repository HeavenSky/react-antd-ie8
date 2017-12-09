import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon } from 'antd';
import { NAV_COL } from '../constants/columns';

export default class Side extends Component {
	constructor(props) {
		super(props);
		const key = props.location.pathname.slice(1);
		this.state = this.check(key) ? { key } : { key: 'home' };
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
	switch = ({ key }) => this.setState({ key })
	render = () => <Menu onClick={this.switch} selectedKeys={[this.state.key]} mode='horizontal' >
		{NAV_COL.map(
			({ key, title, icon, disabled }) => <Menu.Item key={key} disabled={disabled}>
				{
					this.state.key === key || disabled ?
						<span>
							{icon && <Icon type={icon} />}
							{title}
						</span> :
						<Link to={this.check(key) ? '/' + key : '/'}>
							{icon && <Icon type={icon} />}
							{title}
						</Link>
				}
			</Menu.Item>
		)}
	</Menu>
}