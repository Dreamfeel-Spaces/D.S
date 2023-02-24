import type { RequestEvent } from '../$types';

export async function GET({ request }: RequestEvent) {
	const access_token = await request.headers.get('access_token');
}
