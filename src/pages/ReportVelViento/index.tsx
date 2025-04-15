import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";

export const ReportVelViento = () => {
  const { weather, loading, getVelWind } = useGetData();

  useEffect(() => {
    getVelWind();
  }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
          <Card title="Reporte Semanal" style={{ width: 800 }}>
            <FetchWeek parameter="VelocidadViento" />
          </Card>
        </Col>
        <Col span={50}>
          <Card title="Reporte Mensual" style={{ width: 800 }}>
            <FetchMonth parameter="VelocidadViento" />
          </Card>
        </Col>
      </Row>
      <ReportTable
        title="Velocidad Viento"
        loading={loading}
        weather={weather}
        sufijo="kph"
      />
    </div>
  );
};
