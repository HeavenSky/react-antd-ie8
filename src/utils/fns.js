export const verIE = () => {
	// 此方法只能检查IE版本 IE11以下 或 IE文档模式11以下
	if ( /*@cc_on !@*/ false) {
		const ver =  /*@cc_on @_jscript_version@*/ -0;
		const mod = document.documentMode;
		return { ver, mod };
	}
}
export const shimAntdTable = () => {
	const res = verIE(); // 获取IE版本信息,返回值 {ver:IE版本,mod:文档模式版本}
	if (res && (res.mod || res.ver) < 9) {
		$('.ant-table-scroll .ant-table-body')
			.on('scroll', e => {
				const ev = e || window.event;
				const el = $(e.target || e.srcElement);
				const left = el.scrollLeft();
				el.siblings('.ant-table-header').scrollLeft(left);
			});
		$('.ant-table-fixed-left .ant-table-body-inner,.ant-table-scroll .ant-table-body,.ant-table-fixed-right .ant-table-body-inner')
			.on('scroll', e => {
				const ev = e || window.event;
				const el = $(e.target || e.srcElement);
				const top = el.scrollTop();
				const table = el.parents('.ant-table').eq(0);
				table.find('.ant-table-fixed-left .ant-table-body-inner').scrollTop(top);
				table.find('.ant-table-scroll .ant-table-body').scrollTop(top);
				table.find('.ant-table-fixed-right .ant-table-body-inner').scrollTop(top);
			});
	}
}