import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportConductividadPage = () => {
  const {weather, loading, getConductividadSensor} = useGetData();
    
    useEffect(() => {
      getConductividadSensor();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="ConductividadSensor"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="ConductividadSensor"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Sensor Conductividad"loading={loading} weather={weather} sufijo="μS/cm" />
    </div>
  );
};
