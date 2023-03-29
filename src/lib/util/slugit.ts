//@ts-nocheck
export function convertToSlug(Text: string) {
	return Text.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}

export async function errorCatch(promise: any) {
	try {
		return [await promise, null];
	} catch (e) {
		return [null, e];
	}
}

export function cleanData(filters, fields, rows) {
	let validRows = rows.filter((row) => {
		for (let i = 0; i < filters.length; i++) {
			let compareFieldName = filters[i].compare;
			let operand = filters[i].operand;
			let compareWith = filters[i].compareColumnId;

			switch (operand) {
				case 'greater_than': {
					const compareFieldValue = Number(row[compareFieldName]);
					if (compareWith === '__custom_field') {
						let compareWithCustomValue = Number(filters[i].compareValue);
						return compareFieldValue > compareWithCustomValue;
					}
				}
				case 'less_than': {
					const compareFieldValue = Number(row[compareFieldName]);
					if (compareWith === '__custom_field') {
						let compareWithCustomValue = Number(filters[i].compareValue);
						return compareFieldValue < compareWithCustomValue;
					}
				}
				case 'equals': {
					const compareFieldValue = Number(row[compareFieldName]);
					if (compareWith === '__custom_field') {
						let compareWithCustomValue = Number(filters[i].compareValue);
						return compareFieldValue === compareWithCustomValue;
					}
				}
			}
		}

		return row;
	});

	return validRows;
}

export function isReservedRoute(pathname: string) {
	let isAccounts = /^\/accounts/.test(pathname);
	let isAdmin = /^\/admin/.test(pathname);
	let isApi = /^\/api/.test(pathname);
	let isApps = /^\/apps/.test(pathname);
	let isBase = /^\/rest/.test(pathname);
	let isSpaces = /^\/preferences/.test(pathname);
	let isBlog = /^\/blog/.test(pathname);
	let isDashboards = /^\/dashboards/.test(pathname);
	let isDeactivated = /^\/deactivated/.test(pathname);
	let isEditor = /^\/editor/.test(pathname);
	let isExample = /^\/example/.test(pathname);
	let isOnboarding = /^\/onboarding/.test(pathname);
	let isPdf = /^\/pdf/.test(pathname);
	let isHome = /^\/$/.test(pathname);
	let isAbout = /^\/about/.test(pathname);
	let isDocs = /^\/docs/.test(pathname);
	let isForms = /^\/forms/.test(pathname);
	let isReports = /^\/reports/.test(pathname);
	let isApp = /^\/a\/(.+)/.test(pathname);
	let isMockServer = /^\/api\/examples/.test(pathname);
	let isCreate = /^\/create/.test(pathname)
	let isFeedback = /^\/feedback/.test(pathname)

	let reservedRoutes = [
		isFeedback,
		isAccounts,
		isAdmin,
		isApi,
		isApps,
		isBase,
		isBlog,
		isDashboards,
		isDeactivated,
		isEditor,
		isExample,
		isPdf,
		isSpaces,
		isHome,
		isAbout,
		isBlog,
		isDocs,
		isForms,
		isReports,
		isApp,
		isMockServer,
		isOnboarding,
		isCreate
	];

	return reservedRoutes.find(Boolean);
}


