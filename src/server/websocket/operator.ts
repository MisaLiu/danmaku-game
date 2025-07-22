import { WebSocket } from 'ws';
import { Operators, Receivers } from './const.js';
import { ParseMsgAsJson } from '../utils/websocket.js';
import { WebSocketMessage } from '../types/websocket.js';

export const ApplyOperatorClient = (ws: WebSocket) => {
  if (!ws.id) return ws.terminate();
  if (ws.role !== 'operator') return ws.terminate();

  ws.on('message', (msg) => {
    const json = ParseMsgAsJson<WebSocketMessage>(msg);
    if (!json) return;

    console.log(json);

    if (json.type === 'send_message') {
      const message = json.data.message as string;
      
      for (const client of Receivers.values()) {
        client.send(JSON.stringify({
          type: 'on_message',
          data: {
            message,
          },
        } as WebSocketMessage));
      }
    }
  });

  ws.on('close', () => {
    Operators.delete(ws.id!);
  });

  Operators.set(ws.id, ws);
};
