import { useState } from "react";
import { Layout, FloatButton, Drawer } from "antd";
import { MenuDashboard } from "./components";
import {
  BulbOutlined,
  MoonOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { dashboardStyle } from "./styles";
import {
  Dashboard,
  Devices,
  ReportHidPage,
  ReportHumPage,
  ReportLightPage,
  ReportTempPage,
  UsersPage,
} from "./pages";
import { Pages } from "./constants/pages";

const { Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(Pages.DASHBOARD);

  const showDrawer = () => {
    setOpenDrawer(true);
  };

  const onClose = () => {
    setOpenDrawer(false);
  };

  /*   const {
    token: { colorBgContainer },
  } = theme.useToken(); */

  return (
    <Layout style={dashboardStyle.globalLayoutStyle}>
      <Sider
        collapsible
        collapsed={collapsedMenu}
        onCollapse={(value) => setCollapsedMenu(value)}
      >
        <div>
          <RocketOutlined />{" "}
        </div>
        <MenuDashboard
          setCurrentPage={(key: string) => setCurrentPage(key as Pages)}
        />
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px"}}>
          {currentPage === Pages.DASHBOARD && <Dashboard />}
          {currentPage === Pages.DEVICES && <Devices />}
          {currentPage === Pages.LISTHIDRO && <ReportHidPage />}
          {currentPage === Pages.LISTHUM && <ReportHumPage />}
          {currentPage === Pages.LISTLUZ && <ReportLightPage />}
          {currentPage === Pages.LISTTEMP && <ReportTempPage />}
          {currentPage === Pages.USERS && <UsersPage />}
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
      <FloatButton.Group shape="square">
        <FloatButton icon={<BulbOutlined />} onClick={showDrawer} />
        <FloatButton icon={<MoonOutlined />} />
        <FloatButton.BackTop visibilityHeight={0} />
      </FloatButton.Group>
      <Drawer title="Basic Drawer" onClose={onClose} open={openDrawer}>
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Drawer>
    </Layout>
  );
};

export default App;
