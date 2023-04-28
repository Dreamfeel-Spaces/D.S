import { prisma } from '$lib/db/prisma';
import emailHandler from '$lib/email/Email';
import { confirmationEmail } from '$lib/email/confirmationEmail';
import { error } from '@sveltejs/kit';
import type { RequestEvent } from './$types';
import bcrypt from 'bcrypt';
export async function POST({ locals }: RequestEvent) {
	//@ts-ignore
	const session = await locals.getSession();

	const user = await prisma.user.findUnique({
		where: {
			email: String(session?.user?.email)
		}
	});

	let code = generateVerificationCode();

	const htmlEmail = await confirmationEmail({ name: user?.name ?? '', code });

	await emailHandler({
		firstName: 'Dreamfeel Spaces',
		lastName: '',
		email: user?.email,
		message: htmlEmail,
		subject: `Verify email address`
	});

	let encrypted = bcrypt.hashSync(code, 8);

	const existing = await prisma.verificationToken.findFirst({
		where: {
			identifier: String(user?.id)
		}
	});

	if (!existing)
		await prisma.verificationToken.create({
			data: {
				identifier: String(user?.id),
				token: encrypted,
				expires: calculateDate24HoursFromNow()
			}
		});
	else
		await prisma.verificationToken.update({
			where: {
				token: existing.token
			},
			data: {
				token: encrypted,
			}
		});

	return new Response('{success:true}');
}

export async function PUT({ locals, request }: RequestEvent) {
	//@ts-ignore
	const user = locals.user;

	const data = await request.json();

	const code = data.value;

	const token = await prisma.verificationToken.findFirst({
		where: {
			identifier: user?.id
		}
	});

	if (bcrypt.compareSync(code, token?.token ?? '')) {
		await prisma.user.update({
			where: {
				id: user?.id
			},
			data: {
				emailVerified: new Date()
			}
		});
		return new Response('{success:true}');
	} else throw error(403, 'Action not permitted');
}

function generateVerificationCode() {
	let code = '';
	for (let i = 0; i < 6; i++) {
		code += Math.floor(Math.random() * 10);
	}
	return code;
}

function calculateDate24HoursFromNow() {
	const now = new Date(); // get the current date and time
	const future = new Date(now.getTime() + 24 * 60 * 60 * 1000); // add 24 hours (in milliseconds) to the current time
	return future;
}
