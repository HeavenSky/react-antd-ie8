export const NAV_MENU = [
	{ key: "/home" },
	{ key: "/hello" },
	{ key: "/test" },
	{ key: "/appstore" },
	{ key: "/laptop" },
	{ key: "/inbox" },
	{ key: "/user" },
];
export const NAV_URLS = {
	"/home": { label: "首页", icon: "home", type: "link" },
	"/hello": { label: "你好", icon: "smile", type: "link" },
	"/test": { label: "测试", icon: "notification", type: "link" },
	"/appstore": { label: "应用商店", icon: "appstore", type: "link", disabled: true },
	"/laptop": { label: "平板电脑", icon: "laptop", type: "link" },
	"/inbox": { label: "收件箱", icon: "inbox", type: "link" },
	"/user": { label: "用户", icon: "user", type: "link" },
};