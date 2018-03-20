import React from "react";
import { Router } from "react-router-dom";

import { NAV_MENU, NAV_URLS } from "../constants/columns";
import { RouteMenu } from "../components/Menu";
import { RouteList } from "../components/Route";
import history from "../utils/history";
import routes from "./routes";
import "./app.less";

const App = props =>
	<Router history={history}>
		<div>
			<RouteMenu
				theme="dark"
				mode="horizontal"
				menus={NAV_MENU}
				urls={NAV_URLS}
			/>
			<div className="main">
				<RouteList routes={routes} />
			</div>
		</div>
	</Router>;

export default App;