import React from "react";
import { Spin } from "antd";

import HomeFn from "bundle-loader?lazy&name=home!../components/Home";
import { bundle } from "../components/Bundle";

const Empty = props => <div><Spin />Loading</div>;
const NoAu = props => <div><Spin />法海不懂爱, 页面出不来...</div>;
const Main = bundle(Empty, HomeFn, { type: "callback" });
const routes = [
	{ type: "redirect", exact: true, strict: true, from: "/", to: "/home" },
	{ type: "route", path: "/home", component: Main },
	{ type: "route", component: NoAu },
];
export default routes;