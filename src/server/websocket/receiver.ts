import { WebSocket } from 'ws';
import { Receivers } from './const.js';
import { ParseMsgAsJson } from '../utils/websocket.js';

export const ApplyReceiverClient = (ws: WebSocket) => {
  if (!ws.id) return ws.terminate();
  if (ws.role !== 'receiver') return ws.terminate();

  ws.on('message', (msg) => {
    const json = ParseMsgAsJson(msg);
    if (!json) return;

    console.log(json);
  });

  ws.on('close', () => {
    Receivers.delete(ws.id!);
  });

  Receivers.set(ws.id, ws);
};
