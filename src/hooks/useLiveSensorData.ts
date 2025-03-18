import { useEffect, useState } from 'react';

type SensorDataType = {
  temperatura?: number;
  humedad?: number;
  hidrogeno?: number;
  luz?: number;
};

type AmbientDataType = {
  tempf?: number;
  humidity?: number;
  solarradiation?: number;
  [key: string]: any;
};

export const useLiveSensorData = () => {
  const [sensorData, setSensorData] = useState<SensorDataType | null>(null);
  const [ambientData, setAmbientData] = useState<AmbientDataType | null>(null);
  const [isConnected, setIsConnected] = useState<boolean>(false);

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
        console.error('❌ Invalid WebSocket message:', event.data);
      }
    };

    socket.onclose = () => {
      console.log('❌ WebSocket disconnected');
      setIsConnected(false);
    };

    return () => {
      socket.close();
    };
  }, []);

  return { sensorData, ambientData, isConnected };
};

export default useLiveSensorData;
