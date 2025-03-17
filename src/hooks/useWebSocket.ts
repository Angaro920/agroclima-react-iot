import { useState, useEffect } from 'react';

export const useWebSocket = (url: string) => {
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [isConnected, setIsConnected] = useState<boolean>(false);
  
    useEffect(() => {
      const socket = new WebSocket(url);
  
      socket.onopen = () => {
        console.log('🔌 WebSocket conectado');
        setIsConnected(true);
      };
  
      socket.onclose = () => {
        console.log('❌ WebSocket desconectado');
        setIsConnected(false);
      };
  
      socket.onerror = (error) => console.error('⚠️ Error en WebSocket:', error);
  
      setWs(socket);
  
      return () => {
        socket.close();
      };
    }, [url]);
  
    const sendMessage = (message: Record<string, any>) => {
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify(message));
      } else {
        console.warn('⚠️ WebSocket no está conectado, mensaje no enviado.');
      }
    };
  
    return { ws, isConnected, sendMessage };
  };
  