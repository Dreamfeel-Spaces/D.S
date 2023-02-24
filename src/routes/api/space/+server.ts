import type { RequestEvent } from './$types';

export async function GET({ request }: RequestEvent) {
	const accessToken = request.headers.get('access_token');
	return new Response('it works');
}

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	// console.log(data);
	return new Response('It works');
}


