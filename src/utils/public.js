import $ from "jquery";
import when from "when";
import moment from "moment";
import "moment/locale/zh-cn";
import numeral from "numeral";
import cookie from "js-cookie";
import PubSub from "pubsub-js";
import { Signal } from "signals";
import "jquery-ui-dist/jquery-ui";

Object.assign(window, { $, when, moment, numeral, cookie, PubSub, Signal });