import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportSalinidadPage = () => {
  const {weather, loading, getSalinidadSensor} = useGetData();
    
    useEffect(() => {
      getSalinidadSensor();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="SalinidadSensor"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="SalinidadSensor"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Sensor Salinidad"loading={loading} weather={weather} sufijo="g/L" />
    </div>
  );
};
