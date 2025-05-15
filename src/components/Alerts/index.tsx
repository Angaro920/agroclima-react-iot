import { usePrediccionClimatica } from "../../hooks/usePredictionWeather";
import { useClimaAlerts } from "../../hooks/useWeatherAlerts";

export const ClimaNotifications = () => {
  useClimaAlerts();
  usePrediccionClimatica();
  return null;
};
