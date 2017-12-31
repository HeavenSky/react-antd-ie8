import React, { Component } from 'react';
/*
import { Route } from 'react-router-dom';
import Loading from 'components/Loading';
import Home from 'bundle-loader?lazy&name=home!components/Home';

<Route component={bundle(Loading)(Home)} />
1. 在 Home 组件执行报错的时候整体页面依旧可以正常加载,只是切换到加载 Loading 组件
3. 经过 bundle-loader 的js会编译成一个独立的js文件进行按需加载,若页面不调用js将不加载
4. package.json 中需添加依赖 bundle-loader
5. 若不需要此功能其实可以不用此方法加载组件
6. 正常情况不使用 bundle-loader 加载,最后是一个js文件,使用之后变成多个js文件
*/
export class Bundle extends Component {
	constructor(props) {
		super(props);
		// short for 'module' but that's a keyword in js, so 'mod'
		this.state = { mod: null };
		this.load = callback => {
			this.setState({ mod: null });
			// handle both es imports and cjs
			callback(mod =>
				this.setState({ mod: mod.default || mod })
			);
		};
		this.renderMod = (Done, Wait, props) =>
			Done ? <Done {...props} /> : <Wait {...props} />;
	}
	componentDidMount() {
		const { callback } = this.props;
		this.load(callback);
	}
	componentWillReceiveProps(nextProp) {
		const { callback } = this.props;
		const cb = nextProp.callback;
		cb !== callback && this.load(cb);
	}
	render() {
		const { loading, props } = this.props;
		const { mod } = this.state;
		return this.renderMod(mod, loading, props);
	}
}
export const bundle = Loading =>
	Callback => props => <Bundle
		props={props}
		loading={Loading}
		callback={Callback}
	/>