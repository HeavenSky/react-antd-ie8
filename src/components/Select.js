import React from "react";
import { Select, Spin } from "antd";
import { lower } from "../utils/fns";

const WrapSelect = props => {
	const { opts = [], optValueKey, optLabelKey, isSearch, loading, ...res } = props;
	const id = optValueKey || "id";
	const label = optLabelKey || "label";
	const extra = {
		notFoundContent: loading
			? <Spin size="small" /> : null,
		filterOption: false,
	};
	if (isSearch) {
		extra.filterOption = (value, option) =>
			lower(option.props.children).includes(lower(value));
		extra.showSearch = true;
		extra.allowClear = true;
	}
	return <Select {...extra} {...res}>
		{opts.map(
			(v, idx) => Boolean(v) &&
				<Select.Option
					value={v[id]}
					key={idx}
					{...v}
				>
					{v[label]}
				</Select.Option>
		)}
	</Select>;
};
export default WrapSelect;