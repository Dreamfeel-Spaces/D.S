import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';
import { CAPTCHA_SITEKEY } from '$env/static/private';
import { prisma } from '$lib/db/prisma';
export async function load({ locals }: RequestEvent) {
	const session = await locals.getSession();

	if (!session) throw redirect(302, '/accounts');

	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email ?? ''
		}
	});

	return { user, CAPTCHA_SITEKEY };
}
