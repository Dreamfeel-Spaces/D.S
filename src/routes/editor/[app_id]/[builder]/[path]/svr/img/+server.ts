import type { RequestEvent } from './$types';
import fs from 'node:fs/promises';
export async function GET({ params }: RequestEvent) {

	console.log(image);

	return new Response();
}
