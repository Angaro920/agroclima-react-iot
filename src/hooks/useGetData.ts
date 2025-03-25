import { useState } from "react";
import { DataType } from "../types";

export const useGetData = () => {
  const [weather, setWeather] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTemperatura = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/Temperatura"
      );
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
      const response = await fetch(
        "http://localhost:8000/api/listData/Humedad"
      );
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
      const response = await fetch(
        "http://localhost:8000/api/listData/Hidrogeno"
      );
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
  const getTempOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/TemperaturaExterna"
      );
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
  const getHumeOut = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/HumedadExterna"
      );
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
  const getTempIn = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/TemperaturaInterna"
      );
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
  const getHumeIn = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/HumedadInterna"
      );
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
  const getBaromRel = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/PresionBarometricaRelativa"
      );
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
  const getSolarRad = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/RadiacionSolar"
      );
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
  const getUv = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/listData/Uv");
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
  const getRain = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/api/listData/Precipitaciones"
      );
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

  return {
    weather,
    error,
    loading,
    getTemperatura,
    getHumedad,
    getGas,
    getLuz,
    getTempOut,
    getHumeOut,
    getTempIn,
    getHumeIn,
    getBaromRel,
    getSolarRad,
    getUv,
    getRain,
  };
};
export default useGetData;
