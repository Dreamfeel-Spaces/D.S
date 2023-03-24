import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error } from '@sveltejs/kit';

export async function GET({ params }: RequestEvent) {}

export async function POST({ params, request }: RequestEvent) {
	const data = await request.json();
	console.log(data);
}
