import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import { fetch } from 'undici';

import { connect } from '@planetscale/database';
const DATABASE_URL =
	'mysql://17fi31x5fggoril23sbu:pscale_pw_cKJbC17DIGdq8jbeEpndlpAZa91YarBA1cqIoda8Q8f@ap-south.connect.psdb.cloud/dreamfeel-spaces?sslaccept=strict';

const config = {
	url: DATABASE_URL
};

const conn = connect(config);

const results = await conn.execute('CREATE TABLE Persons (PersonID int, LastName varchar(255), FirstName varchar(255), Address varchar(255), City varchar(255));');


// interface Space {
// 	id: string;
// 	appId: string;
// 	icon: string;
// 	owner: any;
// 	userId: string;
// 	active: boolean;
// 	updates: any;
// 	tables: any;
// 	spaceUis: any;
// 	apiKeys: any;
// 	users: any;
// 	configVars: any;
// 	secret: string;
// 	miniAppChannel: boolean;
// 	apiChannel: boolean;
// 	subdomainChannel: boolean;
// 	customDomainChannel: boolean;
// 	standaloneMobileChannel: boolean;
// 	standaloneDesktopChannel: boolean;
// 	uploadProvider: string;
// 	template: boolean;
// 	permissions: any;
// 	defaultUIId: string;
// 	deactivated: boolean;
// 	dashboards: any;
// 	spaceSessions: any;
// 	superAdminSecret: string;
// 	logs: any;
// 	uiVid: any;
// 	feedbacks: any;
// 	onboarding: any;
// 	roles: any;
// 	apiSetup: any;
// }

// interface Database {
// 	Space: Space;
// }

// export const db = new Kysely<Database>({
// 	dialect: new PlanetScaleDialect({
// 		url: DATABASE_URL,
// 		fetch
// 	})
// });

// const space = await db.selectFro
// console.log(space);
