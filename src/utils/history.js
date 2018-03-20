import createHistory from "history/createHashHistory";

const history = createHistory();
history.listen(
	(location, action) => 0 &&
		history.push({
			pathname: "/home",
			search: "?asd=23",
			state: { some: "state" },
		})
);
export default history;