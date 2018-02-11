import React from "react";
import { HashRouter, Switch, Route, Redirect } from "react-router-dom";
import { Spin } from "antd";

import Home from "bundle-loader?lazy&name=home!../components/Home";

import { NAV_COL } from "../constants/columns";
import { bundle } from "../utils/bundle";
import Menu from "../components/Menu";
import "./app.less";

const createBundle = bundle(props => <div><Spin />Loading</div>);
const NoAu = props => <div><Spin />法海不懂爱, 页面出不来...</div>;
const App = props => <HashRouter>
	<div>
		<Menu theme="dark" mode="horizontal" menus={NAV_COL} />
		<div className="main">
			<Switch>
				<Redirect exact strict from="/" to="/home" />
				<Route path="/home" component={createBundle(Home)} />
				<Route component={NoAu} />
			</Switch>
		</div>
	</div>
</HashRouter>;

export default App;