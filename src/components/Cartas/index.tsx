import { Card, Statistic } from "antd";
import { CardStyle } from "./Cardstyle";

const ws = new WebSocket("ws://localhost:8080");
ws.onopen = () => {
  console.log("Conectado al servidor WebSocket");
};
ws.onmessage = (event) => {
  try {
    // Procesar los datos recibidos
    const data = JSON.parse(event.data);
    console.log("Datos recibidos:", data);
  } catch (error) {
    console.error("Error procesando datos:", error, event.data);
  }
};
export const CartasDashboard = () => {
  return (
    <Card bordered={false} style={CardStyle.GlobalCard}>
      <Statistic
        title={`Actual`}
        value={0}
        precision={2}
        valueStyle={{ color: "#3f8600" }}
        prefix=""
        suffix=""
      />
    </Card>
  );
};
