import { useEffect, useState } from "react";
import useWebSocket  from "react-use-websocket";

const useGetESP32Data = () => {
  const [socketUrl] = useState("ws://localhost:8080");
  const [data, setData] = useState("Vengo del hook <3");
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
