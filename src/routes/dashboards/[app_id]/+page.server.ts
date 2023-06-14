import { error, redirect } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import { prisma } from '$lib/db/prisma';
export async function load({ locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;
	//@ts-ignore
	let user: any = locals.spaceSession?.user;
	//@ts-ignore
	let megaUser = locals.user;

	if (megaUser && !megaUser.emailVerified) {
		throw redirect(302, `/verify?next=/a/${space?.appId}`);
	}

	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	const onboarding = space.onboarding[0];

	if (!user?.id) throw redirect(302, `/a/${space.appId}/accounts`);

	if (!onboarding?.complete) {
		// throw redirect(302, `/a/${space?.appId}/welcome`);
	}

	let userCount = await prisma.spaceUser?.count({
		where: {
			spaceId: space.id
		}
	});

	let lastDay = Date.now() - 24 * 60 * 60 * 1000;
	//@ts-ignore
	lastDay = new Date(lastDay).toISOString();

	const newUsers = await prisma.spaceUser.count({
		where: {
			AND: [
				{
					spaceId: space?.id
				},
				{
					dateCreated: {
						//@ts-ignore
						gte: lastDay
					}
				}
			]
		}
	});

	const tableCount = await prisma.spaceTable.count({
		where: {
			appId: space?.id
		}
	});

	const uiCount = await prisma.spaceUI.count({
		where: {
			spaceId: space?.id
		}
	});

	const allUsers = await prisma.spaceUser.findMany({
		where: {
			spaceId: space?.id
		}
	});

	const groupedUsers = groupDataByMonth(allUsers);

	const sessions = await prisma.spaceSession.findMany({
		where: {
			spaceId: space?.id
		}
	});

	const apiRecords = await prisma.aPICounter.count({
		where: {
			spaceId: space?.id
		}
	});

	const groupedSessions = groupDataByMonth(sessions);

	const reports = await prisma.report.findMany({
		where: {
			spaceId: space?.id
		},
		include: {
			table: true
		}
	});

	const forms = await prisma.dashboardForm.findMany({
		where: {
			spaceId: space?.id
		},
		include: {
			table: true
		}
	});

	return {
		userCount,
		newUsers,
		tableCount,
		uiCount,
		groupedUsers,
		groupedSessions,
		groupedRevenues: [],
		apiRecords,
		reports,
		forms
	};
}

function groupDataByMonth(data) {
	// Create an object to store the grouped data
	const groupedData = {};

	// Define an array of month names to use in the output
	const monthNames = [
		'Jan',
		'Feb',
		'Mar',
		'Apr',
		'May',
		'Jun',
		'Jul',
		'Aug',
		'Sep',
		'Oct',
		'Nov',
		'Dec'
	];

	// Loop through the data array and group objects by month
	data.forEach((item) => {
		// Get the month portion of the createdAt field as a number (0-11)
		const monthNum = new Date(item.dateCreated).getMonth();

		// Get the month name from the monthNames array
		const monthName = monthNames[monthNum];

		// If the month is not in the groupedData object yet, create a new entry
		if (!groupedData[monthName]) {
			groupedData[monthName] = {
				month: monthName,
				count: 0
			};
		}

		// Increment the count for the month
		groupedData[monthName].count++;
	});

	// Convert the grouped data object into an array of objects for Chart.js
	const chartData = Object.values(groupedData);

	return chartData;
}
