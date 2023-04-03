import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
export async function load({ params, locals }: RequestEvent) {
	// @ts-ignore
	const space = locals.space;
	if (!space) throw error(404, 'Dashboard not found');
	return { space };
}
