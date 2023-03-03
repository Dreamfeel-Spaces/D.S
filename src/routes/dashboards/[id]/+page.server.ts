import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
export async function load({ params }: RequestEvent) {
	const appId = params.id;
	const space = await prisma.space.findUnique({
		where: { appId: String(appId) },
		include: {
			tables: {
				include: {
					rows: {
						include: {
							_count: true
						}
					}
				}
			}
		}
	});
	if (!space) throw error(404, 'Dashboard not found');
	return { space };
}
