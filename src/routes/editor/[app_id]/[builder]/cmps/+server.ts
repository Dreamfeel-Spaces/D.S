import type { RequestEvent } from './$types';

export async function POST({ locals, request, params }: RequestEvent) {
	const space = locals.space;

	const data = await request.json();

	const versionId = params.builder;

	const component = await locals.db.uIComponents.create({
		data: {
			name: String(data.name),
			spaceId: String(space.id),
			spaceUIVersionId: String(versionId),
			data: `<div class="h-20" >${data.name}</div>`
		}
	});

	return new Response(JSON.stringify(component));
}
