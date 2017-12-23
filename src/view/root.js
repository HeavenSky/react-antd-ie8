import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Home from 'bundle-loader?lazy&name=home!components/Home';
import Hello from 'bundle-loader?lazy&name=hello!components/Hello';
import Test from 'bundle-loader?lazy&name=test!components/Test';

import Menu from 'components/Menu';
import { NAV_COL } from 'constants/columns';
import { bundle } from 'utils/bundle';
import './root.less';

const Loading = props => <div>Loading</div>;
const createBundle = bundle(Loading);
const MainHome = createBundle(Home);
export default props => <HashRouter>
	<div>
		<Menu menus={NAV_COL} mode='horizontal' />
		<br />
		<Switch>
			<Route path='/home' component={MainHome} />
			<Route path='/hello' component={createBundle(Hello)} />
			<Route path='/test' component={createBundle(Test)} />
			<Route component={MainHome} />
		</Switch>
	</div>
</HashRouter>