import 'media-match';
import $ from 'jquery';
import moment from 'moment';
import numeral from 'numeral';
import cookie from 'js-cookie';
import PubSub from 'pubsub-js';
import { Signal } from 'signals';

Object.assign(window, { $, moment, numeral, cookie, PubSub, Signal });