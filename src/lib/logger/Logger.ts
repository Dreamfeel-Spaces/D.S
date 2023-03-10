import { prisma } from '$lib/db/prisma';

export class Logger {
	constructor(req: any = {}) {
		// console.log(req.)
	}

	async info(event: any, spaceId: string = '') {
		if (spaceId) {
			const log = await prisma.log.create({
				data: {
					url: event.url.pathname,
					severity: 'info',
					spaceId
				}
			});
		}
	}

	async error(log: any) {
		if (log.console) console.error(log);
	}

	async warning(log: any) {
		if (log.console) console.info(log);
	}

	async verbose(log: any) {
		if (log.console) console.info(log);
	}

	async success(log: any) {
		if (log.console) console.info(log);
	}
}
