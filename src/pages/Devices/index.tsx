import { Card, Col, Row, Switch, message } from "antd";
import { dashboardStyle } from "../../styles";
import { FC } from "react";
import axios from "axios";
import { BACKEND_URL } from "../../constants/urls";

export const Devices: FC = () => {
  const handleToggle = async (device: string, checked: boolean) => {
    try {
      const token = localStorage.getItem("token"); // 🔐 Obtenemos el token
  
      await axios.post(
       BACKEND_URL+"/api/control",
        {
          device,
          state: checked ? "ON" : "OFF",
        },
        {
          withCredentials: true 
        }
      );
  
      message.success(`Se envió comando para ${device}: ${checked ? "Encendido" : "Apagado"}`);
    } catch (error) {
      message.error("Error al enviar comando");
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
                onChange={(checked) => handleToggle("ventilador", checked)}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Bombas de agua" bordered={false}>
              <Switch
                checkedChildren="Encendido"
                unCheckedChildren="Apagado"
                style={{ display: "flex", justifyContent: "center" }}
                onChange={(checked) => handleToggle("bomba", checked)}
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Cortinas" bordered={false}>
              <Switch
                checkedChildren="Encendido"
                unCheckedChildren="Apagado"
                onChange={(checked) => handleToggle("modo_auto", checked)}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
