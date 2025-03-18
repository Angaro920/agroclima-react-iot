import { useEffect, useState } from 'react';

type SensorDataType = {
  temperatura?: number;
  humedad?: number;
  hidrogeno?: number;
  luz?: number;
};

type AmbientDataType = {
  baromabsin?: number;
  baromrelin?: number;
  battout?: number;
  dailyrainin?: number;
  dateutc?: number;
  dewPoint?: number;
  dewPointin?: number;
  eventrainin?: number;
  feelsLike?: number;
  feelsLikein?: number;
  hourlyrainin?: number;
  humidity?: number;
  humidityin?: number;
  maxdailygust?: number;
  monthlyrainin?: number;
  solarradiation?: number;
  tempf?: number;
  tempinf?: number;
  totalrainin?: number;
  uv?: number;
  weeklyrainin?: number;
  winddir?: number;
  windgustmph?: number;
  windspeedmph?: number;
  yearlyrainin?: number;
  [key: string]: number | undefined;
};


export const useLiveSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorDataType | null>(null);
  const [ambientData, setAmbientData] = useState<AmbientDataType | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [ws, setWs] = useState<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('🔌 WebSocket connected');
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === 'ambient') {
          setAmbientData(msg.data);
          console.log('🌤️ Ambient Data:', msg.data);
        } else if (msg.type === 'sensor') {
          setSensorData(msg.data);
          console.log('📡 Sensor Data:', msg.data);
        }
      } catch (error) {
        console.error('❌ Invalid WebSocket message:', error );
      }
    };

    socket.onclose = () => {
      console.log('❌ WebSocket disconnected');
      setIsConnected(false);
    };

    socket.onerror = (error) => {
      console.error('⚠️ WebSocket error:', error);
    };

    setWs(socket);

    return () => {
      socket.close();
    };
  }, []);

  const sendMessage = (message: Record<string, string>) => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    } else {
      console.warn('⚠️ WebSocket not connected, message not sent.');
    }
  };

  return { sensorData, ambientData, isConnected, sendMessage };
};

export default useLiveSensorData;