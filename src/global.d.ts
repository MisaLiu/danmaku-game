import 'ws';

declare module 'ws' {
  interface WebSocket {
    id?: string;
    isAlive?: boolean;
    role?: 'operator' | 'receiver';
  }
}
