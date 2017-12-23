const BASE_URL = '';
export const $get =
	(link, data, base = BASE_URL) =>
		$.ajax({
			url: base + link, data,
			type: 'GET', dataType: 'JSON',
		})
export const $post =
	(link, data, base = BASE_URL) =>
		$.ajax({
			url: base + link,
			data: data && JSON.stringify(data),
			type: 'POST', dataType: 'JSON',
			contentType: 'application/json; charset=utf-8',
		})
export default ({
	askme: () => $get('/askme/getinfo.php'),
	action: ({ type, lang }) => $get(
		'/action/ajax.php',
		{ type, lang, show: 'json' },
	),
})