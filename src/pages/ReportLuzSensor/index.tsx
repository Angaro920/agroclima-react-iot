import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import useGetData from "../../hooks/useGetData";
import { dashboardStyle } from "../../styles";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";

export const ReportLuzPage = () => {
  const { weather, loading, getLuzSensor } = useGetData();

  useEffect(() => {
    getLuzSensor();
  }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
          <Card title="Reporte Semanal" style={{ width: 800 }}>
            <FetchWeek parameter="LuzSensor" />
          </Card>
        </Col>
        <Col span={50}>
          <Card title="Reporte Mensual" style={{ width: 800 }}>
            <FetchMonth parameter="LuzSensor" />
          </Card>
        </Col>
      </Row>
      <ReportTable title="Luz" weather={weather} loading={loading} sufijo="%" />
    </div>
  );
};
