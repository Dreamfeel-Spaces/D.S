import { prisma } from '$lib/db/prisma';
import emailHandler from '$lib/email/Email';
import { earlyAccess } from '$lib/email/earlyAccess';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async default({ request }) {
		const data = await request.formData();
		const email = String(data.get('email'));
		const name = String(data.get('name'));
		const company = String(data.get('company'));
		const role = String(data.get('role'));

		try {
			const ea = await prisma.partners.create({
				data: {
					email,
					name,
					company,
					partnershipType: role
				}
			});

			const htmlEmail = earlyAccess(name);

			await emailHandler({
				firstName: name,
				lastName: '',
				email,
				message: htmlEmail,
				subject: 'Dreamfeel Spaces - Early Access'
			});

			return { success: true };
		} catch (error: any) {
			console.log(error);
			return { error: error?.message };
		}
	}
};
