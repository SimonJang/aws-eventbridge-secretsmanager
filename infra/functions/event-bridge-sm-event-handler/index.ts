export const handler = async (request: unknown, context: unknown) => {
	console.log('Logging request');
	console.log(JSON.stringify(request, undefined, '	'));

	// Do something

	return {
		message: 'ok'
	}
};
