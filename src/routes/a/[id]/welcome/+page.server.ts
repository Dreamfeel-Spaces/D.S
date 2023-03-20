import { prisma } from '$lib/db/prisma';
import { error, redirect } from '@sveltejs/kit';
import type { Actions, PageLoadEvent } from './$types';

export const actions: Actions = {
	async stepOne({ params, request }) {
		const appId = params.id;
		const space = await prisma.space.findFirst({
			where: {
				appId
			},
			include: {
				onboarding: true
			}
		});

		if (!space) throw error(404, 'Space not found');

		let onboarding = space.onboarding[0];

		if (!onboarding) {
			onboarding = await prisma.onboarding.create({
				data: {
					spaceId: space.id
				}
			});
		}

		const data = await request.formData();
		const stepOne = String(data.get('whoAmi'));

		await prisma.onboarding.update({
			where: {
				id: space.onboarding[0].id
			},
			data: {
				step: 1,
				stepRole: stepOne
			}
		});
	},
	async stepTwo({ params, request }) {
		const appId = params.id;
		const space = await prisma.space.findFirst({
			where: {
				appId
			},
			include: {
				onboarding: true
			}
		});

		if (!space) throw error(404, 'Space not found');

		let onboarding = space.onboarding[0];

		if (!onboarding) {
			onboarding = await prisma.onboarding.create({
				data: {
					spaceId: space.id
				}
			});
		}

		const data = await request.formData();
		const stepTwo = String(data.get('whoAmi'));

		await prisma.onboarding.update({
			where: {
				id: space.onboarding[0].id
			},
			data: {
				step: 2,
				stepClient: stepTwo
			}
		});
	},
	async stepThree({ params, request }) {
		const appId = params.id;
		const space = await prisma.space.findFirst({
			where: {
				appId
			},
			include: {
				onboarding: true
			}
		});

		if (!space) throw error(404, 'Space not found');

		let onboarding = space.onboarding[0];

		if (!onboarding) {
			onboarding = await prisma.onboarding.create({
				data: {
					spaceId: space.id
				}
			});
		}

		const data = await request.formData();
		const stepThree = String(data.get('whoAmi'));

		await prisma.onboarding.update({
			where: {
				id: space.onboarding[0].id
			},
			data: {
				step: 3,
				stepCoding: stepThree
			}
		});
	},
	async stepFour({ params, request }) {
		const appId = params.id;
		const space = await prisma.space.findFirst({
			where: {
				appId
			},
			include: {
				onboarding: true
			}
		});

		if (!space) throw error(404, 'Space not found');

		let onboarding = space.onboarding[0];

		if (!onboarding) {
			onboarding = await prisma.onboarding.create({
				data: {
					spaceId: space.id
				}
			});
		}

		const data = await request.formData();
		const stepThree = String(data.get('whoAmi'));
		const other = String(data.get('other'));

		await prisma.onboarding.update({
			where: {
				id: space.onboarding[0].id
			},
			data: {
				step: 4,
				stepCoding: stepThree === 'other' ? other : stepThree,
				complete: true
			}
		});

		throw redirect(303, `/a/${space.appId}/welcome/new`);
	}
};

export async function load({ params }: PageLoadEvent) {
	const appId = params.id;
	const space = await prisma.space.findFirst({
		where: {
			appId
		},
		include: {
			onboarding: true
		}
	});

	if (!space) throw error(404, 'Space not found');

	let onboarding = space.onboarding[0];

	if (onboarding?.complete) throw redirect(302, `/a/${appId}/welcome/new`);
}
