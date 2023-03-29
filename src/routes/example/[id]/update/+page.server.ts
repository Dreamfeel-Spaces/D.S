//@ts-nocheck
import { prisma } from '$lib/db/prisma';
import { error } from '@sveltejs/kit';

export const actions = {
	async update({ request, params }) {
		const exampleId = params["app_id"];
		const data = await request.formData();
		const property = String(data.get('property'));
		const updated = await prisma.example.update({
			where: { id: exampleId },
			data: { property }
		});
		return { success: true, data: updated };
	},
	async delete({ params }) {
		const exampleId = params["app_id"];
		await prisma.example.delete({
			where: { id: exampleId }
		});
		return { success: true };
	}
};

export async function load({ params }) {
	const exampleId = params["app_id"];
	const example = await prisma.example.findUnique({ where: { id: exampleId } });
	if (!example) throw error(404, 'Example not found');
	return { example };
}
