import { useState } from "react";
import { Layout, Col, Row, FloatButton, Card } from "antd";
import {
  CartasDashboard,
  MenuDashboard,
  LineChartComponent,
} from "./components";
import { MoonOutlined } from "@ant-design/icons";
import { dashboardStyle } from "./styles";

const { /* Header, */ Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  /* const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken(); */

  return (
    <Layout style={dashboardStyle.globalLayoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        /* style={{ background: colorBgContainer }} */
      >
        <div style={dashboardStyle.logomenu}>Logo </div>
        <MenuDashboard />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <div style={dashboardStyle.mainSector}>
            <Row gutter={16}>
              <Col span={6}>
                <CartasDashboard title="Temperatura" />
              </Col>
              <Col span={6}>
                <CartasDashboard title="Humedad" />
              </Col>
              <Col span={6}>
                <CartasDashboard title="Gas" />
              </Col>
              <Col span={6}>
                <CartasDashboard title="Luz" />
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={6}>
                <div
                  style={{
                    height: 300,
                    width: 400,
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                >
                  <LineChartComponent />
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    height: 300,
                    width: 400,
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                >
                  <LineChartComponent />
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    height: 300,
                    width: 400,
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                >
                  <LineChartComponent />
                </div>
              </Col>
              <Col span={6}>
                <div
                  style={{
                    height: 300,
                    width: 400,
                    marginTop: 20,
                    marginLeft: 10,
                    marginRight: 20,
                  }}
                >
                  <LineChartComponent />
                </div>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <FloatButton icon={<MoonOutlined />} />
    </Layout>
  );
};

export default App;
