// import { prisma } from '$lib/db/prisma';
// import { error } from '@sveltejs/kit';
// import type { RequestEvent } from './$types';

// export async function load({ locals }: RequestEvent) {
// 	const session = await locals.getSession();

// 	if (!session) {
// 		throw error(404, 'Space not found');
// 	}

// 	const user = await prisma.user.findFirst({
// 		where: {
// 			email: session?.user?.email
// 		}
// 	});

// 	if (!user) throw error(403, 'Unknown user');

//     // const app = await
// }


export async function load(){
    
}