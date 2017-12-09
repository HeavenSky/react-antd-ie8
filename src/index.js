import $ from 'jquery';
import React from 'react';
import moment from 'moment';
import matchMedia from 'match-media';
import { render } from 'react-dom';
import RootComponent from './root';

if (!window.$) {
	window.$ = $;
}
if (!window.moment) {
	window.moment = moment;
}
if (!window.matchMedia) {
	window.matchMedia = matchMedia;
}
render(<RootComponent />, document.getElementById('root'));