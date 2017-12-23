import 'media-match';
import $ from 'jquery';
import moment from 'moment';
import numeral from 'numeral';
import PubSub from 'pubsub-js';
import { Signal } from 'signals';

Object.assign(window, { $, moment, numeral, PubSub, Signal });