import { WebSocketServer } from 'ws';
import { Server } from 'http';

export const ApplyWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws, req) => {
    console.log('A WebSocket client has connected');
    console.log(req);

    ws.on('message', (msg) => {
      console.log('WebSocket received:', msg.toString());
      ws.send(`Echo: ${msg}`);
    });
  });

  console.log('WebSocket server started!');
};
