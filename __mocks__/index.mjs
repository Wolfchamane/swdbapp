import { createServer } from 'node:http';
import { charactersListHandler } from './characters/index.mjs';


const server = createServer((req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type');

    if (req.method === 'OPTIONS') {
        res.statusCode = 200;
        res.end();
    } else {
		try {
			charactersListHandler(req, res);
		} catch (e) {
			res.statusCode = {
				'Internal Server Error': 500,
				'Not Found': 404,
				'Invalid Request': 400,
			}[e.message];
			res.setHeader('Content-Type', 'text/plain');
			res.end(e.message);
		}
	}
});

server.listen(3000, 'localhost', () => console.log('Mocks server running'));
