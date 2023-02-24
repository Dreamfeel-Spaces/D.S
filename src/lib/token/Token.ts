import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class Token {
	async randomToken() {
		const randomNumber = crypto.randomUUID();
		return randomNumber;
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
		return jwt.verify(tk, 'lj');
	}
}
