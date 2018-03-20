import React, { Component } from "react";
import { Link, NavLink, withRouter } from "react-router-dom";
import { Menu, Popconfirm, Tooltip, Breadcrumb } from "antd";
import "./Menu.less";

const CFG_URLS = {}; // key: { type, to, href, target, label, icon, disabled },
const CFG_MENUS = []; // { key, type, hidden, children: [{ key, type, children, hidden }] },
const CURSOR_DEFAULT = "default";
const CURSOR_POINTER = "pointer";
const CURSOR_NOTALOW = "not-allowed";
const Icon = ({ type, className, ...res }) => {
	let cls = className || "";
	cls += /^\s+/.test(type) ? type
		: " anticon anticon-" + type;
	return <i className={cls} {...res} />;
};
const LinkItem =
	({ link, pathname, cursor = CURSOR_DEFAULT, gutter = 10 }) => {
		const { type, icon, label, title, confirm, children, ...res } = link || {};
		const fn = res.onClick;
		if (res.disabled) {
			cursor = CURSOR_NOTALOW;
		} else if (/^a$/i.test(type)) {
			cursor = window.location.pathname === res.href
				? CURSOR_DEFAULT : CURSOR_POINTER;
		} else if (/^(link|navlink)$/i.test(type)) {
			cursor = pathname === res.to
				? CURSOR_DEFAULT : CURSOR_POINTER;
		} else if (fn) {
			cursor = CURSOR_POINTER;
		} else if (/^span$/i.test(type)) {
			cursor = CURSOR_DEFAULT;
		}
		res.style = Object.assign({ cursor }, res.style);
		if (confirm) {
			res.onClick = e => e.preventDefault();
		} else if (cursor !== CURSOR_POINTER) {
			res.onClick = e => {
				fn && fn();
				e.preventDefault();
			};
		}
		const near = label ? { marginRight: gutter + "px" } : null;
		const ico = icon ? <Icon type={icon} style={near} /> : "";
		const txt = icon && label && typeof label === "string"
			? <span>{label}</span> : label || "";
		let node = /^link$/i.test(type) ? <Link {...res}>{ico}{txt}</Link>
			: /^navlink$/i.test(type) ? <NavLink {...res}>{ico}{txt}</NavLink>
				: /^a$/i.test(type) || fn ? <a {...res}>{ico}{txt}</a>
					: <span {...res}>{ico}{txt}</span>;
		if (title) {
			const tip = {
				title,
				placement: "top",
				arrowPointAtCenter: true,
			};
			node = <Tooltip {...tip}>{node}</Tooltip>;
		}
		if (confirm) {
			const pop = {
				placement: "topRight",
				title: confirm,
				arrowPointAtCenter: true,
				cancelText: "取消",
				okText: "确定",
				onConfirm: fn,
			};
			node = <Popconfirm {...pop}>{node}</Popconfirm>;
		}
		return node;
	};
const renderMenuItem =
	(menu, urls = CFG_URLS, pathname) => {
		const { key, children, hidden, ...res } = menu || {};
		const item = Object.assign({ key, to: key }, urls[key]);
		const { disabled } = item;
		return hidden ? false : <Menu.Item
			key={key}
			disabled={disabled}
			{...res}>
			<LinkItem
				key={key}
				link={item}
				pathname={pathname}
				cursor={CURSOR_POINTER}
			/>
		</Menu.Item>;
	};
const renderGroupItem =
	(menu, urls = CFG_URLS, pathname) => {
		const { key, children, hidden, ...res } = menu || {};
		const item = Object.assign({ key, to: key }, urls[key]);
		const { disabled } = item;
		return hidden ? false : <Menu.ItemGroup
			title={<LinkItem
				key={key}
				link={item}
				pathname={pathname}
			/>}
			key={key}
			disabled={disabled}
			{...res}
		>
			{children.map(
				v => renderMenuItem(v, urls, pathname)
			)}
		</Menu.ItemGroup>;
	};
const renderSubMenu =
	(menu, urls = CFG_URLS, pathname) => {
		const { key, children, hidden, ...res } = menu || {};
		const item = Object.assign({ key, to: key }, urls[key]);
		const { disabled } = item;
		return hidden ? false : <Menu.SubMenu
			title={<LinkItem
				key={key}
				link={item}
				pathname={pathname}
				cursor={CURSOR_POINTER}
			/>}
			key={key}
			disabled={disabled}
			{...res}
		>
			{children.map(
				v => renderMenuList(v, urls, pathname)
			)}
		</Menu.SubMenu>;
	};
const renderGroupMenu =
	(menu, urls = CFG_URLS, pathname) => {
		const { type, children } = menu || {};
		return /group/i.test(type) &&
			children && children.length
			? renderGroupItem(menu, urls, pathname)
			: renderMenuItem(menu, urls, pathname);
	};
const renderMenuList =
	(menu, urls = CFG_URLS, pathname) => {
		const { type, children } = menu || {};
		return /sub/i.test(type) &&
			children && children.length
			? renderSubMenu(menu, urls, pathname)
			: renderGroupMenu(menu, urls, pathname);
	};
class WrapMenu extends Component {
	constructor(props) {
		super(props);
		this.state = this.getKeys(props);
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
	getKeys = props => {
		const { urls = CFG_URLS, SubMenuEnterClose, location: { pathname } } = props;
		let key;
		for (let x in urls) {
			const { type, to = x, href } = urls[x];
			if (/^(link|navlink)$/i.test(type) &&
				pathname === to) {
				key = x;
				break;
			} else if (/^a$/i.test(type) &&
				window.location.pathname === href) {
				key = x;
				break;
			} else {
				const idx = pathname.indexOf(to);
				idx === 0 && (!key || key < x) && (key = x);
			}
		}
		const res = (key || "").match(/\/[^/]+/g) || [];
		return {
			openKeys: SubMenuEnterClose ? []
				: this.getArr(res.slice(0, -1)),
			selectedKeys: this.getArr(res),
		};
	};
	keySwitch = newKeys => {
		const { openKeys } = this.state;
		const newKey = newKeys.find(
			v => !openKeys.includes(v)
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
		this.setState(this.getKeys(newProps));
	};
	render() {
		const { openKeys, selectedKeys } = this.state;
		const {
			menus = CFG_MENUS,
			urls = CFG_URLS,
			location,
			...res
		} = this.props;
		const { pathname } = location || {};
		return <Menu
			onOpenChange={this.keySwitch}
			selectedKeys={selectedKeys}
			openKeys={openKeys}
			{...res}
		>
			{menus.map(
				v => renderMenuList(v, urls, pathname)
			)}
		</Menu>;
	};
};
const RouteMenu = withRouter(WrapMenu);
const WrapBread =
	({ list = [], ...res }) =>
		<Breadcrumb {...res}>
			{list.map(
				(v, i) => {
					v && !(i || v.icon) &&
						(v.icon = " fa fa-map-marker");
					return <Breadcrumb.Item key={i}>
						<LinkItem link={v} gutter={8} />
					</Breadcrumb.Item>;
				}
			)}
		</Breadcrumb>;
const TitleBar =
	({ list, btns, separator }) =>
		<div className="title-bar-wrap">
			<WrapBread
				list={list || []}
				separator={separator || "/"}
			/>
			<div className="right-btns">
				{btns.map((v, i) => {
					const { icon, label, className = "", ...res } = v;
					const link = {
						className: className + " right-btn",
						label: [
							<span key="icon" className="btn-icon">
								<Icon type={icon} />
							</span>,
							label,
						],
						...res,
					};
					return <LinkItem
						cursor="pointer"
						gutter={6}
						link={link}
						key={i}
					/>;
				})}
			</div>
		</div>;
export { Icon, LinkItem, WrapMenu, RouteMenu, WrapBread, TitleBar };