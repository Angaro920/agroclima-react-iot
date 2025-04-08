import { useState } from "react";
import { FrecuencyDataType } from "../types/FrecuencyDataType";
import { BACKEND_URL } from "../constants/urls";
import { CollectionNameType } from "../types";


export const useGetFrecuencyData = () => {
  const [weatherDaily, setWeather] = useState<FrecuencyDataType[]>([]);
  const [loadingDaily, setLoadingDaily] = useState(true);
  const [error, setError] = useState<string | null>(null);


  const getDailyData = async (parameter: CollectionNameType) => {
    try {
      const response = await fetch(BACKEND_URL + `/api/listDay/${parameter}`);
      if (!response.ok) throw new Error("Error al obtener la informacion");

      const data = await response.json();
      setWeather(data);
      setLoadingDaily(false);
      return data;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido");
      throw err;
    } finally {
      setLoadingDaily(false);
    }
  };
  return { weatherDaily, loadingDaily, error, getDailyData  };
};
export default useGetFrecuencyData;