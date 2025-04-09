import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchMonth } from "../../components/FetchMonth";
import { FetchWeek } from "../../components/FetchWeek";


export const ReportRain = () => {
  const {weather, loading, getRain} = useGetData();
    
    useEffect(() => {
      getRain();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="Precipitaciones"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="Precipitaciones"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Precipitaciones"loading={loading} weather={weather} sufijo="in" />
    </div>
  );
};
