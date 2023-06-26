import prisma from "$lib/mark/db/page";
import { error } from "@sveltejs/kit";
import type { RequestEvent } from "./$types";

export async function POST({ request, cookies }: RequestEvent) {
  const data = await request.json();

  let deviceId: any = cookies.get("device----id");

  if (!deviceId) {
    let id = crypto.randomUUID();
    deviceId = cookies.set("device----id", id, { path: "/" });
  }

  const order = await prisma.order.create({
    data: {
      deviceId,
      data: JSON.stringify(data),
    },
  });

  let address = await prisma.address.create({
    data: {
      ...data.address,
      orderId: order.id,
    },
  });

  return new Response(JSON.stringify(order));
}

export async function PUT({ request, cookies }: RequestEvent) {
  const data = await request.json();

  let deviceId: any = cookies.get("device----id");

  let order = await prisma.order.findFirst({
    where: {
      deviceId,
      status: "pending",
    },
  });

  if (!order) throw error(404, "Order not founder");

  order = await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: "failed",
    },
  });

  const payment = await prisma.payments.create({
    data: {
      status: "failed",
      orderId: order.id,
      phone: String(data.phone),
      amount: Number(data.amount),
    },
  });

  throw error(500, JSON.stringify(order));
}
