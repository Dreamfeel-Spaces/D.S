export async function isValidToken(token: string) {
	const tokens = token.split(' ');
	const bearer = tokens[0];
	if (bearer !== 'Bearer') return false;
	return true;
}
