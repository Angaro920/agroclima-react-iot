import { useEffect } from "react";
import { ReportTable } from "../../components/ReportTable";
import { dashboardStyle } from "../../styles";
import useGetData from "../../hooks/useGetData";
import { Card, Col, Row } from "antd";
import { FetchWeek } from "../../components/FetchWeek";
import { FetchMonth } from "../../components/FetchMonth";


export const ReportHumIn = () => {
  const {weather, loading, getHumeIn} = useGetData();
    
    useEffect(() => {
      getHumeIn();
    }, []);
  return (
    <div style={dashboardStyle.mainSector}>
      <Row gutter={16}>
        <Col span={50}>
        <Card title="Reporte Semanal" style={{ width:800 }}>
          <FetchWeek parameter="HumedadInterna"/>
        </Card>
        </Col>
        <Col span={50}>
        <Card title="Reporte Mensual" style={{ width: 800 }}>
          <FetchMonth parameter="HumedadInterna"/>
        </Card>
        </Col>
      </Row>
      <ReportTable title="Humedad Interna"loading={loading} weather={weather} sufijo="%" />
    </div>
  );
};
