import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';
import { fetch } from 'undici';
import { DATABASE_URL } from '$env/static/private';

interface Space {
	id: string;
	appId: string;
}

interface Database {
	space: Space;
}

export const db = new Kysely<Database>({
	dialect: new PlanetScaleDialect({
		url: DATABASE_URL,
		fetch
	})
});

