import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
export async function load({ params, cookies }: RequestEvent) {
	const spaceId = params["app_id"];
	const cookie = cookies.get(`${spaceId}-accessToken`);
	if (!cookie) throw redirect(302, `/a/${spaceId}/accounts`);

	const appId = params["app_id"];
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
