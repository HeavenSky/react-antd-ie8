# react-ant-ie8
这是一个以 React, React Router DOM, Ant Design 等现代流行框架写的兼容 IE8 的 demo 例子.

## 技术参考 和 代码介绍
* 学习并参考了很多[砖家大神](https://github.com/brickspert)的[react-family-ie8](https://github.com/brickspert/react-family-ie8)项目配置, 当然也做了一些改动
	* 增加了一些常用的关于 redux 的 dependencies, 不过小项目和新人用 redux, 感觉属于吃力不讨好的事情, 记得一句话 `如果你不知道要不要用 redux, 那么就不用`, 而且一个用 redux 写的项目想去改动, 代码耦合太高, 改动起来十分费劲, 就并未在代码中使用
	* 如果单纯为了组件之间通信, 一般有如下做法
		* 组件不要嵌套太深, 嵌套三层就算深了
		* 通过父组件的箭头函数进行子组件之间的通信
		* 如果想要两个不关联的组件进行通信, 推荐两个插件, 都简单易用(支持 ie8+)
			* [pubsub-js](https://www.npmjs.com/package/pubsub-js) 上面就有具体例子
			* [signals](https://www.npmjs.com/package/signals) [例子](https://github.com/millermedeiros/js-signals/wiki/Examples) 据说 facebook 就是用的这个
	* webpack 配置增加 less 支持
	* webpack 配置增加 ant design 系列的支持
		* 引入 [antd 1.x](http://1x.ant.design) 本想用最新的, 但是 `2.x 不支持 IE8`
		* 引入 [babel-plugin-import](https://www.npmjs.com/package/babel-plugin-import), 并更改 `.babelrc`
	* webpack.common.config.js 中 output 绝对路径改相对路径
	* webpack-dev-server 1.x 在 IE9 以下不支持 `inline:true`
* package.json 里面 version 更新到对应小版本最新
* cdn 源两个 [cdnjs](https://cdnjs.com) [bootcdn](http://www.bootcdn.cn)
	* [cdnjs](https://cdnjs.com) 非常全, 更新迅速及时, 但是国内访问非常慢
	* [bootcdn](http://www.bootcdn.cn) 不是很全, 可能更新不及时, 但是国内访问速度快
* antd 需要`window.matchMedia`, 在[npmjs官网](https://www.npmjs.com)找到两个 ployfill 库(两者名字不一样!!!): `match-media` 和 `media-match`
	* 两者均不能使用 `import matchMedia from '<package_name>';` 只能用 `import '<package_name>';`
	* `match-media` 只是 `import 'match-media';` 并未兼容 `addListener` 和 `removeListener`, 需要再引入 `import 'match-media/matchMedia.addListener';`
	* `media-match` 直接引入即可 `import 'media-match';`
	* 也可以直接从[阿里的库里](https://as.alipayobjects.com/g/component/??media-match/2.0.2/media.match.min.js)拿
* dependencies 查询和资料参考来源 [npmjs官网](https://www.npmjs.com)
* 使用 copy-webpack-plugin 直接拷贝静态资源
* 移除了 react-hot-loader 在 IE 中支持不是很好
* 优化 bundle-loader 的组件创造函数 见`src/utils/bundle.js`
* 对于 ant design 的表格 `表头和列固定的时候` 报错 `IE8 不支持 onScroll 事件`, 兼容处理见`src/utils/fns.js`内的 `shimAntdTable` 函数(优化了事件函数的重复绑定问题)

刚开始学 webpack, 还有很多不懂, 欢迎指点秘籍, 或者纠错改进, 共同学习,共同进步

## 代码规范参考
* [js规范es5,es6,react](https://github.com/airbnb/javascript)
* [js规范中文版](https://github.com/yuche/javascript)
* [React规范中文版](https://github.com/JasonBoy/javascript/tree/master/react)
* [es5规范中文版](https://github.com/sivan/javascript-style-guide/tree/master/es5)
* [eslint规则](http://eslint.cn/docs/rules)
* [js标准化介绍](https://standardjs.com/readme-zhcn.html)
* [js标准化规则](https://standardjs.com/rules-zhcn.html)

## 个人代码习惯(因人而异,觉得不好的我会改,所以仅供参考)
### 关于文件末尾留一空行
* 我是不留的,能少一行为什么不少
### 关于代码缩进
* 我是tab,不想争,1个字符比2个4个空格少
### 关于引号
* js统一单引号,字符串内的单引号统一`\'`或`\x27`,双引号`\x22`,那样就找不到双引号了
* css统一双引号,content内容必须转义,防止偶尔的乱码
### 是否加逗号
* 个人原则,行结尾的逗号,能加就必加,方便整行移动时就可以不管是否需要加逗号了
* 数组 如果内部换行,换行前必加逗号
* 对象 如果内部换行,换行前必加逗号
### 是否加分号
* export,class 语句块结束都不要加分号
* class内的属性和函数 语句块结束都不要加分号
* 其他情况尽可能完整追加分号
### 关于定义变量
* 如果赋值,一个变量一条const或者let,不用var
* 如果可以,尽可能用对象或数组的解构形式进行赋值
### 关于import顺序
* 引入node_modules中的全局组件
* 引入node_modules中的非全局组件
* 凭借loader媒介加载的, 如:bundle-loader
* 自定义的一些组件
* 自定义的一些函数
* 引入图片文件
* 引入样式文件
### 下面是我根据vscode默认js格式化而替换掉部分standardjs配置
```shell
# 拷贝至bash直接回车即可 当前目录是node_modules所在目录
sed -i '/semi/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/indent/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/no-tabs/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/eol-last/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/comma-dangle/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/spaced-comment/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/no-callback-literal/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/object-property-newline/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/no-webpack-loader-syntax/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/space-before-function-paren/s/error/off/' node_modules/eslint-config-standard/eslintrc.json
sed -i '/jsx-indent/s/error/off/' node_modules/eslint-config-standard-jsx/eslintrc.json
```

## 开发坏境启动
1. `npm install`
2. `npm start`
3. 浏览器打开[http://localhost:8888](http://localhost:8888)

## 生产坏境部署
1. `npm install` 若在前面运行过此命令, 可跳过
2. `npm run app`
3. 拷贝dist文件夹内容至服务器即可
