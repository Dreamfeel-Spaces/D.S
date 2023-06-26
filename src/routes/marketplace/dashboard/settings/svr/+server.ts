import prisma from "$lib/mark/db/page";
import type { RequestEvent } from "./$types";

export async function PUT({ request }: RequestEvent) {
  const data = await request.json();

  let config = await prisma.config.findFirst();

  if (!config) {
    config = await prisma.config.create({
      data: {
        data: JSON.stringify(data),
      },
    });
  } else
    config = await prisma.config.update({
      where: {
        id: config.id,
      },
      data: {
        data: JSON.stringify(data),
      },
    });

  return new Response(JSON.stringify(data));
}
