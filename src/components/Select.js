import React from "react";
import { Select, Spin } from "antd";

const NewSelect = props => {
	const { opts = [], optValueKey, optLabelKey, isSearch, loading, ...res } = props;
	const extra = {
		notFoundContent: loading ? <Spin size="small" /> : null,
		filterOption: false,
	};
	if (isSearch) {
		extra.filterOption = (value, option) =>
			option.props.children.toLowerCase()
				.indexOf(String(value).toLowerCase()) > -1;
		extra.showSearch = true;
		extra.allowClear = true;
	}
	Object.assign(extra, res);
	return <Select {...extra}>
		{opts.map(
			(v, idx) => Boolean(v) &&
				<Select.Option
					value={v[optValueKey || "id"]}
					key={idx}
					{...v}
				>
					{v[optLabelKey || "label"]}
				</Select.Option>
		)}
	</Select>;
};
export default NewSelect;