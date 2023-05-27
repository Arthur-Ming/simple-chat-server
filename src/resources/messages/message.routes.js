import Rourter from 'koa-router';
import { add, getOne } from './message.controllers.js';

const messageRoutes = new Rourter({ prefix: '/massages' });

messageRoutes.get('/', getOne);
messageRoutes.post('/', add);

export default messageRoutes;
