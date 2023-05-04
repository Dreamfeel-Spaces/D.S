import { error, redirect } from '@sveltejs/kit';
import { prisma } from '$lib/db/prisma';
import type { PageServerLoadEvent, Actions } from './$types';

export const actions: Actions = {
	async updateChannels({ request, params }) {
		const data = await request.formData();

		const appId = params['app_id'];

		const space = await prisma.space.findUnique({
			where: {
				appId: String(appId)
			}
		});

		if (!space) throw error(404, 'Could not find this space');

		const miniAppChannel = String(data.get('customDomainChannel') ?? 'false');
		const apiChannel = String(data.get('apiChannel') ?? 'false');
		const subdomainChannel = String(data.get('subdomainChannel') ?? 'false');
		const customDomainChannel = String(data.get('customDomainChannel') ?? 'false');
		const standaloneMobileChannel = String(data.get('standaloneMobileChannel') ?? 'false');
		const standaloneDesktopChannel = String(data.get('standaloneDesktopChannel') ?? 'false');

		const updatedSpace = await prisma.space.update({
			// @ts-ignore
			where: { id: space.id },
			data: {
				miniAppChannel: JSON.parse(miniAppChannel),
				apiChannel: JSON.parse(apiChannel),
				subdomainChannel: JSON.parse(subdomainChannel),
				customDomainChannel: JSON.parse(customDomainChannel),
				standaloneMobileChannel: JSON.parse(standaloneMobileChannel),
				standaloneDesktopChannel: JSON.parse(standaloneDesktopChannel)
			}
		});

		return { apiUpdateSuccess: true, data: updatedSpace };
	}
};

export async function load({ locals }: PageServerLoadEvent) {
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
		throw redirect(302, `/a/${space?.appId}/welcome`);
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

	const groupedSessions = groupDataByMonth(sessions);

	return { userCount, newUsers, tableCount, uiCount, groupedUsers, groupedSessions, groupedRevenues:[] };
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

async function getUserSignupData() {
	const data = await prisma.user.groupBy({
		by: ['DATE(created_at)'],
		_count: {
			createdAt: true
		}
	});

	// Convert data to Chart.js format
	const labels = data.map((day) => day.DATE(created_at).toISOString().substring(0, 10));
	const counts = data.map((day) => day._count.createdAt);
	const chartData = {
		labels: labels,
		datasets: [
			{
				label: 'User Signups',
				data: counts,
				backgroundColor: 'rgba(255, 99, 132, 0.2)',
				borderColor: 'rgba(255, 99, 132, 1)',
				borderWidth: 1
			}
		]
	};
}

//   // Create and return the Chart.js chart object
//   const chart = new Chart(document.getElementById("myChart"), {
//     type: "line",
//     data: chartData,
//     options: {
//       scales: {
//         yAxes: [{
//           ticks: {
//             beginAtZero: true,
//             stepSize: 1,
//           },
//         }],
//       },
//     },
//   });

//   return chart;
// }
