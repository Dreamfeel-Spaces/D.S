// src/routes/+page.server.ts

import prisma from "$lib/mark/db/page";
import type { PageServerLoad } from "./$types";

export const load = (async () => {
  const response = await prisma.category.findMany({
    include: { media: true,  },
  });

  

  return { categories: response };
}) satisfies PageServerLoad;
