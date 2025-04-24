import express from 'express';
import { auth, cors, json, endHandler } from './middlewares';
import provideRouter from './routes';
import { DefaultLogger } from '@swdbapp/utils-backend';
import { name, version } from '../package.json';

const logger = DefaultLogger.$i({ module: name, version });

const app = express();

app.use(cors(logger));
app.use(json(logger));
app.use(auth(logger));
app.use(provideRouter(logger));
app.use(endHandler(logger));

export default app;
