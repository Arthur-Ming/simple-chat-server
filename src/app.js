import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import errorHandler from './errors/errorHandler.js';
import messageRoutes from './resources/messages/message.routes.js';
import cors from '@koa/cors';

const app = new Koa();

app.use(cors());

app.use(errorHandler);

app.use(bodyParser());

app.use(messageRoutes.routes());

export default app;
