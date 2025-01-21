import { useEffect, useState } from "react";
import useWebSocket  from "react-use-websocket";

interface WeatherData {
  temperatura: number;
  humedad: number;
  hidrogeno: number;
}


const useGetESP32Data = () => {
  const [socketUrl] = useState("ws://localhost:8080");
  const [data, setData] = useState<WeatherData>({
    temperatura: 0,
    humedad: 0,
    hidrogeno: 0
  });
  const { lastJsonMessage } = useWebSocket(socketUrl);


  useEffect(() => {
    if (lastJsonMessage !== null) {
        console.log(lastJsonMessage)
        setData(lastJsonMessage)
    }
  }, [lastJsonMessage])

  return {
    data,
  };
};
export default useGetESP32Data;
