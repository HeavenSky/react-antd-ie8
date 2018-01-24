import React from "react";
import { LocaleProvider } from "antd";
import enUS from "antd/lib/locale-provider/en_US";
// antd 1.x 默认语言中文
const zhCN = null;
const Lang = props => {
	const { language, children, ...res } = props;
	let locale;
	switch (language) {
		case "cn":
			locale = zhCN;
			moment.locale("zh-cn");
			break;
		case "en":
			locale = enUS;
			moment.locale("en");
			break;
		default:
			locale = zhCN;
			moment.locale("zh-cn");
	}
	return <LocaleProvider
		locale={locale}
		{...res}
	>
		{children}
	</LocaleProvider>;
};
export default Lang;