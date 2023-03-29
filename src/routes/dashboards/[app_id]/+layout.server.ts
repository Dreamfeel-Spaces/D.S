import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';

export async function load({ cookies, params, locals }: RequestEvent) {
	// @ts-ignore
	let space: any = locals.space;
	//@ts-ignore
	const spaceSession = locals.spaceSession;

	if (!space) throw error(404, 'Page not found');

	if (!spaceSession?.user) throw redirect(302, `/a/${space.appId}/accounts`);

	return { space, spaceSession };
}
