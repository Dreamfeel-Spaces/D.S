import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';
export const actions: Actions = {
	async default({ request, locals, params }) {
		const space = locals.space;
		const spaceId = space?.id;
		const data = await request.formData();
		const name = String(data.get('name'));
		const trigger = String(data.get('trigger'));
		const action = String(data.get('action'));
		const triggerType = 'collection_event';
		const _data = String(data.get('data'));

		const event = await prisma.event.create({
			data: {
				spaceId,
				name,
				trigger,
				action,
				targetType: triggerType,
				data: _data,
				target: params.table,
				type: triggerType
			}
		});

		return { success: true, data: event };
	}
};

export async function load({ params, locals }: RequestEvent) {


	const event = await prisma.event.findFirst({
		where: {
			id: params.event
		}
	});

	return { event };
}
