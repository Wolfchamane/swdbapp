export const json = (res = {}, statusCode = 500, message = '') => {
	res.setHeader('Content-Type', 'application/json');
    res.statusCode = 200;
	res.end(message);
};
