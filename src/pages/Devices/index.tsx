import { Card, Col, Row, Switch, message } from "antd";
import { dashboardStyle } from "../../styles";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { FC } from "react";
import axios from "axios";

export const Devices: FC = () => {
  const handleToggle = async (device: string, checked: boolean) => {
    try {
      await axios.post("http://localhost:8080/api/control", {
        device,
        state: checked ? "ON" : "OFF",
      });
      message.success(`Se envió comando para ${device}: ${checked ? "ON" : "OFF"}`);
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
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
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
            <Card title="Modo Automático" bordered={false}>
              <Switch
                checkedChildren="Auto"
                unCheckedChildren="Manual"
                onChange={(checked) => handleToggle("modo_auto", checked)}
              />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
