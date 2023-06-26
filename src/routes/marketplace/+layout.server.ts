import prisma from "$lib/mark/db/page";
import type { RequestEvent } from "./$types";

export const load = async ({ cookies }: RequestEvent) => {
  const response = await prisma.category.findMany({
    include: { media: true, products: { include: { media: true } } },
  });

  const products = await prisma.product.findMany({
    include: {
      media: true,
      category: true,
    },
  });

  let config = await prisma.config.findFirst();

  if (!config) {
    config = await prisma.config.create({
      data: {
        data: `{LANDING_PAGE:{}}`,
      },
    });
  }

  try {
    config = JSON.parse(config.data);
  } catch (error) {
    config = {
      //@ts-ignore
      LANDING_PAGE: {},
    };
  }

  let deviceId: any = cookies.get("device----id");

  if (!deviceId) {
    let id = crypto.randomUUID();
    deviceId = cookies.set("device----id", id, { path: "/" });
  }

  return { categories: response, products, config };
};
