import { useState } from "react";
import { DataType } from "../types";
import { BACKEND_URL } from "../constants/urls";

export const useGetData = () => {
  const [weather, setWeather] = useState<DataType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getTemperaturaSensor = async () => {
    try {
      const response = await fetch(
        BACKEND_URL+"/api/listData/TemperaturaSensor"
      );
      if (!response.ok) throw new Error("Error al obtener la temperatura del sensor");

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
  const getHumedadSensor = async () => {
    try {
      const response = await fetch(
        BACKEND_URL+"/api/listData/HumedadSensor"
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
  const getPhSensor = async () => {
    try {
      const response = await fetch(
        BACKEND_URL+"/api/listData/PHSensor"
      );
      if (!response.ok) throw new Error("Error al obtener el Ph del sensor");

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
  const getLuzSensor = async () => {
    try {
      const response = await fetch(BACKEND_URL+"/api/listData/LuzSensor");
      if (!response.ok) throw new Error("Error al obtener la luz del sensor");

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
  const getTDSSensor = async () => {
    try {
      const response = await fetch(BACKEND_URL+"/api/listData/TDSSensor");
      if (!response.ok) throw new Error("Error al obtener el TDS");

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
  const getSalinidadSensor = async () => {
    try {
      const response = await fetch(BACKEND_URL+"/api/listData/SalinidadSensor");
      if (!response.ok) throw new Error("Error al obtener la salinidad del sensor");

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
  const getConductividadSensor = async () => {
    try {
      const response = await fetch(BACKEND_URL+"/api/listData/ConductividadSensor");
      if (!response.ok) throw new Error("Error al obtener la conductividad del sensor");

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
        BACKEND_URL+"/api/listData/TemperaturaExterna"
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
        BACKEND_URL+"/api/listData/HumedadExterna"
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
        BACKEND_URL+"/api/listData/TemperaturaInterna"
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
        BACKEND_URL+"/api/listData/HumedadInterna"
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
        BACKEND_URL+"/api/listData/PresionBarometricaRelativa"
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
        BACKEND_URL+"/api/listData/RadiacionSolar"
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
      const response = await fetch(BACKEND_URL+"/api/listData/Uv");
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
        BACKEND_URL+"/api/listData/Precipitaciones"
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

  const getDirViento = async () => {
    try {
      const response = await fetch(
        BACKEND_URL+"/api/listData/DireccionViento"
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
  }
  const getVelWind = async () => {
    try {
      const response = await fetch(
        BACKEND_URL+"/api/listData/VelocidadViento"
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
  }

  return {
    weather,
    error,
    loading,
    getTemperaturaSensor,
    getHumedadSensor,
    getPhSensor,
    getLuzSensor,
    getTDSSensor,
    getSalinidadSensor,
    getConductividadSensor,
    getTempOut,
    getHumeOut,
    getTempIn,
    getHumeIn,
    getBaromRel,
    getSolarRad,
    getUv,
    getRain,
    getDirViento,
    getVelWind,
  };
};
export default useGetData;
