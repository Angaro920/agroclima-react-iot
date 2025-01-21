import { createContext, useContext, ReactNode, useEffect } from 'react';
import useGetESP32Data from '../hooks/useGetESP32Data';

interface WeatherData {
  temperatura: number;
  humedad: number; 
  hidrogeno: number;
}

interface WeatherContextProps {
  weatherData: WeatherData;
}

const WeatherContext = createContext<WeatherContextProps | undefined>(undefined);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetESP32Data();
  
  // Asumiendo que el websocket devuelve un objeto con la misma estructura
  const weatherData: WeatherData = {
    temperatura: data?.temperatura || 0,
    humedad: data?.humedad || 0,
    hidrogeno: data?.hidrogeno || 0
  };

  return (
    <WeatherContext.Provider value={{ weatherData }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error('useWeather must be used within a WeatherProvider');
  }
  return context;
};