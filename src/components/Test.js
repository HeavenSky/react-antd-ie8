import React, { Component } from "react";
import { Collapse, Icon, Spin } from "antd";
import Select from "./Select";
import { $get } from "../utils/fns";

const List = ({ items, ...res }) =>
	<Collapse accordion {...res}>
		{items.map(v => {
			const { id, name, description } = v;
			const url = v["html_url"];
			const count = v["stargazers_count"];
			return <Collapse.Panel key={id}
				header={
					<span>
						<a href={url} target="_blank">{name}</a>
						<span className="offset">
							<Icon type="star" />
							{`stars: ${count}`}
						</span>
					</span>
				}
			>
				{description}
			</Collapse.Panel>;
		})}
	</Collapse>;
class Test extends Component {
	state = {
		items: [],
		lang: "JavaScript",
		order: "desc",
		loading: false,
	};
	langs = ["ActionScript", "C", "Clojure", "CoffeeScript", "CSS", "Go", "Haskell", "HTML", "Java", "JavaScript", "Lua", "Matlab", "Objective-C", "Perl", "PHP", "Python", "R", "Ruby", "Scala", "Shell", "Swift", "TeX", "TypeScript", "Vim script"].map(v => ({ id: v, label: v }));
	orders = [{ id: "asc", label: "顺序" }, { id: "desc", label: "倒序" }];
	load = (key, val) => {
		const res = { loading: true };
		if (key) {
			res[key] = val;
		}
		this.setState(res);
		const { lang, order } = Object.assign(this.state, res);
		$get(
			"https://api.github.com/search/repositories",
			{
				q: `topic:${lang} language:${lang}`,
				sort: "stars", order,
			}
		).done(
			({ items }) => items && this.setState({ items })
		).always(e => this.setState({ loading: false }));
	};
	switch = key => e => {
		const val = e && e.target
			? e.target.value : e;
		this.load(key, val);
	};
	componentDidMount = this.load;
	render() {
		const { items, order, lang, loading } = this.state;
		return (
			<div>
				<span className="offset">语言:</span>
				<Select isSearch
					disabled={loading}
					value={lang}
					onChange={this.switch("lang")}
					opts={this.langs}
					className="wd120"
				/>
				<span className="offset">排序:</span>
				<Select
					disabled={loading}
					value={order}
					onChange={this.switch("order")}
					opts={this.orders}
				/>
				<Spin spinning={loading}>
					<List items={items} />
				</Spin>
			</div>
		);
	};
};
export default Test;