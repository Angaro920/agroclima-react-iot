import { useState } from "react";
import { Layout, FloatButton } from "antd";
import { MenuDashboard } from "./components";
import { dashboardStyle } from "./styles";
import {
  Dashboard,
  Devices,
  ReportDirViento,
  ReportPhPage,
  ReportHumIn,
  ReportHumOut,
  ReportHumPage,
  ReportLuzPage,
  ReportRain,
  ReportTempIn,
  ReportTempOut,
  ReportTempPage,
  UsersPage,
  ReportUV,
  ReportSolarRad,
  ReportBaromRel,
  ReportVelViento,
  DashboardInterno,
  DashboardExterno,
  InfoUpdate,
  ReportConductividadPage,
  ReportSalinidadPage,
  ReportTDSPage
} from "./pages";
import { Pages } from "./constants/pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Login } from "./components/FormLogIn";
import ProtectedRoute from "./components/ProtectedRoutes";
import AuditsPage  from "./pages/Audits";
import { ClimaNotifications } from "./components/Alerts";


const { Content, Footer, Sider } = Layout;

const App = () => {
  const [collapsedMenu, setCollapsedMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState(Pages.DASHBOARD);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              <ClimaNotifications />
              <Layout style={dashboardStyle.globalLayoutStyle}>
                <Sider
                  collapsible
                  collapsed={collapsedMenu}
                  onCollapse={(value) => setCollapsedMenu(value)}
                >
                  <div>
                    <div>
                      <img src="./agroclima.png" style={dashboardStyle.logo} />{" "}
                    </div>
                  </div>
                  <MenuDashboard
                    setCurrentPage={(key: string) =>
                      setCurrentPage(key as Pages)
                    }
                  />
                </Sider>
                <Layout>
                  <Content style={{ margin: "0 16px" }}>
                    {currentPage === Pages.DASHBOARD && (
                      <Dashboard setCurrentPage={setCurrentPage} />
                    )}
                    {currentPage === Pages.DEVICES && <Devices />}
                    {currentPage === Pages.LISTPH && <ReportPhPage />}
                    {currentPage === Pages.LISTHUM && <ReportHumPage />}
                    {currentPage === Pages.LISTLUZ && <ReportLuzPage />}
                    {currentPage === Pages.LISTTEMP && <ReportTempPage />}
                    {currentPage === Pages.USERS && <UsersPage />}
                    {currentPage === Pages.LISTTEMPOUT && <ReportTempOut />}
                    {currentPage === Pages.LISTTEMPIN && <ReportTempIn />}
                    {currentPage === Pages.LISTHUMEIN && <ReportHumIn />}
                    {currentPage === Pages.LISTHUMEOUT && <ReportHumOut />}
                    {currentPage === Pages.LISTBAROMREL && <ReportBaromRel />}
                    {currentPage === Pages.LISTSOLARRAD && <ReportSolarRad />}
                    {currentPage === Pages.LISTUV && <ReportUV />}
                    {currentPage === Pages.LISTEVENRAIN && <ReportRain />}
                    {currentPage === Pages.LISTDIRWIND && <ReportDirViento />}
                    {currentPage === Pages.LISTVELWIND && <ReportVelViento />}
                    {currentPage === Pages.AUDITS && <AuditsPage />}
                    {currentPage === Pages.INFOUPDATE && <InfoUpdate />}
                    {currentPage === Pages.LISTCONDUCTIVIDAD && <ReportConductividadPage />}
                    {currentPage === Pages.LISTSALINIDAD && <ReportSalinidadPage />}
                    {currentPage === Pages.LISTTDS && <ReportTDSPage />}
                    {currentPage === Pages.DASHBOARDINTERNO && <DashboardInterno setCurrentPage={setCurrentPage} />}
                    {currentPage === Pages.DASHBOARDEXTERNO && <DashboardExterno setCurrentPage={setCurrentPage} />}


                  </Content>
                  <Footer style={{ textAlign: "center" }}>
                    <p>D. Angarita G. Cardenas J. Alvarez - {new Date().getFullYear()} </p>
                    <p>Creado en colaboración con UdeC y el colegio Policarpa Salavarrieta</p>
                  </Footer>
                </Layout>
                <FloatButton.Group shape="square">
                  <FloatButton.BackTop visibilityHeight={0} />
                </FloatButton.Group>
      
              </Layout>
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
