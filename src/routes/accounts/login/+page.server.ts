import type { Actions } from './$types';
import { error, redirect } from '@sveltejs/kit';

export const actions: Actions = {
	default: async ({ request, cookies }) => {
		const formData = Object.fromEntries(await request.formData());

		if (!formData.email || !formData.password) {
			return error(400, 'Missing email or password');
		}

		const { email, password } = formData as { email: string; password: string };
		const { error: err, token } = await loginUser(email, password);

		if (err) {
			return error(500, err);
		}

		cookies.set('AuthorizationToken', `Bearer ${token}`, {
			httpOnly: true,
			path: '/',
			secure: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 // 1 day
		});

		throw redirect(302, '/login');
	}
};

async function loginUser(email: string, password: string) {
	return { error: '', token: '' };
}
