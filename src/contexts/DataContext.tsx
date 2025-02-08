import { createContext, useContext, ReactNode } from "react";
import useGetESP32Data from "../hooks/useGetESP32Data";

interface WeatherData {
  luz: number;
  temperatura: number;
  humedad: number;
  hidrogeno: number;
}

interface WeatherUnits {
  luz: string;
  temperatura: string;
  humedad: string;
  hidrogeno: string;
}

interface WeatherContextData {
  data: WeatherData;
  units: WeatherUnits;
}

const WeatherContext = createContext<WeatherContextData | undefined>(
  undefined
);

export const WeatherProvider = ({ children }: { children: ReactNode }) => {
  const { data } = useGetESP32Data();

  const parsedData: WeatherData =
    typeof data === "string" ? JSON.parse(data) : data;

  // Definimos las unidades de medida
  const units: WeatherUnits = {
    temperatura: "°C",
    humedad: "%",
    hidrogeno: "PPM",
  };

  return (
    <WeatherContext.Provider value={{ data: parsedData, units }}>
      {children}
    </WeatherContext.Provider>
  );
};

export const useWeather = () => {
  const context = useContext(WeatherContext);
  if (context === undefined) {
    throw new Error("useWeather must be used within a WeatherProvider");
  }
  return context;
};
