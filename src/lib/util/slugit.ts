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
	const validRows = rows.filter((row) => {
		let isValid = true;
		for (let filter of filters) {
			const compare = row[filter.compare];
			const operand = filter.operand;
			let compareValue = filter.compareValue;
			if ((filter.compareValue = '__custom_field')) compareValue = filter.compareValue;
			const field = fields.find((field) => field.field.name === filter.compare);
			const type = field?.field?.type;
			if (type === 'number') {
				if (operand === 'equals') {
					isValid = Number(compare) === Number(compareValue);
				} else if (operand === 'less_than') {
					isValid = Number(compare) < Number(compareValue);
				} else if (operand === 'greater_than') {
					isValid = Number(compare) > Number(compareValue);
				} else {
					isValid = false;
				}
			}
			if (operand === 'equals') {
				isValid = compare === compareValue;
			} else if (operand === 'starts_with') {
				isValid = compare.startsWith(String(compareValue));
			} else if (operand === 'includes') {
				isValid = compare.includes(String(compareValue));
			}
		}

		return isValid;
	});

	return validRows;
}

export function isReservedRoute(pathname: string) {
	let isAccounts = /^\/accounts/.test(pathname);
	let isAdmin = /^\/admin/.test(pathname);
	let isApi = /^\/api/.test(pathname);
	let isApps = /^\/apps/.test(pathname);
	let isBase = /^\/base/.test(pathname);
	let isSpaces = /^\/spaces/.test(pathname);
	let isBlog = /^\/blog/.test(pathname);
	let isDashboards = /^\/dashboards/.test(pathname);
	let isDeactivated = /^\/deactivated/.test(pathname);
	let isEditor = /^\/editor/.test(pathname);
	let isExample = /^\/example/.test(pathname);
	let isPdf = /^\/pdf/.test(pathname);
	let isHome = /^\/$/.test(pathname);
	let isAbout = /^\/about/.test(pathname);
	let isDocs = /^\/docs/.test(pathname);
	let isForms = /^\/forms/.test(pathname);
	let isReports = /^\/reports/.test(pathname);
	let isApp = /^\/a\/(.+)/.test(pathname);
	let isMockServer = /^\/api\/examples/.test(pathname);

	let reservedRoutes = [
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
		isMockServer
	];

	return reservedRoutes.find(Boolean);
}
