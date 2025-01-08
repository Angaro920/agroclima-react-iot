import { useState } from "react";
import { Layout, Col, Row, FloatButton} from "antd";
import {
  CartasDashboard,
  MenuDashboard,
  LineChartComponent,
  ComposedChartComponent,
  AreaChartComponent,
  BarChartComponent,
} from "./components";
import { MoonOutlined, RocketOutlined } from "@ant-design/icons";
import { dashboardStyle } from "./styles";

const { /* Header, */  Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  /* const {
    token: { colorBgContainer},
  } = theme.useToken(); */ 

  return (
    <Layout style={dashboardStyle.globalLayoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        /* style={{ background: colorBgContainer }} */
      >
        <div><RocketOutlined /> </div>
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
              <div style={dashboardStyle.chartdiv}>
                  <LineChartComponent />
                </div>
              </Col>
              <Col span={6}>
                <div style={dashboardStyle.chartdiv}>
                  <AreaChartComponent />
                </div>
              </Col>
              <Col span={6}>
              <div style={dashboardStyle.chartdiv}>
                  <BarChartComponent />
                </div>
              </Col>
              <Col span={6}>
              <div style={dashboardStyle.chartdiv}>
                  <LineChartComponent />
                </div>
              </Col>
            </Row>
            <div style={dashboardStyle.chartdiv}>
              <ComposedChartComponent />
            </div>
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
