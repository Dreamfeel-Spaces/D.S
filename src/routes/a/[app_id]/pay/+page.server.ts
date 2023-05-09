import { prisma } from '$lib/db/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';
import { createHash } from 'crypto';

export const actions: Actions = {
	async default({ request, locals }) {
		const data = await request.formData();
		const name = String(data.get('name'));
		const env = String(data.get('env'));
		const [key, secret] = generateKeyAndSecret();
		// @ts-ignore
		const space = locals.space;

		const saved = await prisma.spacePayCred.create({
			data: {
				key,
				secret,
				spaceId: space?.id,
				name,
				env
			}
		});

		return { success: true };
	}
};

export async function load({ locals }: RequestEvent) {
	// @ts-ignore
	const space = locals.space;
	//@ts-ignore
	let user: any = locals.spaceSession?.user;
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	const secrets = await prisma.spacePayCred.findMany({
		where: {
			spaceId: space?.id
		}
	});

	return { secrets: secrets.map((s) => ({ ...s, hidden: true })) };
}

function generateKeyAndSecret(): [string, string] {
	const keyLength = 32;
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	let key = '';
	for (let i = 0; i < keyLength; i++) {
		key += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	const secret = createHash('sha256').update(key).digest('hex');
	return [key, secret];
}
