import axios from "axios";
import moment from "moment";
import "moment/locale/zh-cn";
import numeral from "numeral";
import CooKie from "js-cookie";
import PubSub from "pubsub-js";
import { Signal } from "signals";

Object.assign(window, { axios, moment, numeral, CooKie, PubSub, Signal });