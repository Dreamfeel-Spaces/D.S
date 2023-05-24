// See https://kit.svelte.dev/docs/types#app
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
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
