import prisma from "$lib/db/page";
import type { RequestEvent } from "./$types";

export async function POST({ request }: RequestEvent) {
  const data = await request.json();

  const category = await prisma.category.create({
    data: {
      title: String(data.title),
      description: String(data.description),
    },
  });

  for (let image of data.images ?? []) {
    const media = await prisma.media.create({
      data: {
        url: image.url,
        categoryId: category.id,
      },
    });
  }

  return new Response();
}
