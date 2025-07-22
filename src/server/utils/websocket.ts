import { WebSocket } from 'ws';

export const ParseMsgAsJson = <T extends object>(msg: WebSocket.RawData) => {
  let json: T | null = null;

  try {
    const jsonRaw = msg.toString();
    json = JSON.parse(jsonRaw) as T;
  } catch (_) {
    json = null;
  }

  return json;
};
