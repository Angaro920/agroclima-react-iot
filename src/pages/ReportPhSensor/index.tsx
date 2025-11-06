import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportPhPage = () => {
  const {weather, loading, getPhSensor} = useGetData();
    
    useEffect(() => {
      getPhSensor();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="PHSensor"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="PHSensor"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Sensor Ph"loading={loading} weather={weather} sufijo=" " />
    </div>
  );
};
