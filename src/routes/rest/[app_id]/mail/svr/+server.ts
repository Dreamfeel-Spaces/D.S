import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function PUT({ params, locals, request }) {
	const space = locals.space;

	const data = await request.json();

	const provider = data.provider;
	const value = data.value;

	let configVar = await prisma.configVars.findFirst({
		where: {
			appId: space.id,
			key: 'SMTP_MAIL'
		}
	});

	if (!configVar) {
		configVar = await prisma.configVars.create({
			data: {
				appId: space.id,
				key: 'SMTP_MAIL',
				for: provider,
				value
			}
		});
		return new Response(JSON.stringify(configVar));
	}

	configVar = await prisma.configVars.update({
		where: {
			id: configVar.id
		},
		data: {
			value,
			for: provider
		}
	});

	return new Response(JSON.stringify(configVar));
}
