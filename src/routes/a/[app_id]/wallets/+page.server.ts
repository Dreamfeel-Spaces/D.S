import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';

export async function load({ request, locals }: RequestEvent) {
	const space = locals.space;
	const wallets = await prisma.spaceWallet.findMany({
		where: {
			spaceId: space?.id
		}
	});

	return { wallets };
}

export const actions: Actions = {
	async default({ locals, request }) {
		const data = await request.formData();
		const space = locals.space;

		const name = String(data.get('name'));

		const wallet = await prisma.spaceWallet.create({
			data: {
				spaceId: space?.id,
				name
			}
		});

		return { success: true, data: wallet };
	}
};
