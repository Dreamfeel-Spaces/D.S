import { prisma } from '$lib/db/prisma';
import type { Actions, RequestEvent } from './$types';

export async function load({ params, locals }: RequestEvent) {
	const space = locals.space;
	const wallet = await prisma.spaceWallet.findFirst({
		where: {
			id: params.id,
			spaceId: space?.id
		},
		include: {
			txnRequest: true
		}
	});

	const incomes = wallet?.txnRequest.filter((r) => r.type === 'incoming') ?? [];
	const outcomes = wallet?.txnRequest.filter((r) => r.type === 'outgoing') ?? [];

	const incomesTotals = incomes.reduce((prev, curr) => {
		return prev + curr.amount;
	}, 0);

	const outcomesTotals = incomes.reduce((prev, curr) => {
		return prev + curr.amount;
	}, 0);

	const transactions = wallet?.txnRequest;

	const balance = incomesTotals - outcomesTotals;

	return { wallet, incomes, outcomes, incomesTotals, outcomesTotals, balance, transactions };
}

export const actions: Actions = {
	async default({ locals, request, params }) {
		const data = await request.formData();
		const id = params.id;

		const existing = await prisma.spaceWallet.findFirst({
			where: { default: true }
		});
		if (existing) {
			const wallet = await prisma.spaceWallet.update({
				where: { id: existing.id },
				data: {
					default: false
				}
			});
		}

		const wallet = await prisma.spaceWallet.update({
			where: { id },
			data: {
				default: true
			}
		});

		return { success: true, data: wallet };
	}
};
