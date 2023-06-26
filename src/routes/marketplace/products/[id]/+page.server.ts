// src/routes/+page.server.ts

import prisma from "$lib/mark/db/page";
import { error } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";

export const load = (async ({ params }) => {
  const product = await prisma.product.findUnique({
    where: { id: Number(params.id) },
    include: { media: true, category: true },
  });

  if (!product) throw error(404, "product not found");

  return { product };
}) satisfies PageServerLoad;
