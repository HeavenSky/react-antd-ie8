export const verIE = e => {
	// 此方法只能检查IE版本 IE11以下 或 IE文档模式11以下
	if ( /*@cc_on !@*/ false) {
		const ver =  /*@cc_on @_jscript_version@*/ -0;
		const mod = document.documentMode;
		return { ver, mod };
	}
}