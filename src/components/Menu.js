import React, { Component } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { Menu, Icon } from "antd";

const MARGIN_RIGHT = { marginRight: "10px" };
const IconLabel = ({ icon, label, style }) => (
	<span style={style}>
		{Boolean(icon) && <Icon
			style={MARGIN_RIGHT}
			type={icon}
		/>}
		<span>{label}</span>
	</span>
);
const CURSOR_NOTALOW = { cursor: "not-allowed" };
const CURSOR_POINTER = { cursor: "pointer" };
const CURSOR_DEFAULT = { cursor: "default" };
const getPathName = (props, notRoute) => {
	if (notRoute) {
		return location.pathname;
	} else {
		const { pathname } = props.location || {};
		return pathname;
	}
};
const NewLink = props => {
	const { disabled, to, href, children } = props;
	let style = disabled ? CURSOR_NOTALOW : CURSOR_POINTER;
	const res = { disabled };
	if (href) {
		res.href = href;
		if (href === getPathName(props, true)) {
			style = CURSOR_DEFAULT;
		}
	} else {
		res.to = to;
		if (to === getPathName(props)) {
			style = CURSOR_DEFAULT;
		}
	}
	res.style = style;
	if (style !== CURSOR_POINTER) {
		res.onClick = e => e.preventDefault();
	}
	return href ? <a {...res}>{children}</a>
		: <NavLink {...res}>{children}</NavLink>;
};
const RouterLink = withRouter(NewLink);
const renderMenuItem = item => {
	const { key, to, icon, label, ...res } = item;
	return <Menu.Item key={key} disabled={res.disabled}>
		<RouterLink to={to || key} {...res}>
			{Boolean(icon) && <Icon type={icon} />}
			<span>{label}</span>
		</RouterLink>
	</Menu.Item>;
};
const renderGroupMenu =
	({ key, icon, label, group, ...res }) => (
		<Menu.ItemGroup
			key={key}
			title={<IconLabel
				icon={icon}
				label={label}
				style={CURSOR_DEFAULT}
			/>}
			{...res}
		>
			{group.map(renderMenuItem)}
		</Menu.ItemGroup>
	);
const renderSubMenu =
	({ key, icon, label, sub, ...res }) => (
		<Menu.SubMenu
			key={key}
			title={<IconLabel
				icon={icon}
				label={label}
				style={CURSOR_POINTER}
			/>}
			{...res}
		>
			{sub.map(renderSubItem)}
		</Menu.SubMenu>
	);
const renderGroupItem = item =>
	item && item.group && item.group.length
		? renderGroupMenu(item)
		: renderMenuItem(item);
const renderSubItem = item =>
	item && item.sub && item.sub.length
		? renderSubMenu(item)
		: renderGroupItem(item);
class NewMenu extends Component {
	constructor(props) {
		super(props);
		this.state = this.getKeys(
			getPathName(props, props.notRoute)
		);
	};
	getArr = arr => {
		const res = [];
		if (arr) {
			for (let i = 1; i <= arr.length; i++) {
				res.push(arr.slice(0, i).join(""));
			}
		}
		return res;
	};
	getKeys = path => {
		const res = String(path).match(/\/[^/]+/g);
		return {
			openKeys: this.getArr(res && res.slice(0, -1)),
			selectedKeys: this.getArr(res),
		};
	};
	keySwitch = newKeys => {
		const { openKeys } = this.state;
		const newKey = newKeys.find(
			v => openKeys.indexOf(v) < 0
		);
		const menu = this.props.menus.find(
			v => v.key === newKey
		);
		this.setState({
			openKeys: !menu ? newKeys
				: newKey ? [newKey] : [],
		});
	};
	componentWillReceiveProps(newProps) {
		this.setState(this.getKeys(
			getPathName(newProps, newProps.notRoute)
		));
	};
	render() {
		const { openKeys, selectedKeys } = this.state;
		const { menus, ...res } = this.props;
		return <Menu
			onOpenChange={this.keySwitch}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			{...res}
		>
			{Boolean(menus) && menus.map(renderSubItem)}
		</Menu>;
	};
};
const RouterMenu = withRouter(NewMenu);
export default RouterMenu;