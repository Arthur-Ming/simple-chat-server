import { v4 as uuidv4 } from 'uuid';
import { EventEmitter } from 'node:events';
import { PassThrough, Transform } from 'stream';

const emitter = new EventEmitter();

class SSEStream extends Transform {
  constructor() {
    super({
      writableObjectMode: true,
    });
  }

  _transform(data, _encoding, done) {
    this.push(`data: ${JSON.stringify(data)}\n\n`);
    done();
  }
}

export const getOne = async (ctx, next) => {
  try {
    /* ctx.request.socket.setTimeout(0);
    ctx.req.socket.setNoDelay(true);
    ctx.req.socket.setKeepAlive(true); */

    ctx.set({
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    const stream = new SSEStream();
    ctx.status = 200;
    ctx.body = stream;

    const listener = (message) => {
      stream.write(message);
    };

    emitter.on('message', listener);
    console.log('subs');

    stream.on('close', () => {
      emitter.off('message', listener);
    });
  } catch (error) {
    console.log(error);
  }
  next();
};

export const add = (ctx) => {
  const body = ctx.request.body;

  emitter.emit('message', {
    ...body,
    id: uuidv4(),
  });

  ctx.body = 'ok';
};
