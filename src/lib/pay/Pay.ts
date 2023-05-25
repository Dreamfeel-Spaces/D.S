import { mpesaSTKPush, type TSTKPush } from './daraja';

export class Pay {
	constructor() {}
	async stkPush(data: TSTKPush): Promise<any> {
		return await mpesaSTKPush(data);
	}
}
