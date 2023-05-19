import { prisma } from '$lib/db/prisma';
import type { RequestEvent } from './$types';
import { error, redirect } from '@sveltejs/kit';

export async function load({ params, cookies, locals }: RequestEvent) {
	//@ts-ignore
	const space = locals.space;

	let user: any = space.users[0];
	if (user) user.role = space.roles.find((role: { id: any }) => role.id === user?.userRolesId);

	let spaceSession = { user };

	let apiSetup = space.apiSetup[0];

	if (!apiSetup?.complete) {
		throw redirect(302, `/rest/${space?.appId}/quick-setup`);
	}

	const tables = space.tables ?? [];

	const apiCount = await prisma.aPICounter.findMany({
		where: {
			spaceId: space?.id
		}
	});

	const counterByMethos = await prisma.aPICounter.groupBy({
		where: { spaceId: space?.id },
		by: ['method'],
		_count: {
			_all: true
		}
	});

	const groupedCounts = counterByMethos.map((c) => ({ count: c._count._all, label: c.method }));

	const tableReads = await prisma.tableRead.groupBy({
		where: { spaceId: space?.id },
		by: ['spaceTableId'],
		_count: {
			_all: true
		}
	});

	const logs = await prisma.log.findMany({
		where: { spaceId: space?.id }
	});

	const groupedLogs = groupDataByMonth(logs);

	const groupedReads = tableReads.map((c) => ({
		count: c._count._all,
		label: space?.tables?.find((table) => table.id === c.spaceTableId)?.label
	}));

	return {
		tables,
		space,
		apiCount: groupDataByMonth(apiCount),
		groupedCounts,
		groupedReads,
		groupedLogs
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
		const monthNum = new Date(item.dateCreated || item.timestamp).getMonth();

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
