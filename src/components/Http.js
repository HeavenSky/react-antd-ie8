import React from "react";
import { Input } from "antd";
import Select from "./Select";
import { URL_SELECT, formatUrl } from "../utils/fns";

const { HTTP, HTTPS, OPTS } = URL_SELECT;
// value 和 onChange 必须相结合使用, 否则组件的值永远为空
const Http = props => {
	let { addon, value, onChange, ...res } = props;
	addon = Object.assign({
		disabled: res.disabled,
	}, addon);
	let { httpDefault } = addon;
	if (httpDefault !== HTTP) {
		httpDefault = HTTPS;
	}
	let { http, link } = formatUrl(value, -1);
	if ([HTTP, HTTPS].indexOf(http) < 0) {
		http = httpDefault;
	}
	const updateSelect =
		(v = httpDefault) => onChange(v + link);
	const updateInput = e => {
		let url = e.target.value;
		const format = formatUrl(url, -1);
		http = format.http || http;
		onChange(http + format.link);
	};
	const selector = (
		<Select
			onChange={updateSelect}
			value={http}
			opts={OPTS}
			{...addon}
		/>
	);
	return <Input
		addonBefore={selector}
		onChange={updateInput}
		value={link}
		{...res}
	/>;
};
export default Http;