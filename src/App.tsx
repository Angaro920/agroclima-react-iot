import { useState } from "react";
import { Layout, FloatButton } from "antd";
import { MenuDashboard } from "./components";
import { MoonOutlined, RocketOutlined } from "@ant-design/icons";
import { dashboardStyle } from "./styles";
import { Dashboard ,Devices, ReportHidPage, ReportHumPage, ReportLightPage, ReportTempPage, UserAddPage, UserDeletePage, UserListPage, UserUpdatePage } from "./pages";
import { Pages } from "./constants/pages";



const { /* Header, */ Content, Footer, Sider } = Layout;


const App = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState(Pages.DASHBOARD);

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
        <div>
          <RocketOutlined />{" "}
        </div>
        <MenuDashboard setCurrentPage={(key: string) => setCurrentPage(key as Pages)} />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          {currentPage === Pages.DASHBOARD && <Dashboard />}
          {currentPage === Pages.DEVICES && <Devices />}
          {currentPage === Pages.LISTHIDRO && <ReportHidPage />}
          {currentPage === Pages.LISTHUM && <ReportHumPage />}
          {currentPage === Pages.LISTLUZ && <ReportLightPage />}
          {currentPage === Pages.LISTTEMP && <ReportTempPage />}
          {currentPage === Pages.ADD && <UserAddPage /> }
          {currentPage === Pages.DELETE && <UserDeletePage /> }
          {currentPage === Pages.UPDATE && <UserUpdatePage /> }
          {currentPage === Pages.LIST && <UserListPage /> }
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
