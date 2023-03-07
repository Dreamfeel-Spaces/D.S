import * as nodemailer from 'nodemailer';

import { GMAIL_USERNAME, GMAIL_PASSWORD } from '$env/static/private';

let transporter = nodemailer.createTransport({
	host: 'smtp.gmail.com',
	port: 587,
	auth: {
		user: GMAIL_USERNAME,
		pass: GMAIL_PASSWORD
	}
});

export const gmailTransporter = transporter;
