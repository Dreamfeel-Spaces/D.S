import * as nodemailer from 'nodemailer';

import { GMAIL_PASSWORD, GMAIL_USERNAME } from '$env/static/private';

export default async function emailHandler(options: any) {
	const { firstName, lastName, email, message , subject} = options;

	const transporter = nodemailer.createTransport({
		port: 465,
		host: 'smtp.gmail.com',
		auth: {
			user: GMAIL_USERNAME,
			pass: GMAIL_PASSWORD
		},
		secure: true
	});

	await new Promise((resolve, reject) => {
		// verify connection configuration
		transporter.verify(function (error: any, success: any) {
			if (error) {
				console.log(error);
				reject(error);
			} else {
				console.log('Server is ready to take our messages');
				resolve(success);
			}
		});
	});

	const mailData = {
		from: {
			name: `${firstName} ${lastName}`,
			address: 'dreamfeel.spaces@gmail.com'
		},
		replyTo: email,
		to: email,
		subject,
		text: message,
		html: `${message}`
	};

	await new Promise((resolve, reject) => {
		// send mail
		transporter.sendMail(mailData, (err: any, info: any) => {
			if (err) {
				console.error(err);
				reject(err);
			} else {
				console.log(info);
				resolve(info);
			}
		});
	});

	return { status: 'OK' };
}
