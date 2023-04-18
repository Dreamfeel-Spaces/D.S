import { prisma } from '$lib/db/prisma';
import { Token } from '$lib/token/Token';

export async function GET({}) {
	function randomDomain() {
		let word = '';

		while (word.length < 4) {
			for (let i = 0; i < alphabet.length; i++) {
				const randomIndex = Math.floor(Math.random() * alphabet.length);

				if (randomIndex % 2 === 0) {
					word = word + numbers[Math.floor(Math.random() * numbers.length)];
				} else word = word + alphabet[randomIndex];
			}
		}
		return word;
	}

	function randomUsername() {
		let word = '';

		while (word.length < 6) {
			for (let i = 0; i < alphabet.length; i++) {
				const randomIndex = Math.floor(Math.random() * alphabet.length);

				if (randomIndex % 2) {
					word = word + numbers[Math.floor(Math.random() * numbers.length)];
				} else word = word + alphabet[randomIndex];
			}
		}

		return `${randomDomain()}@dreamfeel.me`;
	}

	const username = randomUsername();

	const password = randomDomain();

	const token = new Token();

	const encryptedPass = await token.encryptSync(password);

	let space = await prisma.space.findFirst({
		where: {
			appId: 'demo'
		}
	});

	if (!space) {
		space = await prisma.space.create({
			data: {
				appId: 'demo',
				name: 'Demo',
				active: true,
				secret: encryptedPass
			}
		});
	}

	let role;

	role = await prisma.userRoles.findFirst({
		where: {
			name: 'ADMIN',
			spaceId: space.id
		}
	});

	if (!role) {
		role = await prisma.userRoles.create({
			data: {
				name: 'ADMIN',
				spaceId: space.id,
				description: 'Administrator priviledges'
			}
		});
	}

	const user = await prisma.spaceUser.create({
		data: {
			spaceId: space.id,
			password: encryptedPass,
			status: 'confirmed',
			name: 'Admin' + randomDomain(),
			roleId: role.id,
			username
		}
	});

	return new Response(JSON.stringify({ username, password }));
}

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
var alphabet = [
	'a',
	'b',
	'c',
	'd',
	'e',
	'f',
	'g',
	'h',
	'i',
	'j',
	'k',
	'l',
	'm',
	'n',
	'o',
	'p',
	'q',
	'r',
	's',
	't',
	'u',
	'v',
	'w',
	'z',
	'y',
	'z'
];
