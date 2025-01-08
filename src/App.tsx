import { useState } from "react";
import { Layout, theme, Card, Col, Row, FloatButton } from "antd";
import { MenuDashboard } from "./components";
import { MoonOutlined } from "@ant-design/icons";
 import { dashboardStyle } from "./styles"; 

const { /* Header, */ Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={dashboardStyle.globalLayoutStyle}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{ background: colorBgContainer }}
      >
        <div
          style={dashboardStyle.logomenu}
        />
        <MenuDashboard />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <div
            style={dashboardStyle.mainSector}
          >
            <Row gutter={16}>
              <Col span={6}>
                <Card title="Temperatura" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Humedad" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Hidrogeno" bordered={false}>
                  Card content
                </Card>
              </Col>
              <Col span={6}>
                <Card title="Luz" bordered={false}>
                  Card content
                </Card>
              </Col>
            </Row>
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <FloatButton icon={<MoonOutlined />}/>
    </Layout>
  );
};

export default App;
