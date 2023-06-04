import { WebSocketServer } from 'ws';
import { v4 as uuidv4 } from 'uuid';

const wss = new WebSocketServer(
  {
    port: 5000,
  },
  () => console.log(`WebSocketServer started on 5000`)
);

wss.on('connection', function connection(ws) {
  ws.on('message', function (message) {
    message = JSON.parse(message);
    console.log(message);
    switch (message.event) {
      case 'message':
        broadcastMessage({
          ...message,
          id: uuidv4(),
        });
        break;
      case 'connection':
        broadcastMessage(message);
        break;
    }
  });
});

function broadcastMessage(message) {
  wss.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
}
