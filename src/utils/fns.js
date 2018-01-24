export const $get = (url, data, type = "GET") =>
	$.ajax({
		url, data, type,
		dataType: "JSON",
		contentType: "application/x-www-form-urlencoded",
	});
export const $post = (url, data, type = "POST") =>
	$.ajax({
		url, type,
		dataType: "JSON",
		data: JSON.stringify(data),
		contentType: "application/json; charset=utf-8",
	});
export const getType = v => ({}).toString.apply(v).slice(8, -1);
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
export const execVal = str => {
	let res;
	try {
		res = eval("(" + str + ")");
	} catch (e) { }
	return res;
};
export const verIE = () => {
	// 返回值{ver:IE版本,mod:文档模式版本}, 只能获取11以下的版本信息
	const isIE = execVal("/*@cc_on !@*/false");
	if (isIE) {
		const ver = execVal("/*@cc_on @_jscript_version@*/-0");
		const mod = document.documentMode;
		return { ver, mod };
	}
	return {};
};
export const paramUrl = (v, b) => {
	// b==false,返回值{param:URL中的参数,hash:URL中的哈希,main:URL中的主体}
	// b==true,逆向操作
	if (b) {
		const { main = "", args = {}, hash = "" } = v || {};
		let str = "";
		for (let x in args) {
			let key = decodeURIComponent(x || "");
			let value = decodeURIComponent(args[key] || "");
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
export const formatUrl = url => {
	let link = String(url || "");
	let http = "";
	if (link.slice(0, 7) === HTTP) {
		link = link.slice(7);
		http = HTTP;
	} else if (link.slice(0, 8) === HTTPS) {
		link = link.slice(8);
		http = HTTPS;
	}
	return { link, http };
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