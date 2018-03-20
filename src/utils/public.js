import pace from "pace";
import axios from "axios";
import moment from "moment";
import numeral from "numeral";
import CooKie from "js-cookie";
import PubSub from "pubsub-js";
import { Signal } from "signals";
import nprogress from "nprogress";
import "moment/locale/zh-cn";
import "nprogress/nprogress.css";
import "normalize.css/normalize.css";
import "pace/themes/blue/pace-theme-flash.css";
// http://github.hubspot.com/pace
// http://ricostacruz.com/nprogress

Object.assign(window, { pace, axios, CooKie, PubSub, Signal, moment, numeral, nprogress });