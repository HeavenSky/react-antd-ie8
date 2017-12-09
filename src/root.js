import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Side from 'bundle-loader?lazy&name=side!./components/Side';
import Home from 'bundle-loader?lazy&name=home!./components/Home';
import Hello from 'bundle-loader?lazy&name=hello!./components/Hello';
import Test from 'bundle-loader?lazy&name=test!./components/Test';
import User from 'bundle-loader?lazy&name=user!./components/User';
import NotFound from 'bundle-loader?lazy&name=404!./components/NotFound';

import Loading from './components/Loading';
import { newBundle } from './utils/bundle';
import './root.less';

const createBundle = newBundle(Loading);
export default props => <HashRouter {...props}>
	<div>
		<Route component={createBundle(Side)} />
		<br />
		<Switch>
			<Route exact path='/' component={createBundle(Home)} />
			<Route path='/hello' component={createBundle(Hello)} />
			<Route path='/test' component={createBundle(Test)} />
			<Route path='/user' component={createBundle(User)} />
			<Route component={createBundle(NotFound)} />
		</Switch>
	</div>
</HashRouter>