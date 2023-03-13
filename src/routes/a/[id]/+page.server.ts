import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';

export async function load({ cookies, params }: RequestEvent) {
	const appId = params.id;

	const userToken = cookies.get(`${appId}-accessToken`);

	if (!userToken) {
		throw redirect(302, `/a/${appId}/accounts`);
	}
}
