import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';

export async function load({ locals }: RequestEvent) {
	const space = locals.space;

	const configVars = await prisma.configVars.findFirst({
		where: {
			appId: space.id,
			key: 'SMS'
		}
	});

	let values;

	try {
		values = JSON.parse(JSON.parse(configVars?.value ?? '"{}"'));
	} catch (error) {
		values = JSON.parse(configVars?.value ?? '{}');
	}

    console.log(values)

	return { configVars, values };
}
