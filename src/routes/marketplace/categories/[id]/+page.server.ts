// src/routes/+page.server.ts

import prisma from "$lib/db/page";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const response = await prisma.category.findMany({
    include: { media: true, products: { include: { media: true } } },
  });

  let category = response.find((res) => res.title === params.id);
  return { categories: response, category };
}) satisfies PageServerLoad;
