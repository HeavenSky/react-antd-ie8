export const $get =
	// data 为请求参数
	(url, data, type = "GET", dataType = "JSON") =>
		$.ajax({
			url, data, type, dataType,
			contentType: "application/x-www-form-urlencoded",
		});
export const $post =
	// data 为json对象
	(url, data, type = "POST", dataType = "JSON") =>
		$.ajax({
			url, type, dataType,
			data: JSON.stringify(data),
			contentType: "application/json; charset=utf-8",
		});
export const $form =
	// data 为FormData对象
	(url, data, type = "POST", dataType = "JSON") =>
		$.ajax({
			url, data, type, dataType,
			processData: false,
			contentType: false,
		});
export const getType = v => ({}).toString.call(v).slice(8, -1);
export const isMap = v => getType(v) === "Map";
export const isSet = v => getType(v) === "Set";
export const isDate = v => getType(v) === "Date";
export const isArray = v => getType(v) === "Array";
export const isObject = v => getType(v) === "Object";
export const isRegExp = v => getType(v) === "RegExp";
export const isPromise = v => getType(v) === "Promise";
export const isFunction = v => typeof v === "function";
export const isBoolean = v => typeof v === "boolean";
export const isNumber = v => typeof v === "number";
export const isString = v => typeof v === "string";
export const isSymbol = v => typeof v === "symbol";
export const tryJSON = str => {
	let res;
	try {
		res = JSON.parse(str);
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
	}
	return res;
};
export const tryEVAL = str => {
	let res;
	try {
		// eslint-disable-next-line no-eval
		res = eval("(" + str + ")");
	} catch (e) {
		// eslint-disable-next-line no-console
		console.error(e);
	}
	return res;
};
export const verIE = () => {
	// 返回值{ver:IE版本,mod:文档模式版本}, 只能获取11以下的版本信息
	const isIE = tryEVAL("/*@cc_on !@*/false");
	if (isIE) {
		const ver = tryEVAL("/*@cc_on @_jscript_version@*/-0");
		const mod = document.documentMode;
		return { ver, mod };
	}
	return {};
};
export const verClient = () => {
	const ua = window.navigator.userAgent;
	let match;
	match = ua.match(/mobile/i);
	if (match) {
		return {
			type: "mobile",
		};
	}
	match = ua.match(/rv:([.\d]+)[)\s]+like gecko/i) ||
		ua.match(/msie[/\s]*([.\d]+)/i);
	if (match) {
		return {
			type: "ie",
			version: match[1],
		};
	}
	match = ua.match(/ucbrowser[/\s]*([.\d]+)/i) ||
		ua.match(/ucweb[/\s]*([.\d]+)/i);
	if (match) {
		return {
			type: "uc",
			version: match[1],
		};
	}
	match = ua.match(/opera.*version[/\s]*([.\d]+)/i) ||
		ua.match(/opera[/\s]*([.\d]+)/i) ||
		ua.match(/opr[/\s]*([.\d]+)/i);
	if (match) {
		return {
			type: "opera",
			version: match[1],
		};
	}
	match = ua.match(/firefox[/\s]*([.\d]+)/i);
	if (match) {
		return {
			type: "firefox",
			version: match[1],
		};
	}
	match = ua.match(/version[/\s]*([.\d]+)\s.*safari[/\s]*/i);
	if (match) {
		return {
			type: "safari",
			version: match[1],
		};
	}
	match = ua.match(/chrome[/\s]*([.\d]+)/i);
	if (match) {
		return {
			type: "chrome",
			version: match[1],
		};
	}
	return {};
};
export const urlArgs = (v, b) => {
	// b==false,返回值{args:URL中的参数,hash:URL中的哈希,main:URL中的主体}
	// b==true,逆向操作
	if (b) {
		const { main = "", args = {}, hash = "" } = v || {};
		let str = "";
		for (let x in args) {
			const key = encodeURIComponent(x || "");
			const value = encodeURIComponent(args[key] || "");
			if (key || value) {
				str += "&" + key + "=" + value;
			}
		}
		if (str) {
			str = "?" + str.slice(1);
		}
		if (hash) {
			str += "#" + encodeURIComponent(hash || "");
		}
		return main + str;
	} else {
		const obj = { main: "", args: {}, hash: "" };
		String(v || "").replace(
			/^([^?#]*)(\?[^#]*)?(#.*)?$/,
			(match, main, args, hash) => {
				obj.main = decodeURIComponent(main || "");
				obj.hash = decodeURIComponent(
					String(hash || "").slice(1)
				);
				String(args || "").replace(
					/(\?|&)([^&=]*)(=[^&]*)?/g,
					(match, prefix, key, value) => {
						key = decodeURIComponent(key || "");
						value = decodeURIComponent(
							String(value || "").slice(1)
						);
						if (key || value) {
							obj.args[key] = value;
						}
						return "";
					}
				);
				return "";
			}
		);
		return obj;
	}
};
const HTTP = "http://";
const HTTPS = "https://";
export const URL_SELECT = {
	HTTP, HTTPS,
	OPTS: [
		{ id: HTTP, label: HTTP },
		{ id: HTTPS, label: HTTPS },
	],
};
export const formatUrl = (url, always) => {
	if (always) {
		let bef = url;
		let aft = "";
		const pre = [];
		do {
			const res = formatUrl(bef);
			aft = res.link;
			[bef, aft] = [aft, bef];
			res.http && pre.push(res.http);
		} while (bef !== aft);
		const http = pre.slice(Number(always) || 0)[0] || "";
		return { http, link: bef };
	}
	let http = "";
	let link = String(url || "");
	if (link.slice(0, 7) === HTTP) {
		http = HTTP;
		link = link.slice(7);
	} else if (link.slice(0, 8) === HTTPS) {
		http = HTTPS;
		link = link.slice(8);
	}
	return { http, link };
};
export const getArea = division => {
	// http://www.stats.gov.cn/tjsj/tjbz/xzqhdm
	const area = [];
	String(division || "").replace(
		/(\d{6})\s+(\S+)/g,
		(match, code, name) => {
			area.push({
				value: code,
				label: name,
			});
			return "";
		}
	);
	const v1 = [];
	const v2 = [];
	const v3 = [];
	area.forEach(v => {
		if (v.value.slice(-4) === "0000") {
			v1.push(v);
		} else if (v.value.slice(-2) === "00") {
			v2.push(v);
		} else {
			v3.push(v);
		}
	});
	v1.sort((a, b) => a.value - b.value);
	v2.sort((a, b) => a.value - b.value);
	v3.sort((a, b) => a.value - b.value);
	v2.forEach(v => {
		v.children = v3.filter(
			x => v.value.slice(0, 4) === x.value.slice(0, 4)
		);
	});
	v1.forEach(v => {
		v.children = v2.filter(
			x => v.value.slice(0, 2) === x.value.slice(0, 2)
		);
	});
	return v1;
};