import { v4 as uuidv4 } from 'uuid';

const clients = new Set();

export const getOne = async (ctx) => {
  const message = await new Promise((resolve) => {
    clients.add(resolve);

    ctx.res.on('close', () => {
      clients.delete(resolve);
      resolve();
    });
  });
  ctx.body = message;
};

export const add = (ctx) => {
  const body = ctx.request.body;

  clients.forEach((resolve) => {
    resolve({
      ...body,
      id: uuidv4(),
    });
  });

  clients.clear();

  ctx.body = 'ok';
};
