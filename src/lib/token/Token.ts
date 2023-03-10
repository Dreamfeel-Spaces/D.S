import { AUTH_SECRET } from '$env/static/private';
import { prisma } from '$lib/db/prisma';
import { Logger } from '$lib/logger/Logger';
import { error } from '@sveltejs/kit';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class Token {
	async randomToken() {
		const randomNumber = crypto.randomUUID();
		const randomNumberTwo = crypto.randomUUID();
		return `${randomNumber.replaceAll('-', '') + randomNumberTwo.replaceAll('-', '')}`;
	}
	async encryptSync(token: string) {
		const hashed = bcrypt.hashSync(token, 8);
		return hashed;
	}

	async findAndVerifyKey(keys: any = [], token: string) {
		return keys.find((key: any) => bcrypt.compareSync(token, key.key));
	}

	async verify(encrypted: string, unencypted: string) {
		return bcrypt.compareSync(encrypted, unencypted);
	}

	async jwt(user: any) {
		const sign: Function = jwt.sign;
		return jwt.sign(user, 'lj');
	}
	async verifyJwt(tk: string) {
		return jwt.verify(tk, AUTH_SECRET);
	}
	async verifyApiKey(apiKey: string = '', event: any) {
		if (!Boolean(apiKey)) throw error(403, 'Missing API Key');
		return new Promise(async (res, rej) => {
			if (!apiKey?.startsWith('Basic ')) {
				rej('Authorization failed');
			}

			let tokenWithId = apiKey.split(' ')[1] || '#';
			const splitToken = tokenWithId.split('#');
			const appId = splitToken[0];
			const token = splitToken[0];

			const space = await prisma.space.findUnique({
				where: {
					appId: String(appId)
				},
				include: {
					apiKeys: true
				}
			});

			const logger = new Logger();
			logger.info(event, space?.id);

			if (!space?.apiChannel) {
				rej('API endpoints not allowed');
			}

			const apiKeys = space?.apiKeys ?? [];

			if (!apiKeys.length) {
				rej('Failed to validate accessToken');
			}

			const reqKey = apiKeys.find((key) => this.verify(key.key, apiKey));

			const newHit = (reqKey?.hits ?? 0) + 1;

			if (!reqKey) {
				rej('Failed to validate accessToken');
			}
			try {
				// const updatedKey = await prisma.spaceAPIKeys.update({
				// 	where: {
				// 		id: String(reqKey?.id)
				// 	},
				// 	data: {
				// 		hits: newHit
				// 	}
				// });

				let spaceData = { ...space };
				delete spaceData['apiKeys'];
				res(spaceData);
			} catch (e) {
				console.log(e);
			}
		});
	}
	async createAdminPass() {
		const pass = 'testPass123';
		const hashed = bcrypt.hashSync(pass, 8);
		return hashed;
	}

	async createUserToken(user: any) {
		return jwt.sign(user, AUTH_SECRET);
	}

	async decodeUserToken(accessToken: string = '', space: any) {
		if (!accessToken?.startsWith('Bearer ')) {
			return [null];
		}
		let token = accessToken.split(' ')[1] ?? '';
		const verified: any = jwt.verify(token, AUTH_SECRET);
		return new Promise(async (res, rej) => {
			if (!verified) {
				res([null]);
			}

			if (verified.spaceId !== space.id) {
				res([null]);
			}

			if (verified.role === 'owner') {
				const user = await prisma.user.findUnique({
					where: {
						id: space.userId
					}
				});

				// if(await bcrypt.compareSync())

				res([{ ...user, role: 'owner' }]);
			}

			const session = await prisma.spaceSession.findFirst({
				where: {
					sessionToken: token,
					spaceId: space.id
				},
				include: {
					admin: true
				}
			});

			if (!session) {
				res([]);
			}

			res([session?.admin]);
		});
	}
}
