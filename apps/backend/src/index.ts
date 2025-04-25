import appConfiguration from './config';
import app from './app';

app.listen(appConfiguration.port, () => {
	console.log(`Server running on http://localhost:${appConfiguration.port}`);
});
