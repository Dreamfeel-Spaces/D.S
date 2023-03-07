import { prisma } from '$lib/db/prisma';

export async function load() {
	const apps = await prisma.space.findMany({
		where: {
			miniAppChannel: true,
            deactivated:false
		}
	});

	return { apps };
}
