// See https://kit.svelte.dev/docs/types#app

import type { prisma } from '$lib/db/prisma';

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			space: {
				name: string;
				appId: string;
				icon: string;
				owner: any;
				userId: string;
				id: string;
				tables: any[];
			};
			db: typeof prisma;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
