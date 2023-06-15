// @ts-nocheck
import { prisma } from '$lib/db/prisma';
import { Pages } from '$lib/plugins/pages/Pages';
import type { LayoutServerLoad } from './$types';

export const csr = true;

export const load: LayoutServerLoad = async ({ locals, url, cookies }) => {
	const pages = new Pages({ url });

	const identifier = url.searchParams.get('transaction_id');

	if (pages.sbd === 'pay' && identifier) {
		const transactionRequest = await prisma.txnRequest.findFirst({
			where: { identifier },
			include: {
				txnItems: true
			}
		});

		return { transactionRequest };
	}

	const session = await locals.getSession();

	if (pages.sbd === 'pos') {
		console.log(locals);
	}

	if (session) {
		const user = await prisma.user.findUnique({
			where: {
				email: session?.user?.email
			}
		});
		const myapps = await prisma.space.findMany({
			where: {
				userId: String(user?.id),
				deactivated: false
			},
			include: {
				tables: true,
				spaceUis: {
					include: {
						spaceUIVersion: true
					}
				},
				dashboards: true
			}
		});

		return {
			session,
			myapps: myapps.filter((app) => Boolean(app.appId))
		};
	}

	const demo = await prisma.space.findUnique({
		where: { appId: 'demo' },
		include: {
			tables: true,
			spaceUis: {
				include: {
					spaceUIVersion: true
				}
			},
			dashboards: true
		}
	});

	if (demo) return { session, myapps: [demo] };
	return { session, myapps: [] };
};
