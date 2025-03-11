import { useState } from "react";
import { DataType } from "../types";

export const useGetData = () => {
  const [weather, setWeather] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTemperatura = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listData/Temperatura");
      if (!response.ok) throw new Error("Error al obtener la temperatura");

      const data = await response.json();
      setWeather(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getHumedad = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listData/Humedad");
      if (!response.ok) throw new Error("Error al obtener la temperatura");

      const data = await response.json();
      setWeather(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getGas = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listData/Hidrogeno");
      if (!response.ok) throw new Error("Error al obtener la temperatura");

      const data = await response.json();
      setWeather(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  const getLuz = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listData/Luz");
      if (!response.ok) throw new Error("Error al obtener la temperatura");

      const data = await response.json();
      setWeather(data);
      setLoading(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {weather, error, loading, getTemperatura, getHumedad, getGas, getLuz };
};
export default useGetData;