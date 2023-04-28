//@ts-nocheck
export function convertToSlug(Text: string) {
	return Text.toLowerCase()
		.replace(/ /g, '-')
		.replace(/[^\w-]+/g, '');
}

export async function errorCatch(promise) {
	try {
		return [await promise, null];
	} catch (e) {
		console.log(e);
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
	let isSpaces = /^\/spaces/.test(pathname);
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
	let isCreate = /^\/create/.test(pathname);
	let isFeedback = /^\/feedback/.test(pathname);
	let isEarlyAccess = /^\/early-access/.test(pathname);
	let isLab = /^\/lab/.test(pathname);
	let isVerify = /^\/verify/.test(pathname);

	let reservedRoutes = [
		isVerify,
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
		isCreate,
		isEarlyAccess,
		isLab
	];

	return reservedRoutes.find(Boolean);
}

const Colors = {};
Colors.names = {
	aqua: '#00ffff',
	azure: '#f0ffff',
	beige: '#f5f5dc',
	black: '#000000',
	blue: '#0000ff',
	brown: '#a52a2a',
	cyan: '#00ffff',
	darkblue: '#00008b',
	darkcyan: '#008b8b',
	darkgrey: '#a9a9a9',
	darkgreen: '#006400',
	darkkhaki: '#bdb76b',
	darkmagenta: '#8b008b',
	darkolivegreen: '#556b2f',
	darkorange: '#ff8c00',
	darkorchid: '#9932cc',
	darkred: '#8b0000',
	darksalmon: '#e9967a',
	darkviolet: '#9400d3',
	fuchsia: '#ff00ff',
	gold: '#ffd700',
	green: '#008000',
	indigo: '#4b0082',
	khaki: '#f0e68c',
	lightblue: '#add8e6',
	lightcyan: '#e0ffff',
	lightgreen: '#90ee90',
	lightgrey: '#d3d3d3',
	lightpink: '#ffb6c1',
	lightyellow: '#ffffe0',
	lime: '#00ff00',
	magenta: '#ff00ff',
	maroon: '#800000',
	navy: '#000080',
	olive: '#808000',
	orange: '#ffa500',
	pink: '#ffc0cb',
	purple: '#800080',
	violet: '#800080',
	red: '#ff0000',
	silver: '#c0c0c0',
	white: '#ffffff',
	yellow: '#ffff00'
};

Colors.random = function () {
	var result;
	var count = 0;
	for (var prop in this.names) if (Math.random() < 1 / ++count) result = prop;
	return result;
};

export function getColorCode(name) {
	return {
		aqua: '#00ffff',
		azure: '#f0ffff',
		beige: '#f5f5dc',
		blue: '#0000ff',
		brown: '#a52a2a',
		cyan: '#00ffff',
		darkblue: '#00008b',
		darkcyan: '#008b8b',
		darkgrey: '#a9a9a9',
		darkgreen: '#006400',
		darkkhaki: '#bdb76b',
		darkmagenta: '#8b008b',
		darkolivegreen: '#556b2f',
		darkorange: '#ff8c00',
		darkorchid: '#9932cc',
		darkred: '#8b0000',
		darksalmon: '#e9967a',
		darkviolet: '#9400d3',
		fuchsia: '#ff00ff',
		gold: '#ffd700',
		green: '#008000',
		khaki: '#f0e68c',
		lightblue: '#add8e6',
		lightcyan: '#e0ffff',
		lightgreen: '#90ee90',
		lightgrey: '#d3d3d3',
		lightpink: '#ffb6c1',
		lightyellow: '#ffffe0',
		lime: '#00ff00',
		magenta: '#ff00ff',
		maroon: '#800000',
		navy: '#000080',
		olive: '#808000',
		orange: '#ffa500',
		pink: '#ffc0cb',
		purple: '#800080',
		violet: '#800080',
		red: '#ff0000',
		silver: '#c0c0c0',
		white: '#ffffff',
		yellow: '#ffff00'
	}[name];
}
// export Colors
