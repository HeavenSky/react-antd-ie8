import React, { Component } from "react";
import { Spin } from "antd";
/*
import { Route } from "react-router-dom";
const Empty = props => <div>Loading</div>;

// 代码切割方法 bundle-loader
import cbHome from "bundle-loader?lazy&name=home/fn!./Home";
<Route component={bundle(Empty, cbHome, { type: "callback" })} />;

// 代码切割方法 import() 只是webpack@1.x不支持
// 命名输出文件方法 https://doc.webpack-china.org/api/module-methods/#import-
const fnHome = () => import("./Home");
<Route component={bundle(Empty, fnHome, { type: "function" })} />;

1. 在 Home 组件出错的时候页面依旧可以加载,但是是切换到加载 Empty 组件
2. 通过 bundle-loader或import() 进行代码切割,按需加载,加快首屏加载时间和减少首屏请求资源
*/
class Bundle extends Component {
	state = { mod: null };
	setMod = mod => mod &&
		this.setState({ mod: mod.default || mod });
	getMod = fn => {
		this.setState({ mod: null });
		const { type } = this.props;
		switch (type) {
			case "callback":
				fn(this.setMod);
				break;
			case "function":
				Promise.resolve(fn())
					.then(this.setMod)
					.catch(e => e);
				break;
			case "component":
			default:
				Promise.resolve(fn)
					.then(this.setMod)
					.catch(e => e);
				break;
		}
	};
	componentDidMount() {
		const { fn } = this.props;
		this.getMod(fn);
	};
	componentWillReceiveProps(nextProp) {
		const { fn } = this.props;
		const cb = nextProp.fn;
		cb !== fn && this.getMod(cb);
	};
	render() {
		const { empty, props } = this.props;
		const { mod } = this.state;
		const Mod = mod || empty;
		return Mod ? <Mod {...props} /> : <Spin />;
	};
};
const bundle = (empty, fn, opt) => {
	// @opt.type: bundle-loader时callback; import()时function; 直接传入组件时component(默认);
	// @opt.more: 额外传递的组件属性
	const { type, more } = opt || {};
	const BundleMod = props =>
		<Bundle
			fn={fn}
			type={type}
			empty={empty}
			props={Object.assign({}, props, more)}
		/>;
	return BundleMod;
};
export { Bundle, bundle };