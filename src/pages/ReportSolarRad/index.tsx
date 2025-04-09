import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchMonth } from "../../components/FetchMonth";
import { FetchWeek } from "../../components/FetchWeek";


export const ReportSolarRad = () => {
  const {weather, loading, getSolarRad} = useGetData();
    
    useEffect(() => {
     getSolarRad();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="RadiacionSolar"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="RadiacionSolar"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Radiacion Solar"loading={loading} weather={weather} sufijo="W/m²" />
    </div>
  );
};
