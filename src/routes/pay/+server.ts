import { prisma } from '$lib/db/prisma';
import { Pay } from '$lib/pay/Pay';
import type { RequestEvent } from './$types';
import crypto from 'crypto';

export async function POST({ request }: RequestEvent) {
	const data = await request.json();
	const items = data.items;
	const transactionId = generateTransactionId();

	const CLIENT_ID = data['CLIENT_ID'];
	const CLIENT_SECRET = data['CLIENT_SECRET'];

	const dPayAcc = await prisma.spacePayCred.findFirst({
		where: {
			key: CLIENT_ID,
			secret: CLIENT_SECRET
		},
		include: {
			space: true
		}
	});

	const wallet = await prisma.spaceWallet.findFirst({
		where: {
			spaceId: dPayAcc?.space?.id,
			default: true
		}
	});

	const transactionRequest = await prisma.txnRequest.create({
		data: {
			spaceId: dPayAcc?.space?.id,
			walletId: wallet?.id,
			identifier: transactionId,
			uriToken: transactionId,
			secret: 'hh',
			amount: data['amount']
		}
	});

	items.forEach(async (item: any) => {
		try {
			await prisma.txnItem.create({
				data: {
					txnRequestId: transactionRequest.id,
					itemId: item?.itemId,
					name: item?.name,
					pricePerItem: String(item?.pricePerItem)
				}
			});
		} catch (e) {
			console.log(e);
		}
	});

	return new Response(JSON.stringify(transactionId));
}

export async function PUT({ request }: RequestEvent) {
	const handler = new Pay();
	const data = await handler.stkPush({ phone: '0795040851', amount: 1 });

	return new Response('{ OK: 0000000 }');
}

function generateTransactionId() {
	const transactionData = Math.random().toString(36).substring(2); // generate random data
	const hash = crypto.createHash('sha256'); // create SHA-256 hash function
	const transactionId = hash.update(transactionData).digest('hex'); // generate TXID by hashing the data
	return transactionId;
}
