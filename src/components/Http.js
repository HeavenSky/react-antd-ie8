import React from "react";
import { Input } from "antd";
import Select from "./Select";
import { URL_SELECT, formatUrl } from "../utils/fns";

// value 和 onChange 必须相结合使用, 否则组件的值永远为空
const Http = ({ disabled, defaultHttp, value, onChange, ...res }) => {
	let { http, link } = formatUrl(value);
	if (defaultHttp !== URL_SELECT.HTTPS) {
		defaultHttp = URL_SELECT.HTTP;
	}
	const update = e => {
		let url = e.target.value;
		let head = http;
		while (formatUrl(url).link !== url) {
			const check = formatUrl(url);
			url = check.link;
			head = check.http || http;
		}
		onChange(head + url);
	};
	const addon = (
		<Select
			disabled={disabled}
			opts={URL_SELECT.OPTS}
			value={http || defaultHttp}
			onChange={v => onChange((v || defaultHttp) + link)}
		/>
	);
	return <Input
		disabled={disabled}
		addonBefore={addon}
		onChange={update}
		value={link}
		{...res}
	/>;
};
export default Http;