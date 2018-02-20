import React, { Component } from "react";
/*
import { Route } from "react-router-dom";
import Loading from "../components/Loading";
import fnHome from "bundle-loader?lazy&name=home!../components/Home";

<Route component={bundle(Loading)(fnHome)} />
1. 在 Home 组件执行报错的时候整体页面依旧可以正常加载,只是切换到加载 Loading 组件
3. 经过 bundle-loader 的js会编译成一个独立的js文件进行按需加载,若页面不调用js将不加载
4. package.json 中需添加依赖 bundle-loader
5. 若不需要此功能其实可以不用此方法加载组件
6. 使用 bundle-loader 可以进行代码切割进行按需加载, 使用之后变成多个js文件
*/
class Bundle extends Component {
	state = { mod: null };
	getMod = fn => {
		this.setState({ mod: null });
		fn(mod => {
			mod = mod.default || mod;
			this.setState({ mod });
		});
	};
	showMod = (mod, empty, props) => {
		const Mod = mod || empty;
		return <Mod {...props} />;
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
		return this.showMod(mod, empty, props);
	};
};
export const bundle =
	empty => fn => {
		const BundleMod = props =>
			<Bundle
				fn={fn}
				empty={empty}
				props={props}
			/>;
		return BundleMod;
	};