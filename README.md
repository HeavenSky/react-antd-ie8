# react-ant-ie8

这是一个以 React, React Router DOM, Ant Design 等现代流行框架写的兼容 IE8 的 demo 栗子.

## 技术参考 和 代码介绍

* 项目大部分内容是参考 [砖家大神](https://github.com/brickspert) 的项目 [react-family-ie8](https://github.com/brickspert/react-family-ie8)，当然也改动了很多
	* redux 相关的 dependencies 都移除了, 中小项目用 redux 太费力
	* package.json 里面 version 更新到对应小版本最新
	* webpack配置、package.json 中增加 [antd 1.x](http://1x.ant.design) 和 less 支持
		* 引入 [antd 1.x](http://1x.ant.design) 本想用最新的, 但是 `2.x 不支持 IE8`
		* 引入 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import), 并更改 `.babelrc`
	* webpack.common.config.js 中 output 绝对路径改相对路径
	* webpack-dev-server 增加在 webpack 中的参数配置,增加proxy请求转发
		* 发现一个坑, 在IE8中不支持"inline:true"
* cdn 源两个 [cdnjs](https://cdnjs.com) [bootcdn](http://www.bootcdn.cn/)
	* [cdnjs](https://cdnjs.com) 非常全,更新迅速及时,但是国内访问非常慢
	* [bootcdn](http://www.bootcdn.cn/) 不是很多,少量可能更新不及时,不是最新
	* 吐槽一下 "match-media" 两个cdn都没有，但是没有的话 `ant design` 又报错。于是网上找了好久,没找到可靠的,后在 https://www.npmjs.com 里找到，于是通过加入 dependencies, 然后在 index.js 中 import (不知道有没有更好的解决办法)
* dependencies 查询和资料参考来源 [官网](https://www.npmjs.com)
* 出于增加编译速度的考虑 将 `antd.min.css` `jquery.min.js` `json2.min.js` 放到 index.html 中用 cdn 引入
* 对于 ant design 的表格 `表头和列同时固定的时候` 报错 `IE8 不支持 onScroll 事件`, 利用 jquery 做了如下兼容处理
```js
const verIE = e => {
	// 此方法只能检查IE版本 IE11以下 或 IE文档模式11以下
	if ( /*@cc_on !@*/ false) {
		const ver =  /*@cc_on @_jscript_version@*/ -0;
		const mod = document.documentMode;
		return { ver, mod };
	}
};

componentDidMount() {
	const res = verIE(); // 获取IE版本信息,返回值 {ver:IE版本,mod:文档模式版本}
	if (res) {
		if (res.ver < 9 || res.mod < 9) {
			$('.ant-table-scroll .ant-table-body').on('scroll',
				e => {
					const ev = e || window.event;
					const el = $(e.target || e.srcElement);
					const left = el.scrollLeft();
					el.siblings('.ant-table-header').scrollLeft(left);
				}
			);
			$('.ant-table-fixed-right .ant-table-body-inner').on('scroll',
				e => {
					const ev = e || window.event;
					const el = $(e.target || e.srcElement);
					const top = el.scrollTop();
					const table = el.parents('.ant-table').eq(0);
					table.find('.ant-table-fixed-left .ant-table-body-inner').scrollTop(top);
					table.find('.ant-table-scroll .ant-table-body').scrollTop(top);
				}
			);
		}
	}
}
```
* 另外 既然用了 react-router-dom，那么需要针对 路由地址 pathname 做不同的展示，这在 [react-family-ie8](https://github.com/brickspert/react-family-ie8) 中没有介绍，局部代码如下
```js
const newBundle = (lazyComponent, LoadingComponent) => props => (
	<Bundle
		load={lazyComponent}
		fn={
			LoadedComponent => LoadedComponent ?
				<LoadedComponent {...props} /> : <LoadingComponent {...props} />
		}
	/>
);
const createBundle = mod => newBundle(mod, Loading);
// --------------------------------
import Side from 'bundle-loader?lazy&name=side!./containers/Side';
// ...
<Route component={createBundle(Side)} />

```
其中 在 `containers/Side` 的 `props` 属性就包含 路由地址 pathname，以下是 `props` 对象内容
```json
{
	"history": {
		"length": 12,
		"push": function(){},
		"go": function(){},
		// ...等等其他属性方法
	},
	"location": {
		"hash": "",
		"pathname": "/test", // 这就是当前路由地址
		"search": ""
	}
}
```

开始学 react webpack 几个月吧，有很多不懂，欢迎指点秘籍，或者提错改错
`fork` 不 `fork` 无所谓, 共同学习，共同进步

## 开发坏境启动

1. `npm install`
2. `npm start`
3. 浏览器打开[http://localhost:8888](http://localhost:8888)

## 生产坏境部署

1. `npm install`
若在前面运行过此命令, 可跳过
2. `npm run app`
3. 拷贝dist文件夹内容至服务器即可

### `重要说明`

前面说到的 proxy 转发设置，一定要在 `开发坏境` `开发坏境` 下才生效，生产环境转发设置就没用了，所以请求会报错的