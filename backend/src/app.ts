import express from 'express';
import { cors, json, endHandler } from './middlewares';
import provideRouter from './routes';

const app = express();

app.use(cors());
app.use(json());
app.use(provideRouter());
app.use(endHandler());

export default app;
