//@ts-nocheck
import { prisma } from '$lib/db/prisma';

export async function load({ url }) {
	const page = Number(url.searchParams.get('page') ?? 1);
	const take = Number(url.searchParams.get('skip') ?? 2);
	const count = await prisma.example.count();
	const pages = Math.ceil(count / take);
	let skip = page === 1 ? 0 : page * take;
	const examples = await prisma.example.findMany({
		take,
		skip
	});
	return { examples, count, page, skip, pages };
}
