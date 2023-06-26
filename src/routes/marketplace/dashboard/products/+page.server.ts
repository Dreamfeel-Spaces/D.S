// src/routes/+page.server.ts

import prisma from '$lib/mark/db/page';
import type { PageServerLoad } from './$types';

export const load = (async () => {
const response = await prisma.product.findMany({
    include: { media: true },
  })

return { products: response };
}) satisfies PageServerLoad;