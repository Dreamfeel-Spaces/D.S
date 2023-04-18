import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async default({ request }) {
		const data = await request.formData();
		const email = String(data.get('email'));
		const name = String(data.get('name'));
		const company = String(data.get('company'));
		const role = String(data.get('role'));

		try {
			const ea = await prisma.eA.create({
				data: {
					email,
					name,
					company,
					role
				}
			});

			return { success: true };
		} catch (error: any) {
			return { error: error?.message };
		}
	}
};
