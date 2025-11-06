import { dashboardStyle } from "../../styles";
import { ReportTable } from "../../components/ReportTable";
import useGetData from "../../hooks/useGetData";
import { useEffect } from "react";
import { Card, Col, Row } from "antd";
import { FetchMonth } from "../../components/FetchMonth";
import { FetchWeek } from "../../components/FetchWeek";


export const ReportTempPage = () => {
  const {weather, loading, getTemperaturaSensor} = useGetData();
  
  useEffect(() => {
    getTemperaturaSensor();
  }, []);

  return (
    <div style={dashboardStyle.mainSector}>
      <div>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="TemperaturaSensor"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="TemperaturaSensor"/>
        </Card>
        </Col>
      </Row>
        <ReportTable title="Temperatura" weather={weather} loading={loading} sufijo="°C"/>
      </div>
    </div>
  );
};
