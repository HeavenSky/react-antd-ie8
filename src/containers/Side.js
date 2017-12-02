import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { NAV_COL } from '../constants/columns';

// 根据不同的路由显示状态
export default class Side extends Component {
	render() {
		const { location: { pathname } } = this.props;
		return (
			<ul>
				{NAV_COL.map(
					({ key, title }, idx) => {
						const route = '/' + (idx ? key : '');
						return <li key={key}>
							{
								route === pathname ? title
									: <Link to={route}>{title}</Link>
							}
						</li>
					}
				)}
			</ul>
		);
	}
}