import React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { render } from 'react-dom';
import matchMedia from 'match-media';

import Wrap from './containers/Wrap';
import View from './containers/View';

import { createBundle } from './containers/Bundle';
import Side from 'bundle-loader?lazy&name=side!./containers/Side';

import './index.less';

render(
	<HashRouter>
		<Wrap>
			<Route component={createBundle(Side)} />
			<br />
			<View />
		</Wrap>
	</HashRouter>,
	document.getElementById('root')
);