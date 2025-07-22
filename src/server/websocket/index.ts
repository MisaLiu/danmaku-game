import { WebSocketServer } from 'ws';
import { Server } from 'http';
import { v4 as uuid } from 'uuid';
import { ApplyOperatorClient } from './operator.js';
import { ApplyReceiverClient } from './receiver.js';

export const ApplyWebSocketServer = (server: Server) => {
  const wss = new WebSocketServer({ server, path: '/ws' });

  wss.on('connection', (ws, req) => {
    const reqUrl = new URL(`ws://${req.headers.host || '127.0.0.1:3001'}${req.url}`);
    const reqParams = reqUrl.searchParams;
    const reqRole = reqParams.get('role');

    if (!reqRole) return ws.terminate();
    if (reqRole !== 'operator' && reqRole !== 'receiver') return ws.terminate();

    ws.id = uuid();
    ws.role = reqRole;

    if (reqRole === 'operator') ApplyOperatorClient(ws);
    else ApplyReceiverClient(ws);
  });

  console.log('WebSocket server started!');
};
