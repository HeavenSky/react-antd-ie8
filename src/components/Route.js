import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { bundle } from "./Bundle";

const ROUTES = []; // { type, path, component, sensitive, exact, strict, push, from, to },
const PARAMS = {}; // 给路由渲染的组件传递额外的参数
const getRoute = (route, key) =>
	/^redirect$/i.test(route.type)
		? <Redirect key={key} {...route} />
		: /^route$/i.test(route.type)
			? <Route key={key} {...route} /> : "";
const WrapRoute = props => {
	const { route, more } = props;
	const res = Object.assign({}, route, more);
	const { path, from } = res;
	const key = path || from || Math.random();
	return getRoute(res, key);
};
const RouteList =
	props => {
		// checkAuth 权限检查, 类似: route=>Promise.resolve(<div />) 或 route=><div />
		const {
			routes = ROUTES,
			params = PARAMS,
			noSwitch, checkAuth,
		} = props;
		const list = routes.map(
			(v, i) => {
				let { component, ...route } = v || {};
				let type = "component";
				let fn = component;
				// 对非公开路由进行权限检查
				if (checkAuth) {
					type = "function";
					fn = () => checkAuth(v);
				}
				route.component = bundle(null, fn, { type, more: params });
				return getRoute(route, i);
			}
		);
		return noSwitch ? list : <Switch>{list}</Switch>;
	};
export { WrapRoute, RouteList };