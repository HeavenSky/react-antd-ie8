import $ from "jquery";
import moment from "moment";
import "moment/locale/zh-cn";
import numeral from "numeral";
import CooKie from "js-cookie";
import PubSub from "pubsub-js";
import { Signal } from "signals";
import "jquery-ui-dist/jquery-ui.min";

Object.assign(window, { $, moment, numeral, CooKie, PubSub, Signal });