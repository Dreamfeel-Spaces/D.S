import { Token } from '$lib/token/Token';
import type { RequestEvent } from './$types';

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	const token = new Token();
	const jwt = await token.jwt(data);
	return new Response(jwt);
}
