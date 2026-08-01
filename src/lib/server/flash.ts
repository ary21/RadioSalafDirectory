export function makeFlash(message: string, type: 'success' | 'error' = 'success') {
	return { message, type };
}
