import { useEffect, useRef } from "react";
import { notification } from "antd";
import useGetLastData from "./useGetLastData";
import { hu } from "date-fns/locale";

const TEMP_MIN = 13;
const TEMP_MAX = 31;
const HUM_MIN = 50;
const HUM_MAX = 84;

export const useClimaAlerts = () => {
  const { getLastData } = useGetLastData();
  const lastAlert = useRef<null | 'low' | 'high'>(null);

  useEffect(() => {
    const checkData = async () => {
      try {
        const data = await getLastData();
        const temp = data?.TemperaturaInterna?.data;
        const hum = data?.HumedadInterna?.data;

        if (temp !== null && temp !== undefined) {
          if (temp < TEMP_MIN && lastAlert.current !== 'low') {
            notification.warning({
              message: "⚠️ Temperatura baja detectada",
              description: `Temperatura interna: ${temp}°C`,
              placement: "topRight",
            });
            lastAlert.current = 'low';
          } else if (temp > TEMP_MAX && lastAlert.current !== 'high') {
            notification.warning({
              message: "⚠️ Temperatura alta detectada",
              description: `Temperatura interna: ${temp}°C`,
              placement: "topRight",
            });
            lastAlert.current = 'high';
          } else if (temp >= TEMP_MIN && temp <= TEMP_MAX) {
            lastAlert.current = null;
          }
        }
        if (hum !== null && hum !== undefined) {
          if (hum < HUM_MIN && lastAlert.current !== 'low') {
            notification.warning({
              message: "⚠️ Humedad baja detectada",
              description: `Humedad interna: ${hum}°C`,
              placement: "topRight",
            });
            lastAlert.current = 'low';
          } else if (temp > TEMP_MAX && lastAlert.current !== 'high') {
            notification.warning({
              message: "⚠️ Humedad alta detectada",
              description: `Humedad interna: ${temp}°C`,
              placement: "topRight",
            });
            lastAlert.current = 'high';
          } else if (hum >= HUM_MIN && hum <= HUM_MAX) {
            lastAlert.current = null;
          }
        }
      } catch (err) {
        console.error("Error al verificar clima:", err);
      }
    };

    checkData();
    const interval = setInterval(checkData, 300000); // Cada minuto

    return () => clearInterval(interval);
  }, [getLastData]);
};
