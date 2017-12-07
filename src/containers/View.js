import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from 'bundle-loader?lazy&name=home!../components/Home';
import Test from 'bundle-loader?lazy&name=test!../components/Test';
import User from 'bundle-loader?lazy&name=user!../components/User';
import Hello from 'bundle-loader?lazy&name=hello!../components/Hello';
import NotFound from 'bundle-loader?lazy&name=404!../components/NotFound';
import { newBundle } from './Bundle';

import Loading from '../components/Loading';

const createBundle = newBundle(Loading);
// 根据不同的路由加载
export default props => <Switch>
	<Route exact path='/' component={createBundle(Home)} />
	<Route path='/hello' component={createBundle(Hello)} />
	<Route path='/test' component={createBundle(Test)} />
	<Route path='/user' component={createBundle(User)} />
	<Route component={createBundle(NotFound)} />
</Switch>