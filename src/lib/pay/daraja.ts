import axios from 'axios';

import {
	MPESA_AUTH_URL,
	MPESA_STK_PUSH_URL,
	MPESA_SHORT_CODE,
	MPESA_PASSKEY,
	MPESA_CONSUMER_KEY,
	MPESA_CONSUMER_SECRET,
	MPESA_WEBHOOK_CALLBACK_URL
} from '$env/static/private';
import handleException from './trycatch';

const mpesaAuthenticationUrl = MPESA_AUTH_URL;
const mpesaStkPushUrl = MPESA_STK_PUSH_URL;
const mpesaBusinessShortCode = MPESA_SHORT_CODE;
const mpesaPassKey = MPESA_PASSKEY;
const mpesaConsumerKey = MPESA_CONSUMER_KEY;
const mpesaConsumerSecret = MPESA_CONSUMER_SECRET;
const responseWebHook = MPESA_WEBHOOK_CALLBACK_URL;

export type TSTKPush = {
	transactionType?: string;
	accountReference?: string;
	transactionDesc?: string;
	amount: number;
	phone: string;
};

export async function mpesaSTKPush({
	transactionType = 'CustomerPayBillOnline',
	accountReference = 'TEST',
	transactionDesc = 'TEST',
	amount = 1,
	phone
}: TSTKPush) {
	const phoneNumber = formatPhoneNumber(phone);

	console.log('GGG', phoneNumber);

	if (!validNumber(String(phoneNumber))) throw new Error('Invalid phone number');
	if (!validAmount(amount)) throw new Error('Invalid amount specified');

	const authBuffer = Buffer.from(mpesaConsumerKey + ':' + mpesaConsumerSecret);
	const authorizationToken = `Basic ${authBuffer.toString('base64')}`;

	const mpesaUathRequetsPromise = axios.get(mpesaAuthenticationUrl, {
		headers: {
			Authorization: authorizationToken
		}
	});

	const [mpesaAuthResponse, mpesaAuthError] = await handleException(mpesaUathRequetsPromise);
	if (mpesaAuthError) throw new Error(mpesaAuthError);

	const mpesaStkPushAuthenticationToken = mpesaAuthResponse.data.access_token;
	const bearerAuth = `Bearer ${mpesaStkPushAuthenticationToken}`;
	const requestTimeStamp = getTimestamp();
	const requestPassword = `${mpesaBusinessShortCode}${mpesaPassKey}${requestTimeStamp}`;
	const base64Password = Buffer.from(requestPassword).toString('base64');

	const stkPushRequestData = {
		BusinessShortCode: mpesaBusinessShortCode,
		Password: base64Password,
		Timestamp: requestTimeStamp,
		TransactionType: transactionType,
		Amount: amount,
		PartyA: phoneNumber,
		PartyB: mpesaBusinessShortCode,
		PhoneNumber: phoneNumber,
		AccountReference: accountReference,
		TransactionDesc: transactionDesc,
		CallBackURL: responseWebHook
	};

	const stkPushPromise = axios.post(mpesaStkPushUrl, stkPushRequestData, {
		headers: {
			Authorization: bearerAuth
		}
	});

	const [stkPushResponse, stkPushError] = await handleException(stkPushPromise);
	if (stkPushError) throw new Error(stkPushError);

	return stkPushResponse.data;
}

export function formatPhoneNumber(phoneNumber: string) {
	if (phoneNumber.startsWith('254')) return parseInt(phoneNumber);
	if (phoneNumber.startsWith('+254')) return parseInt(phoneNumber.substring(1));
	return parseInt(`254${phoneNumber.substring(1)}`);
}

export function validNumber(formatted: string) {
	return true;
}

export function validAmount(amount: number) {
	if (isNaN(amount) || amount < 1) {
		return false;
	}
	return true;
}

export function getTimestamp() {
	const date = new Date();

	function pad2(n: number) {
		return (n < 10 ? '0' : '') + n;
	}

	return (
		date.getFullYear() +
		pad2(date.getMonth() + 1) +
		pad2(date.getDate()) +
		pad2(date.getHours()) +
		pad2(date.getMinutes()) +
		pad2(date.getSeconds())
	);
}
