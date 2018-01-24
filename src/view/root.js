import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";

import Home from "bundle-loader?lazy&name=home!../components/Home";
import Hello from "bundle-loader?lazy&name=hello!../components/Hello";
import Test from "bundle-loader?lazy&name=test!../components/Test";

import { NAV_COL } from "../constants/columns";
import { bundle } from "../utils/bundle";
import Menu from "../components/Menu";
import "./root.less";

const createBundle = bundle(props => <div><Spin />Loading</div>);
const NoAu = props => <div><Spin />法海不懂爱, 页面出不来...</div>;
const RootComponent =
	props => <HashRouter>
		<div>
			<Menu theme="dark" mode="horizontal" menus={NAV_COL} />
			<div className="main">
				<Switch>
					<Redirect exact strict from="/" to="/home" />
					<Route path="/home" component={createBundle(Home)} />
					<Route path="/hello" component={createBundle(Hello)} />
					<Route path="/test" component={createBundle(Test)} />
					<Route path="/404" component={NoAu} />
					<Redirect to="/404" />
				</Switch>
			</div>
		</div>
	</HashRouter>;
export default RootComponent;