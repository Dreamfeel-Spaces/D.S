import type { RequestEvent } from '../$types';

export async function POST({ request, params }: RequestEvent) {
	const data = await request.json();

	const type = data.type;
	const prompt = data.prompt;

	setTimeout(() => {}, 3000);

	return new Response("Try again");
}
