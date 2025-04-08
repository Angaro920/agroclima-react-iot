import { useState } from "react";
import { BACKEND_URL } from "../constants/urls";
import { LastDataType } from "../types/LastDataType";


export const useGetLastData = () => {
  const [weather, setWeather] = useState<LastDataType| null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getLastData = async () => {
    try {
      const response = await fetch(BACKEND_URL+"/api/getLastData");
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
  return {weather, loading, error, getLastData};
}
export default useGetLastData;