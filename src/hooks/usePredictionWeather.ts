import { useEffect } from 'react';
import { notification } from 'antd';
import { BACKEND_URL } from '../constants/urls';

export const usePrediccionClimatica = () => {
  const openNotification = (mensajeTemperatura: string, mensajeHumedad: string) => {
    notification.info({
      message: 'Predicción Climática',
      description: `${mensajeTemperatura}\n${mensajeHumedad}`+ "en la siguiente hora.",
      placement: 'topRight',
      duration:0,
    });
  };

  useEffect(() => {
    const fetchPrediccion = async () => {
      try {
        const res = await fetch(BACKEND_URL+'/api/predict');
        const { prediccion } = await res.json();
        if (prediccion) {
          openNotification(prediccion.mensaje_temperatura, prediccion.mensaje_humedad);
        }
      } catch (error) {
        console.error('Error al obtener predicción climática:', error);
      }
    };

    fetchPrediccion();
    const interval = setInterval(fetchPrediccion, 3600000); // Cada hora

    return () => clearInterval(interval);
  }, []);
};
