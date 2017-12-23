import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Menu, Icon } from 'antd';

const NewLink =
	({ children, to, location: { pathname } }) =>
		pathname === to ? <a>{children}</a> :
			<Link to={to}>{children}</Link>;
const RouterLink = withRouter(NewLink);
const renderMenuItem =
	({ key, title, icon, link, ...props }) => (
		<Menu.Item
			key={key || link}
			{...props}
		>
			<RouterLink to={link || key}>
				{icon && <Icon type={icon} />}
				<span>{title}</span>
			</RouterLink>
		</Menu.Item>
	);
const renderGroupMenu =
	({ key, title, icon, link, group, ...props }) => (
		<Menu.ItemGroup
			key={key || link}
			title={
				<span>
					{icon && <Icon type={icon} />}
					<span>{title}</span>
				</span>
			}
			{...props}
		>
			{group.map(renderMenuItem)}
		</Menu.ItemGroup>
	);
const renderGroupItem = item =>
	item.group && item.group.length ?
		renderGroupMenu(item) : renderMenuItem(item);
const renderSubMenu =
	({ key, title, icon, link, sub, ...props }) => (
		<Menu.SubMenu
			key={key || link}
			title={
				<span>
					{icon && <Icon type={icon} />}
					<span>{title}</span>
				</span>
			}
			{...props}
		>
			{sub.map(renderSubItem)}
		</Menu.SubMenu>
	);
const renderSubItem = item =>
	item.sub && item.sub.length ?
		renderSubMenu(item) : renderGroupItem(item);
class NewMenu extends Component {
	constructor(props) {
		super(props);
		const { location: { pathname } } = props;
		this.state = this.getKeys(pathname);
	}
	componentWillReceiveProps =
		({ location: { pathname } }) =>
			this.setState(this.getKeys(pathname))
	getArr = arr => {
		const res = [];
		for (let i = 1; arr && i <= arr.length; i++) {
			res.push(arr.slice(0, i).join(''));
		}
		return res;
	}
	getKeys = path => {
		const res = String(path).match(/\/[^\/]+/g);
		return {
			openKeys: this.getArr(res && res.slice(0, -1)),
			selectedKeys: this.getArr(res),
		};
	}
	keySwitch = newKeys => {
		const { openKeys } = this.state;
		const newKey = newKeys.find(
			v => openKeys.indexOf(v) < 0
		);
		const menu = this.props.menus.find(
			v => v.key === newKey
		);
		this.setState({
			openKeys: !menu ? newKeys :
				newKey ? [newKey] : []
		});
	}
	render() {
		const { menus, ...props } = this.props;
		const { openKeys, selectedKeys } = this.state;
		return <Menu
			{...props}
			openKeys={openKeys}
			selectedKeys={selectedKeys}
			onOpenChange={this.keySwitch}
		>
			{menus && menus.map(renderSubItem)}
		</Menu>;
	}
}
export default withRouter(NewMenu)