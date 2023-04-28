import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';
import {
	CAPTCHA_SITEKEY,
} from '$env/static/private';
export async function load({ locals }: RequestEvent) {
	//@ts-ignore
	const user = locals.user;


	if (!user) throw redirect(302, '/accounts');

	return { user, CAPTCHA_SITEKEY };
}
