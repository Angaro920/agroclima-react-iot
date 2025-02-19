import { Card, Col, Row, Switch } from "antd";
import { dashboardStyle } from "../../styles";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { useWebSocket } from "../../hooks/useWebSocket";

export const Devices: React.FC = () => {
    const { isConnected, sendMessage } = useWebSocket("ws://10.157.13.4:8080");

    const handleToggle = (device: string, state: boolean) => {
        sendMessage({ device, state: state ? "ON" : "OFF" });
    };

    return (
        <div style={dashboardStyle.mainSector}>
            <h1 style={{ display: "flex", justifyContent: "center" }}>
                Control sistemas invernadero {isConnected ? "🟢" : "🔴"}
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
                            <Switch onChange={(checked) => handleToggle("modo_auto", checked)} />
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};
