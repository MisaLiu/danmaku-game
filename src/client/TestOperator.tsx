import { useState, useRef, useEffect } from 'react';

export const TestOperator = () => {
  const wsRef = useRef<WebSocket>(null);
  const [ isConnected, setIsConnected ] = useState(false);
  const [ message, setMessage ] = useState('');

  const sendMesssage = () => {
    if (!wsRef.current) return;
    if (!message) return;

    wsRef.current.send(JSON.stringify({
      type: 'send_message',
      data: {
        message,
      },
    }));
    setMessage('');
  };

  useEffect(() => {
    if (wsRef.current) return;
    
    wsRef.current = new WebSocket(`ws://${location.host}/ws?role=operator`);

    wsRef.current.addEventListener('open', () => {
      setIsConnected(true);
    });
  }, []);

  return (
    <div>
      <div>{isConnected ? 'WebSocket is connected' : 'WebSocket not connected'}</div>
      <textarea
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button onClick={sendMesssage}>Send</button>
    </div>
  )
};
