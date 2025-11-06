import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportTDSPage = () => {
  const {weather, loading, getTDSSensor} = useGetData();
    
    useEffect(() => {
      getTDSSensor();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="TDSSensor"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="TDSSensor"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Solidos Disueltos en Agua"loading={loading} weather={weather} sufijo="ppm" />
    </div>
  );
};
