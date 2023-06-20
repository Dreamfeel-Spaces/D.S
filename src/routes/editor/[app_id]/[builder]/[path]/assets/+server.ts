import type { RequestEvent } from './$types';
export async function POST({ locals, params, request }: RequestEvent) {
	const data = await request.json();
	let saved = [];
	for (let ass of data.assets) {
		const asset = await locals.db.assets.create({
			data: {
				url: ass.url,
				spaceId: locals.space.id
			}
		});
		saved.push(asset);
	}

	return new Response(JSON.stringify(saved));
}
