import prisma from "$lib/mark/db/page";

export async function load({}) {
  const orders = await prisma.order.findMany();

  return { orders };
}
