//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions, RequestEvent } from './$types';

export const actions: Actions = {
	async default({ request, locals }) {
		let data = await request.formData();

		let space = locals.space;

		let spaceTableId = String(data.get('collection'));
		let nameCol = String(data.get('nameCol'));
		let imageCol = String(data.get('imageCol'));
		let priceCol = String(data.get('priceCol'));
		let compareAtPriceCol = String(data.get('compareAtPriceCol'));
		let taxable = data.get('taxable') === 'true';
		let costPerItem = parseFloat(String(data.get('costPerItem')));
		let quantityTrackable = data.get('quantityTrackable') === 'true';
		let quantityCol = String(data.get('quantityCol'));
		let continuesToSell = data.get('continuesToSell') === 'true';
		let hasSkuOrBarcode = data.get('hasSkuOrBarcode') === 'true';
		let barcodeCol = String(data.get('barcodeCol'));
		let skuCol = String(data.get('skuCol'));
		let type = String(data.get('type'));

		const saved = await prisma.pOSCollection.create({
			data: {
				spaceTableId,
				nameCol,
				imageCol,
				priceCol,
				compareAtPriceCol,
				taxable,
				costPerItem,
				quantityTrackable,
				quantityCol,
				continuesToSell,
				hasSkuOrBarcode,
				barcodeCol,
				skuCol,
				type,
				spaceId: space.id
			}
		});

		return { success: true };
	}
};

export async function load({ locals }: RequestEvent) {
	const space = locals.space;

	//@ts-ignore
	let user: any = locals.spaceSession?.user;
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	let collections = await prisma.pOSCollection.findMany({
		where: {
			spaceId: space.id
		}
	});

	return {
		collections: collections.map((col) => {
			return { ...col, collection: space.tables.find((table) => table.id === col.spaceTableId) };
		})
	};
}
