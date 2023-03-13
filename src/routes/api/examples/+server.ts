import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

const data = [
	{ id: 1, name: 'Jane Doe' },
	{ id: 2, name: 'John Doe' },
	{ id: 3, name: 'Elvis Gray' },
	{ id: 4 },
	{ id: 5 },
	{ id: 6 },
	{ id: 7 },
	{ id: 8 },
	{ id: 9 },
	{ id: 10 }
];

export async function GET({ cookies, url }: RequestEvent) {
	const id = url.searchParams.get('id');
	const own = cookies.get('custom-json');
	const del = cookies.get('del');
	const custom = JSON.parse(own ?? '[]');
	const deleted = JSON.parse(del ?? '[]');
	let all = [...data, ...custom];
	all = all.filter((item) => !deleted.includes(item.id));
	if (!id) {
		let response = {
			count: all.length,
			take: all.length,
			skip: 0,
			data: all
		};

		return new Response(JSON.stringify(response));
	} else {
		const item = all.find((item) => item.id === Number(id));

		if (!item) {
			throw error(404, 'Example not found');
		}

		return new Response(JSON.stringify(item));
	}
}

export async function POST({ cookies, request }: RequestEvent) {
	const own = cookies.get('custom-json') ?? '[]';
	const custom = JSON.parse(own);

	const del = cookies.get('del');
	const deleted = JSON.parse(del ?? '[]');

	const id = data.length + custom.length + 1 + deleted.length;

	const _data = await request.json();

	const res = { id, name: _data.name };

	cookies.set('custom-json', JSON.stringify([...custom, res]));

	return new Response(JSON.stringify(res));
}

export async function PUT() {}

export async function DELETE({ cookies, url }: RequestEvent) {
	const own = cookies.get('custom-json') ?? '[]';
	const custom = JSON.parse(own);

	const del = cookies.get('del');
	const deleted = JSON.parse(del ?? '[]');

	let all = [...data, ...custom];
	all = all.filter((item) => !deleted.includes(item.id));

	const id = url.searchParams.get('id');

	if (!id) {
		throw error(404, 'Example not found');
	}
	const item = all.find((item) => item.id === Number(id));

	if (!item) {
		throw error(404, 'Example not found');
	}

	cookies.set('del', JSON.stringify([...deleted, item.id]));

	return new Response('{rowsAffected: 1}');
}
