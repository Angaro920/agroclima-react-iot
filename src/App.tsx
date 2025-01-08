import { useState } from "react";
import { Layout, theme, Card, Col, Row, FloatButton } from "antd";
import { MenuDashboard } from "./components";
/* import { globalLayoutStyle, logomenu } from "./styles"; */

const { Header, Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        /* style={{ background: colorBgContainer }} */
      >
        <div
          style={{
            background: "white",
            borderRadius: "50%",
            width: 70,
            height: 70,
            alignItems: "center",
            alignContent: "center",
            display: "flex",
            margin: "auto",
          }}
        >Logo</div>
        <MenuDashboard />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <div
            style={{
              marginTop: 16,
              padding: 24,
              minHeight: "100hv",
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
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
      <FloatButton />
    </Layout>
  );
};

export default App;
