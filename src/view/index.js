import $ from 'jquery';
import moment from 'moment';
import numeral from 'numeral';
import PubSub from 'pubsub-js';
import { Signal } from 'signals';

import React from 'react';
import { render } from 'react-dom';
import RootComponent from './root';

Object.assign(window, { $, moment, numeral, PubSub, Signal });
render(<RootComponent />, document.getElementById('root'));