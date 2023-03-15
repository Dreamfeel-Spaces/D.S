import type { RequestEvent } from './$types';

export async function load({ locals }: RequestEvent) {
	const session = await locals.getSession();
	return { session };
}
