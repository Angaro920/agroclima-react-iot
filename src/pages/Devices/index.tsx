import { useEffect, useState } from "react";
import { Card, Col, Row, Switch } from "antd";
import { dashboardStyle } from "../../styles";

export const Devices = () => {
  const [socket, setSocket] = useState(null);

  // Conectar WebSocket al cargar el componente
  useEffect(() => {
    const ws = new WebSocket("ws://192.168.1.46:8080"); // Cambia por tu IP del servidor WebSocket
    ws.onopen = () => console.log("Conectado al servidor WebSocket");
    ws.onmessage = (event) => console.log("Mensaje recibido:", event.data);
    ws.onerror = (error) => console.error("Error en WebSocket:", error);
    ws.onclose = () => console.log("Desconectado del servidor WebSocket");

    setSocket(ws);

    // Cerrar conexión al desmontar el componente
    return () => ws.close();
  }, []);

  // Función para enviar comandos
  const sendCommand = (device, state) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      const message = JSON.stringify({ device, state }); // Ejemplo: { device: "ventilador", state: "ON" }
      socket.send(message);
      console.log("Enviando comando:", message);
    } else {
      console.error("WebSocket no está conectado");
    }
  };

  return (
    <div style={dashboardStyle.mainSector}>
      <h1 style={{ display: "flex", justifyContent: "center" }}>
        Control sistemas invernadero
      </h1>
      <div>
        <Row gutter={16}>
          <Col span={8}>
            <Card title="Ventiladores" bordered={false}>
              <Switch
                checkedChildren="Encendido"
                unCheckedChildren="Apagado"
                onChange={(checked) => sendCommand("ventilador", checked ? "ON" : "OFF")}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Bombas de agua" bordered={false}>
              <Switch
                checkedChildren="Encendido"
                unCheckedChildren="Apagado"
                onChange={(checked) => sendCommand("bomba", checked ? "ON" : "OFF")}
                style={{ display: "flex", justifyContent: "center" }}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Modo Automático" bordered={false}>
              <Switch
                onChange={(checked) => sendCommand("modo_auto", checked ? "ON" : "OFF")}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
