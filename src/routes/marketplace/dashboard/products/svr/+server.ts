import prisma from "$lib/db/page";
import type { RequestEvent } from "./$types";

export async function POST({ request }: RequestEvent) {
  const data = await request.json();

  const product = await prisma.product.create({
    data: {
      title: String(data.title),
      description: String(data.description),
      categoryId: Number(data.category),
      price: Number(data.price),
    },
  });

  for (let image of data.images ?? []) {
    const media = await prisma.media.create({
      data: {
        url: image.url,
        productId: product.id,
      },
    });
  }

  return new Response();
}
