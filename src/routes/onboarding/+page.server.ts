import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageLoadEvent } from './$types';

export const actions: Actions = {
	async stepOne({ params, request }) {}
};

export async function load({ params }: PageLoadEvent) {}
