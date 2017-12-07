import React from 'react';
import matchMedia from 'match-media';
import { render } from 'react-dom';
import { HashRouter, Route } from 'react-router-dom';

import Side from 'bundle-loader?lazy&name=side!./containers/Side';
import { newBundle } from './containers/Bundle';

import Loading from './components/Loading';
import Wrap from './containers/Wrap';
import View from './containers/View';
import './index.less';

render(
	<HashRouter>
		<Wrap>
			<Route component={newBundle(Loading)(Side)} />
			<br />
			<View />
		</Wrap>
	</HashRouter>,
	document.getElementById('root')
);