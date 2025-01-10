import { Card, Col, Row, Switch } from "antd";
import { dashboardStyle } from "../../styles";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

export const Devices = () => {
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
                defaultChecked
              />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Bombas de agua" bordered={false}>
              <Switch checkedChildren="Encendido" unCheckedChildren="Apagado" style={{ display: "flex", justifyContent: "center" }} />
            </Card>
          </Col>
          <Col span={8}>
            <Card title="Modo Automatico" bordered={false}>
              <Switch />
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};
